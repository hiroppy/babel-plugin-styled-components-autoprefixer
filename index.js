const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

module.exports = function ({types: t}) {
  return {
    visitor: {
      TaggedTemplateExpression(path) {
        const {node} = path;
        const quasi = node.quasi;

        const prefix = 'STYLED_COMPONENT__';
        let expressions = [];

        if (node.tag.object.name !== 'styled') return false;

        const css = quasi.quasis.reduce((acc, q, i) => {
          const expr     = node.quasi.expressions[i];
          const exprName = expr ? `${prefix}${i}` : '';

          if (expr) {
            expressions.push({
              expr,
              exprName
            });
          }

          return acc + q.value.raw + exprName;
        }, '');

        const convertedCss = postcss(autoprefixer).process(css).css;

        const splitedQuasis = [];
        let prevIndex       = 0;

        expressions.forEach((expr) => {
          const regex = new RegExp(expr.exprName, 'g');
          const index = regex.exec(convertedCss).index;

          splitedQuasis.push(convertedCss.substring(prevIndex, index));
          prevIndex = index + expr.exprName.length;
        });

        splitedQuasis.push(convertedCss.substring(prevIndex, convertedCss.length));

        const quasis = splitedQuasis.map((e) => t.templateElement({raw: e, cooked: e}));

        quasi.quasis = quasis;
      }
    }
  };
}
