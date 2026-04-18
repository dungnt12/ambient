'use strict';

// Flag hardcoded numeric / string literals assigned to design-domain style keys
// (spacing, layout, visual, typography) inside:
//   - JSX inline style objects: <X style={{ padding: 16 }} />
//   - StyleSheet.create({...})
//   - array style props containing object literals: style={[base, { padding: 16 }]}
//
// Values must come from theme tokens (t.*, theme.*, tokens.*, typography.*, etc.).

const SPACING_KEYS = new Set([
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingHorizontal',
  'paddingVertical',
  'paddingStart',
  'paddingEnd',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginHorizontal',
  'marginVertical',
  'marginStart',
  'marginEnd',
  'gap',
  'rowGap',
  'columnGap',
  'top',
  'bottom',
  'left',
  'right',
  'start',
  'end',
  'width',
  'height',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
]);

const VISUAL_KEYS = new Set([
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderWidth',
  'borderTopWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderColor',
  'borderTopColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderRightColor',
  'color',
  'backgroundColor',
  'tintColor',
  'shadowColor',
  'shadowRadius',
  'shadowOpacity',
  'shadowOffset',
  'elevation',
]);

const TYPOGRAPHY_KEYS = new Set([
  'fontSize',
  'lineHeight',
  'letterSpacing',
  'fontWeight',
  'fontFamily',
]);

const DESIGN_KEYS = new Set([...SPACING_KEYS, ...VISUAL_KEYS, ...TYPOGRAPHY_KEYS]);

// Keys where a numeric literal is always acceptable (flags / ratios / opacities).
const NUMERIC_ALLOW_KEYS = new Set([
  'flex',
  'flexGrow',
  'flexShrink',
  'aspectRatio',
  'zIndex',
  'opacity',
]);

// String literal values always fine on any key.
const ALLOWED_STRINGS = new Set([
  'auto',
  '100%',
  'center',
  'flex-start',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
  'stretch',
  'baseline',
  'row',
  'column',
  'row-reverse',
  'column-reverse',
  'wrap',
  'nowrap',
  'wrap-reverse',
  'absolute',
  'relative',
  'hidden',
  'visible',
  'solid',
  'dashed',
  'dotted',
  'bold',
  'normal',
  'italic',
  'uppercase',
  'lowercase',
  'capitalize',
  'none',
  'left',
  'right',
  'top',
  'bottom',
]);

function isZeroLiteral(node) {
  return node.type === 'Literal' && node.value === 0;
}

function isAllowedMember(node) {
  // Accept t.spacing.xl, theme.colors.bg, tokens.radius.lg, typography.body.fontSize, etc.
  let cur = node;
  while (cur && cur.type === 'MemberExpression') cur = cur.object;
  if (!cur || cur.type !== 'Identifier') return false;
  const name = cur.name;
  return (
    name === 't' ||
    name === 'theme' ||
    name === 'tokens' ||
    name === 'colors' ||
    name === 'spacing' ||
    name === 'radius' ||
    name === 'typography' ||
    name === 'shadow' ||
    name === 'motion' ||
    name === 'layout' ||
    name === 'StyleSheet' // StyleSheet.hairlineWidth, StyleSheet.absoluteFillObject
  );
}

function isAllowedValue(keyName, valueNode) {
  // Zero is always fine.
  if (isZeroLiteral(valueNode)) return true;
  // Number literal on a non-design key or a flag key.
  if (valueNode.type === 'Literal' && typeof valueNode.value === 'number') {
    if (NUMERIC_ALLOW_KEYS.has(keyName)) return true;
    return false;
  }
  // String literal — allow layout enum values + percentages + 'auto'.
  if (valueNode.type === 'Literal' && typeof valueNode.value === 'string') {
    const v = valueNode.value;
    if (ALLOWED_STRINGS.has(v)) return true;
    if (/^-?\d+(\.\d+)?%$/.test(v)) return true;
    // Colors as strings are caught by no-raw-color-literal — don't double-flag here.
    return true;
  }
  // Unary minus literal (e.g., -4). Still hardcoded.
  if (
    valueNode.type === 'UnaryExpression' &&
    valueNode.operator === '-' &&
    valueNode.argument.type === 'Literal' &&
    typeof valueNode.argument.value === 'number'
  ) {
    return false;
  }
  // MemberExpression from a recognised theme/token root.
  if (valueNode.type === 'MemberExpression') return isAllowedMember(valueNode);
  // Identifier, CallExpression, ConditionalExpression, TemplateLiteral, etc. — dynamic, allow.
  return true;
}

function getKeyName(prop) {
  if (prop.type !== 'Property') return null;
  if (prop.computed) return null;
  if (prop.key.type === 'Identifier') return prop.key.name;
  if (prop.key.type === 'Literal' && typeof prop.key.value === 'string') return prop.key.value;
  return null;
}

function reportIfHardcoded(context, prop) {
  const keyName = getKeyName(prop);
  if (!keyName || !DESIGN_KEYS.has(keyName)) return;
  const value = prop.value;
  if (isAllowedValue(keyName, value)) return;
  const raw =
    value.type === 'Literal'
      ? String(value.value)
      : value.type === 'UnaryExpression' && value.argument.type === 'Literal'
        ? `${value.operator}${value.argument.value}`
        : 'hardcoded';
  context.report({
    node: value,
    messageId: 'hardcoded',
    data: { key: keyName, value: raw },
  });
}

function walkStyleObject(context, node) {
  if (!node) return;
  if (node.type === 'ObjectExpression') {
    for (const prop of node.properties) {
      if (prop.type === 'Property') reportIfHardcoded(context, prop);
    }
    return;
  }
  if (node.type === 'ArrayExpression') {
    for (const el of node.elements) walkStyleObject(context, el);
    return;
  }
  if (node.type === 'ConditionalExpression') {
    walkStyleObject(context, node.consequent);
    walkStyleObject(context, node.alternate);
    return;
  }
  if (node.type === 'LogicalExpression') {
    walkStyleObject(context, node.left);
    walkStyleObject(context, node.right);
  }
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow hardcoded numeric/string literals on design-domain style keys; require theme tokens.',
    },
    schema: [],
    messages: {
      hardcoded:
        'Hardcoded "{{value}}" on style key "{{key}}" — use a theme token (t.spacing.*, t.radius.*, t.colors.*, typography.*).',
    },
  },
  create(context) {
    const filename = context.filename || context.getFilename();
    // Exempt the design-system itself — tokens are defined there.
    if (filename.includes(`${'/'}src/design-system/`)) return {};

    return {
      // JSX: style={{...}} or style={[...]}
      JSXAttribute(node) {
        if (!node.name || node.name.name !== 'style') return;
        const v = node.value;
        if (!v || v.type !== 'JSXExpressionContainer') return;
        walkStyleObject(context, v.expression);
      },
      // StyleSheet.create({ key: { ... } })
      CallExpression(node) {
        const callee = node.callee;
        if (
          callee.type === 'MemberExpression' &&
          callee.object.type === 'Identifier' &&
          callee.object.name === 'StyleSheet' &&
          callee.property.type === 'Identifier' &&
          callee.property.name === 'create'
        ) {
          const arg = node.arguments[0];
          if (arg && arg.type === 'ObjectExpression') {
            for (const prop of arg.properties) {
              if (prop.type === 'Property' && prop.value.type === 'ObjectExpression') {
                for (const inner of prop.value.properties) {
                  if (inner.type === 'Property') reportIfHardcoded(context, inner);
                }
              }
            }
          }
        }
      },
    };
  },
};
