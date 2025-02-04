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