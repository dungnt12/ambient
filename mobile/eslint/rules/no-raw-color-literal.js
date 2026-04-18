'use strict';

// Disallow hex / rgb() / rgba() / hsl() color literals outside the design-system/tokens folder.
// Allowed inside src/design-system/**.

const COLOR_RE = /^#[0-9a-fA-F]{3,8}$|^(rgb|rgba|hsl|hsla)\(/;

function isColorString(value) {
  if (typeof value !== 'string') return false;
  return COLOR_RE.test(value.trim());
}

module.exports = {
  meta: {
    type: 'problem',
    docs: { description: 'Disallow raw color literals outside design-system tokens.' },
    schema: [],
    messages: {
      rawColor:
        'Raw color literal "{{value}}" — define in src/design-system/tokens/colors and use t.colors.*.',
    },
  },
  create(context) {
    const filename = context.filename || context.getFilename();
    if (filename.includes(`${'/'}src/design-system/`)) return {};

    return {
      Literal(node) {
        if (isColorString(node.value)) {
          context.report({ node, messageId: 'rawColor', data: { value: node.value } });
        }
      },
      TemplateLiteral(node) {
        // Only flag if the static prefix alone already looks like rgba(/rgb(/hsl(/hex.
        const first = node.quasis[0] && node.quasis[0].value.cooked;
        if (first && /^(#[0-9a-fA-F]{3,8}$|rgb\(|rgba\(|hsl\(|hsla\()/.test(first.trim())) {
          context.report({ node, messageId: 'rawColor', data: { value: `${first}…` } });
        }
      },
      JSXAttribute(node) {
        // <Svg fill="#c96442" stroke="rgba(0,0,0,0.2)" />
        if (!node.name || !node.value) return;
        const attr = node.name.name;
        if (attr !== 'fill' && attr !== 'stroke' && attr !== 'color') return;
        if (node.value.type === 'Literal' && isColorString(node.value.value)) {
          context.report({
            node: node.value,
            messageId: 'rawColor',
            data: { value: node.value.value },
          });
        }
      },
    };
  },
};
