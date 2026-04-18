'use strict';

// Cap useState calls per React component. Too many useState = derived state smell
// or a component doing too much — split, or collapse into useReducer.
// Scope: functions whose name starts with uppercase (components). Custom hooks
// (useXxx) are exempt — a hook's job is to encapsulate multiple state atoms.

const DEFAULT_MAX = 4;

function isUseStateCall(node) {
  const callee = node.callee;
  if (callee.type === 'Identifier' && callee.name === 'useState') return true;
  if (
    callee.type === 'MemberExpression' &&
    callee.object.type === 'Identifier' &&
    callee.object.name === 'React' &&
    callee.property.type === 'Identifier' &&
    callee.property.name === 'useState'
  )
    return true;
  return false;
}

function getFnName(node) {
  if (node.type === 'FunctionDeclaration') return node.id && node.id.name;
  const parent = node.parent;
  if (!parent) return null;
  if (parent.type === 'VariableDeclarator' && parent.id.type === 'Identifier')
    return parent.id.name;
  if (parent.type === 'Property' && parent.key.type === 'Identifier') return parent.key.name;
  return null;
}

function isComponentName(name) {
  return typeof name === 'string' && /^[A-Z]/.test(name);
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Cap useState calls per component — gom lại bằng useReducer hoặc tách hook.',
    },
    schema: [{ type: 'object', properties: { max: { type: 'integer', minimum: 1 } } }],
    messages: {
      tooMany:
        'Component <{{name}}> dùng {{count}} useState (>{{max}}). Gom thành useReducer hoặc tách logic ra custom hook.',
    },
  },
  create(context) {
    const max = (context.options[0] && context.options[0].max) || DEFAULT_MAX;
    const stack = [];

    function enter(node) {
      const name = getFnName(node);
      stack.push({ node, name, count: 0, isComponent: isComponentName(name) });
    }
    function leave() {
      const frame = stack.pop();
      if (frame.isComponent && frame.count > max) {
        context.report({
          node: frame.node,
          messageId: 'tooMany',
          data: { name: frame.name, count: frame.count, max },
        });
      }
    }

    return {
      FunctionDeclaration: enter,
      'FunctionDeclaration:exit': leave,
      FunctionExpression: enter,
      'FunctionExpression:exit': leave,
      ArrowFunctionExpression: enter,
      'ArrowFunctionExpression:exit': leave,
      CallExpression(node) {
        if (!stack.length) return;
        if (!isUseStateCall(node)) return;
        // Attribute to nearest enclosing component frame only (skip nested non-component fns).
        for (let i = stack.length - 1; i >= 0; i--) {
          if (stack[i].isComponent) {
            stack[i].count += 1;
            return;
          }
        }
      },
    };
  },
};
