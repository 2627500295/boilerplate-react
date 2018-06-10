// https://prettier.io/docs/en/configuration.html

module.exports = {
  // 120字后折行
  printWidth: 120,

  // 制表符
  tabWidth: 2,

  // 使用制表符, 否则使用空格
  useTabs: false,

  // 单引号
  singleQuote: true,

  // 尾随逗号 <none|es5|all>
  trailingComma: 'none',

  // 括号两边添加空格
  bracketSpacing: true,

  // jsx 把 > 放置在最后一行末尾
  jsxBracketSameLine: false,

  // 语法解析 <babylon|flow|typescript|postcss|json|graphql|markdown>
  parser: 'flow',

  // 末尾添加分号
  semi: true,

  // 箭头函数参数始终放置圆括号 <avoid|always>
  arrowParens: 'always',

  // 多行 (Markdown) <always|never|preserve>
  proseWrap: 'preserve',
};
