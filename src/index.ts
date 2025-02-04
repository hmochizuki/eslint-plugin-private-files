import { Rule } from 'eslint';
import path from 'path';

const SUFFIX = 'private';
const PREFIX = '_';


type Options = {
  suffix: string;
} | {
  prefix: string;
}
export const isPrivateFile = (importPath: string, options: Options) => {
  if('suffix' in options) {
    const reg = new RegExp(`\\.${options.suffix}(|.js|.jsx|.ts|.tsx)$`);
    return reg.test(importPath);
  }
  const reg = new RegExp(`^${options.prefix}.*`);
  return reg.test(importPath.split("/").at(-1) ?? "");
}

export const errorMessage = 'Imports from outside the same directory are not allowed for _* files.';

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow imports from outside the same directory for _* files',
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
        if(!isPrivateFile(importPath, { prefix: PREFIX })) return;
        if((importPath.startsWith("./") && importPath.split("/").length === 2) || path.dirname(importPath) === dir) return;
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