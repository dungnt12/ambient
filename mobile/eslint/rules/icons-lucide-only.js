'use strict';

// Project standard: all icons come from `lucide-react-native` (see lucide.dev icon guide).
// Ban competing icon libraries at import time. Design-system may still author custom SVG
// primitives using `react-native-svg`, so that import is allowed globally.

const BANNED = [
  '@expo/vector-icons',
  'react-native-vector-icons',
  '@heroicons/react',
  '@heroicons/react/24/outline',
  '@heroicons/react/24/solid',
  'react-icons',
  'react-native-ionicons',
  'ionicons',
  '@fortawesome/react-native-fontawesome',
  'phosphor-react-native',
  'react-native-feather',
];

function isBanned(source) {
  if (BANNED.includes(source)) return true;
  // Submodules of banned packages: "react-native-vector-icons/MaterialIcons" etc.
  return BANNED.some((pkg) => source === pkg || source.startsWith(pkg + '/'));
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Chỉ dùng lucide-react-native cho icons. Cấm import các icon library khác.',
    },
    schema: [],
    messages: {
      banned:
        'Icon library "{{source}}" bị cấm. Dùng lucide-react-native (xem lucide.dev/icons). Nếu thiếu icon, tạo SVG primitive trong src/design-system/ với react-native-svg.',
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        if (typeof source === 'string' && isBanned(source)) {
          context.report({ node: node.source, messageId: 'banned', data: { source } });
        }
      },
    };
  },
};
