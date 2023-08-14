import styled from 'styled-components';
import { FlexContainer } from '../atoms';

export const File = styled(FlexContainer)<{ selected: boolean }>`
  padding: 10px;
  border-radius: 5px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: ${(props) => (props.selected ? '2px solid #9c4949' : '')};
`;
