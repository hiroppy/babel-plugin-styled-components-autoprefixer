import styled from 'styled-components';

const color = '#777';
const hoge = '';

// styled.h1`
//   display: flex;
// `;

styled.h1`
  background: ${color};
  display: flex;
  border: 2px solid ${props => props.theme.main};
  padding: ${(props) => {
    props.theme.main
  }};
`;
