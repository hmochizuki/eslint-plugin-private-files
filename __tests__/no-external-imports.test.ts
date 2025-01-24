import { describe, it, expect } from 'vitest';
import { RuleTester } from 'eslint';
import rule from '../src/index';

const ruleTester = new RuleTester();

describe('no-external-imports', () => {
  it('should pass for valid imports', () => {
    ruleTester.run('no-external-imports', rule.rules['no-external-imports'], {
      valid: [
        {
          code: "import './localModule';",
          filename: 'src/example.private.ts',
        },
      ],
      invalid: [],
    });
  });

  it('should fail for invalid imports', () => {
    ruleTester.run('no-external-imports', rule.rules['no-external-imports'], {
      valid: [],
      invalid: [
        {
          code: "import '../externalModule';",
          filename: 'src/example.private.ts',
          errors: [{ message: 'Relative imports must start with "./" for *.private.ts files.' }],
        },
      ],
    });
  });
}); 