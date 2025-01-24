import { Rule } from 'eslint';
import path from 'path';

const privateFileSuffix = 'private';

export const isPrivateFile = (importPath: string, suffix: string) => {
  const reg = new RegExp(`\\.${suffix}(|.js|.jsx|.ts|.tsx)$`);
  return reg.test(importPath);
}

export const errorMessage = 'Imports from outside the same directory are not allowed for *.private.ts files.';

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow imports from outside the same directory for *.private.ts files',
      category: 'Best Practices',
      recommended: true
    },
    schema: [] // no options
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const filePath = context.filename;
        const dir = path.dirname(filePath);
        const importPath = node.source.value as string;
        if(!isPrivateFile(importPath, privateFileSuffix)) return;
        if(importPath.startsWith("./") || path.dirname(importPath) === dir) return;
        context.report({
          node,
          message: errorMessage
        });
        return;
      }
    };
  }
};

export default {
  rules: {
    'no-external-imports': rule,
  }
};