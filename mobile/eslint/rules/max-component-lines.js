'use strict';

// Cap React component function body length. Long components = poor separation.
// Extract sub-components, custom hooks, or move constants/helpers out of the file.

const DEFAULT_MAX = 200;

function getFnName(node) {
  if (node.type === 'FunctionDeclaration') return node.id && node.id.name;
  const parent = node.parent;
  if (!parent) return null;
  if (parent.type === 'VariableDeclarator' && parent.id.type === 'Identifier')
    return parent.id.name;
  return null;
}

function isComponentName(name) {
  return typeof name === 'string' && /^[A-Z]/.test(name);
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Cap component function length — tách sub-component / custom hook.' },
    schema: [{ type: 'object', properties: { max: { type: 'integer', minimum: 20 } } }],
    messages: {
      tooLong:
        'Component <{{name}}> dài {{lines}} dòng (>{{max}}). Tách sub-component, extract custom hook, hoặc move constants ra file riêng.',
    },
  },
  create(context) {
    const max = (context.options[0] && context.options[0].max) || DEFAULT_MAX;

    function check(node) {
      const name = getFnName(node);
      if (!isComponentName(name)) return;
      const body = node.body;
      if (!body || body.type !== 'BlockStatement') return;
      const lines = body.loc.end.line - body.loc.start.line;
      if (lines > max) {
        context.report({ node, messageId: 'tooLong', data: { name, lines, max } });
      }
    }

    return {
      FunctionDeclaration: check,
      FunctionExpression: check,
      ArrowFunctionExpression: check,
    };
  },
};
