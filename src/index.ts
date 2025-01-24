import { Rule } from 'eslint';
import path from 'path';

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow imports from outside the same directory for *.private.ts files',
      category: 'Best Practices',
      recommended: false
    },
    schema: [] // no options
  },
  create(context: Rule.RuleContext) {
    return {
      ImportDeclaration(node) {
        const filePath = context.filename;
        const importPath = node.source.value as string;

        if (filePath.endsWith('.private.ts')) {
          const dir = path.dirname(filePath);
          const resolvedPath = path.resolve(dir, importPath);

          if (!resolvedPath.startsWith(dir)) {
            context.report({
              node,
              message: 'Imports from outside the same directory are not allowed for *.private.ts files.'
            });
          }
        }
      }
    };
  }
};

export default {
  rules: {
    'no-external-imports': rule
  }
};