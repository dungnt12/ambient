'use strict';

// Flag useEffect whose sole job is to call setState based on deps.
// This is the classic "sync state with state" anti-pattern (React docs: "you might
// not need an effect"). 90% of these should be derived state (compute inline or useMemo).
//
// Heuristic: useEffect(cb, deps) where
//   - deps is a non-empty array literal
//   - cb is an arrow/function with a BlockStatement body
//   - body contains ONLY ExpressionStatements whose expression is a call to setXxx(...)
//   - no return statement (no cleanup), no await
// False positives possible — rule is 'warn', can be silenced per-line with justification.

function isSetterCall(node) {
  return (
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    /^set[A-Z]/.test(node.callee.name)
  );
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Cảnh báo useEffect chỉ để setState theo deps — dùng derived state hoặc useMemo thay thế.',
    },
    schema: [],
    messages: {
      syncEffect:
        'useEffect chỉ để setState theo deps là anti-pattern. Tính trực tiếp trong render (derived state) hoặc useMemo. Nếu thực sự cần effect, giải thích lý do trong comment và disable rule cụ thể.',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type !== 'Identifier' || node.callee.name !== 'useEffect') return;
        if (node.arguments.length < 2) return;
        const [cb, deps] = node.arguments;
        if (deps.type !== 'ArrayExpression' || deps.elements.length === 0) return;
        if (cb.type !== 'ArrowFunctionExpression' && cb.type !== 'FunctionExpression') return;
        if (cb.async) return;
        const body = cb.body;
        if (!body || body.type !== 'BlockStatement' || body.body.length === 0) return;

        let allSetters = true;
        for (const stmt of body.body) {
          if (stmt.type !== 'ExpressionStatement') {
            allSetters = false;
            break;
          }
          if (!isSetterCall(stmt.expression)) {
            allSetters = false;
            break;
          }
        }
        if (allSetters) {
          context.report({ node, messageId: 'syncEffect' });
        }
      },
    };
  },
};
