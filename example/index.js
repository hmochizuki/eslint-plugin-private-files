import path from 'path';
const SUFFIX = 'private';
const PREFIX = '_';
export const isPrivateFile = (importPath, options) => {
    if ('suffix' in options) {
        const reg = new RegExp(`\\.${options.suffix}(|.js|.jsx|.ts|.tsx)$`);
        return reg.test(importPath);
    }
    const reg = new RegExp(`^${options.prefix}.*`);
    return reg.test(importPath.split("/").at(-1) ?? "");
};
export const errorMessage = 'Imports from outside the same directory are not allowed for _* files.';
const rule = {
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
                const importPath = node.source.value;
                if (!isPrivateFile(importPath, { prefix: PREFIX }))
                    return;
                if ((importPath.startsWith("./") && importPath.split("/").length === 2) || path.dirname(importPath) === dir)
                    return;
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
