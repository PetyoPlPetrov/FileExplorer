import { FlexContainer } from '@files-manager/components';
import styled from 'styled-components';

interface LabelContainerProps {
  marginLeft: string;
  cursor: string;
  fontWeight: string;
  backgroundColor: string;
  boxShadow: string;
}
export const LabelContainer = styled(FlexContainer)<LabelContainerProps>`
  display: inline-flex;
  border-radius: 3px;
  min-width: 4rem;
  gap: 0.5rem;

  margin-left: ${(props) => props.marginLeft};
  cursor: ${(props) => props.cursor};
  font-weight: ${(props) => props.fontWeight};
  background-color: ${(props) => props.backgroundColor};
  box-shadow: ${(props) => props.boxShadow};
`;
