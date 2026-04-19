'use strict';

module.exports = {
  rules: {
    'no-hardcoded-design-values': require('./rules/no-hardcoded-design-values'),
    'no-raw-color-literal': require('./rules/no-raw-color-literal'),
    'no-raw-jsx-text': require('./rules/no-raw-jsx-text'),
    'max-use-state': require('./rules/max-use-state'),
    'max-component-lines': require('./rules/max-component-lines'),
    'no-sync-state-effect': require('./rules/no-sync-state-effect'),
    'icons-lucide-only': require('./rules/icons-lucide-only'),
    'no-inline-card-pattern': require('./rules/no-inline-card-pattern'),
  },
};
