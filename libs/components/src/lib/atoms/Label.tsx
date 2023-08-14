import styled from 'styled-components';

export const Label = styled.label<{ invalid?: boolean }>`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: ${(props) => (props.invalid ? 'red' : 'black')};
`;
