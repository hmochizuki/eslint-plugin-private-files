type Options = {
  prefix: string;
  suffix: string;
}

export const isPrivateFile = (filePath: string, options: Options) => {
  const prefix = options.prefix ? `^${options.prefix}.*|` : "";
  const suffix = options.suffix ? `\\.${options.suffix}` : "";
  const reg = new RegExp(`(${prefix}${suffix})(|.js|.jsx|.ts|.tsx)$`);
  return reg.test(filePath);
};