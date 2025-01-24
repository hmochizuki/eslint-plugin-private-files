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
  create(context) {
    return {
      ImportDeclaration(node) {
        const filePath = context.filename;
        const importPath = node.source.value as string;

        if (filePath.endsWith('.private.ts')) {
          const dir = path.dirname(filePath);
          const resolvedPath = path.resolve(dir, importPath);

          console.log("--------------------------------");
          console.log(resolvedPath, dir, importPath);
          console.log("--------------------------------");

          if (path.isAbsolute(importPath)) {
            console.log("absolute");
            // 絶対パスの場合、同一フォルダかどうかをチェック
            if (!resolvedPath.startsWith(dir)) {
              context.report({
                node,
                message: 'Absolute imports must be from the same directory for *.private.ts files.'
              });
            }
          } else {
            console.log("relative");
            console.log(importPath.startsWith('./'));
            // 相対パスの場合、./で始まることをチェック
            if (!importPath.startsWith('./')) {
              console.log("relative error");
              context.report({
                node,
                message: 'Relative imports must start with "./" for *.private.ts files.'
              });
            }
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