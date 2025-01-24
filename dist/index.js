import path from 'path';
const privateFileSuffix = 'private';
export const isPrivateFile = (importPath, suffix) => {
    const reg = new RegExp(`\\.${suffix}(|.js|.jsx|.ts|.tsx)$`);
    return reg.test(importPath);
};
export const errorMessage = 'Imports from outside the same directory are not allowed for *.private.ts files.';
const rule = {
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
                const importPath = node.source.value;
                if (!isPrivateFile(importPath, privateFileSuffix))
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
