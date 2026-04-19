'use strict';

// Detect the inline "card" visual pattern and require the <Card> primitive.
//
// A style object is considered an inline card when it simultaneously sets:
//   - backgroundColor: {t|theme|colors}.colors?.bgRaised
//   - borderColor:     {t|theme|colors}.colors?.borderSoft
//   - borderRadius:    {t|theme|tokens|radius}.radius?.card
//
// 3/3 = inline card → report. 2/3 = could be a divider/pill/custom shape → skip.
//
// Scope: JSX `style={{...}}` objects and `StyleSheet.create({...})` entries.
// Exempt: files under src/design-system/ (Card primitive is defined there).

const COLOR_ROOTS = new Set(['t', 'theme', 'colors']);
const RADIUS_ROOTS = new Set(['t', 'theme', 'tokens', 'radius']);

// Walk a MemberExpression chain into an array of property names:
// t.colors.bgRaised -> ['t', 'colors', 'bgRaised']
function memberPath(node) {
  const path = [];
  let cur = node;
  while (cur && cur.type === 'MemberExpression') {
    if (cur.computed || cur.property.type !== 'Identifier') return null;
    path.unshift(cur.property.name);
    cur = cur.object;
  }
  if (!cur || cur.type !== 'Identifier') return null;
  path.unshift(cur.name);
  return path;
}

function matchesColor(node, leafName) {
  if (!node || node.type !== 'MemberExpression') return false;
  const path = memberPath(node);
  if (!path) return false;
  // Accept t.colors.X, theme.colors.X, colors.X
  const root = path[0];
  if (!COLOR_ROOTS.has(root)) return false;
  const leaf = path[path.length - 1];
  if (leaf !== leafName) return false;
  // Shapes allowed: [root,'colors',leaf] or [root,leaf] when root is 'colors'.
  if (path.length === 3 && path[1] === 'colors') return true;
  if (path.length === 2 && root === 'colors') return true;
  return false;
}

function matchesRadiusCard(node) {
  if (!node || node.type !== 'MemberExpression') return false;
  const path = memberPath(node);
  if (!path) return false;
  const root = path[0];
  if (!RADIUS_ROOTS.has(root)) return false;
  const leaf = path[path.length - 1];
  if (leaf !== 'card') return false;
  // t.radius.card, theme.radius.card, tokens.radius.card, radius.card
  if (path.length === 3 && path[1] === 'radius') return true;
  if (path.length === 2 && root === 'radius') return true;
  return false;
}

function getKeyName(prop) {
  if (prop.type !== 'Property' || prop.computed) return null;
  if (prop.key.type === 'Identifier') return prop.key.name;
  if (prop.key.type === 'Literal' && typeof prop.key.value === 'string') return prop.key.value;
  return null;
}

function inspectObject(node) {
  if (!node || node.type !== 'ObjectExpression') return null;
  let hasBg = false;
  let hasBorder = false;
  let hasRadius = false;
  for (const prop of node.properties) {
    if (prop.type !== 'Property') continue;
    const key = getKeyName(prop);
    if (!key) continue;
    if (key === 'backgroundColor' && matchesColor(prop.value, 'bgRaised')) hasBg = true;
    else if (key === 'borderColor' && matchesColor(prop.value, 'borderSoft')) hasBorder = true;
    else if (key === 'borderRadius' && matchesRadiusCard(prop.value)) hasRadius = true;
  }
  if (hasBg && hasBorder && hasRadius) return node;
  return null;
}

function walkStyle(context, node) {
  if (!node) return;
  if (node.type === 'ObjectExpression') {
    const match = inspectObject(node);
    if (match) context.report({ node: match, messageId: 'inlineCard' });
    return;
  }
  if (node.type === 'ArrayExpression') {
    for (const el of node.elements) walkStyle(context, el);
    return;
  }
  if (node.type === 'ConditionalExpression') {
    walkStyle(context, node.consequent);
    walkStyle(context, node.alternate);
    return;
  }
  if (node.type === 'LogicalExpression') {
    walkStyle(context, node.left);
    walkStyle(context, node.right);
  }
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow inline card pattern (bgRaised + borderSoft + radius.card). Use <Card> primitive.',
    },
    schema: [],
    messages: {
      inlineCard:
        'Inline card pattern detected. Use `<Card>` from design-system instead (design.md §10.5).',
    },
  },
  create(context) {
    const filename = context.filename || context.getFilename();
    if (filename.includes(`${'/'}src/design-system/`)) return {};

    return {
      JSXAttribute(node) {
        if (!node.name || node.name.name !== 'style') return;
        const v = node.value;
        if (!v || v.type !== 'JSXExpressionContainer') return;
        walkStyle(context, v.expression);
      },
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
                const match = inspectObject(prop.value);
                if (match) context.report({ node: match, messageId: 'inlineCard' });
              }
            }
          }
        }
      },
    };
  },
};
