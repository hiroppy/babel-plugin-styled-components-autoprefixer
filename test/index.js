import fs from 'fs';
import test from 'ava';
import * as babel from 'babel-core';
import traverse from 'babel-traverse';
import styledComponentsAutoprefixer from '../';

test('should convert by autoprefixer', (t) => {
  const output = babel.transformFileSync(__dirname + '/fixtures/source', {
    plugins: [styledComponentsAutoprefixer],
    presets: ['es2015']
  });

  let res          = '';
  let argumentsArr = [];

  traverse(output.ast, {
    enter(path) {
      if (path.node.type === 'CallExpression') {
        if (path.node.callee.object && path.node.callee.object.name === 'styled') {
          argumentsArr = path.node.arguments;
        }
      }
      if (path.node.type === 'ArrayExpression') {
        res = path.node.elements.map((elem) => elem.value).join('');
      }
    }
  });

  const expectedCss =
    fs.readFileSync(__dirname + '/fixtures/expected-css', 'utf-8');
  const expectedArguments =
    fs.readFileSync(__dirname + '/fixtures/expected-arguments', 'utf-8');

  t.is(res.trim(), expectedCss.trim());
  t.is(argumentsArr.length, ~~expectedArguments);
});
