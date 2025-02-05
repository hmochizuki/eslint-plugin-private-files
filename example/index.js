import path from 'path';
import { isPrivateFile } from './isPrivateFile';
export const errorMessage = 'Imports from outside the same directory are not allowed for private files.';
const schema = [
    {
        type: 'object',
        properties: {
            prefix: { type: 'string' },
            suffix: { type: 'string' },
        },
    }
];
const defaultOptions = {
    prefix: '_',
    suffix: '',
};
const rule = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow imports from outside the same directory for private files',
            category: 'Best Practices',
            recommended: true
        },
        schema,
    },
    create(context) {
        const options = context.options[0] || defaultOptions;
        return {
            ImportDeclaration(node) {
                const filePath = context.filename;
                const dir = path.dirname(filePath);
                const importPath = node.source.value;
                if (!isPrivateFile(importPath, options))
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
