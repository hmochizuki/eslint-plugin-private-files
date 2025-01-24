import privateFilesPlugin from './index.js';

export default [
  {
    files: ['src/**/*.ts'],
    plugins: {
      'private-files': privateFilesPlugin
    },
    rules: {
      'private-files/no-external-imports': 'error'
    }
  }
]; 