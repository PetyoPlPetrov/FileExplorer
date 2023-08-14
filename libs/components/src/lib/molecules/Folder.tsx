import styled from 'styled-components';
import { FlexContainer } from '../atoms';

export const Folder = styled(FlexContainer)<{ selected: boolean }>`
  min-width: 4rem;
  min-height: 4rem;
  padding: 0.5rem;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  &:hover {
    background-color: #e0e0e0;
  }
  border: ${(props) => (props.selected ? '2px solid #9c4949' : '')};
`;
