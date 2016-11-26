# babel-plugin-styled-components-autoprefixer

autoprefixer for [styled-components](https://github.com/styled-components/styled-components).
I want to exclude autoprefixer from styled-componets.
I think autoprefixer should be executed at bundle.
However styled-componets has autoprefixer in a production codes....

### Input
```javascript
styled.h1`
  display: flex;
`;
```

### Output
```javascript
var _templateObject = _taggedTemplateLiteral(['\n  display: -webkit-box;\ndisplay: -ms-flexbox;\ndisplay: flex;\n'], ['\n  display: -webkit-box;\ndisplay: -ms-flexbox;\ndisplay: flex;\n']);

_styledComponents2.default.h1(_templateObject);

-------------------------

// As you can see:
display: -webkit-box;
display: -ms-flexbox;
display: flex;
```

### Input
```javascript
styled.h1`
  background: ${color};
  display: flex;
  border: 2px solid ${props => props.theme.main};
  padding: ${(props) => {
    props.theme.main
  }};
`;
```

### Output
```javascript
var _templateObject = _taggedTemplateLiteral(['\n  background: ', ';\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  border: 2px solid ', ';\n  padding: ', ';\n'], ['\n  background: ', ';\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  border: 2px solid ', ';\n  padding: ', ';\n']);

_styledComponents2.default.h1(_templateObject, color, function (props) {
  return props.theme.main;
}, function (props) {
  props.theme.main;
});
```
