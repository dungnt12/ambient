'use strict';

// Require user-facing text to go through i18n.
// Flag raw string children inside <Text>…</Text> (design-system Text re-export counts too).
// Allow: numbers, punctuation-only, {t('…')}, {i18n.t('…')}, <Trans>, interpolated expressions.

const TEXT_COMPONENTS = new Set(['Text', 'Heading', 'Label']);

// Pure-punctuation / numeric / formatting strings that are not user copy.
const NON_COPY_RE = /^[\d\s.,:/\-+()·•%·–—@|]+$/;

function isMeaningfulText(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return false;
  if (NON_COPY_RE.test(trimmed)) return false;
  return true;
}

module.exports = {
  meta: {
    type: 'problem',
    docs: { description: 'Disallow raw string children inside <Text>; require i18n (t / Trans).' },
    schema: [],
    messages: {
      rawText: 'Raw string "{{value}}" inside <{{tag}}> — wrap with t(\'…\') or <Trans>.',
    },
  },
  create(context) {
    const filename = context.filename || context.getFilename();
    // Exempt design-system and showcase (demo content demonstrating tokens).
    if (filename.includes(`${'/'}src/design-system/`) || filename.includes(`${'/'}src/showcase/`)) {
      return {};
    }

    function getTagName(openingElement) {
      const name = openingElement.name;
      if (name.type === 'JSXIdentifier') return name.name;
      return null;
    }

    return {
      JSXElement(node) {
        const tag = getTagName(node.openingElement);
        if (!tag || !TEXT_COMPONENTS.has(tag)) return;

        for (const child of node.children) {
          if (child.type === 'JSXText') {
            if (isMeaningfulText(child.value)) {
              context.report({
                node: child,
                messageId: 'rawText',
                data: { tag, value: child.value.trim().slice(0, 60) },
              });
            }
            continue;
          }
          if (
            child.type === 'JSXExpressionContainer' &&
            child.expression.type === 'Literal' &&
            typeof child.expression.value === 'string' &&
            isMeaningfulText(child.expression.value)
          ) {
            context.report({
              node: child.expression,
              messageId: 'rawText',
              data: { tag, value: child.expression.value.slice(0, 60) },
            });
          }
        }
      },
    };
  },
};
