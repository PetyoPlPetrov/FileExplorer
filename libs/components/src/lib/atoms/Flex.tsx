import styled from 'styled-components';
interface FlexProps {
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  flexDirection?: string;
  wrap?: string;
  maxWidth?: string;
  padding?: string;
  display?: string;
  minWidth?: string;
  cursor?: string;
}
export const FlexContainer = styled.div<FlexProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  gap: ${(props) => props.gap};
  flex-direction: ${(props) => props.flexDirection};
  flex-wrap: ${(props) => props.wrap};
  min-width: ${(props) => props.minWidth};
  max-width: ${(props) => props.maxWidth};
  padding: ${(props) => props.padding};
  display: ${(props) => props.display};
  cursor: ${(props) => props.cursor};
`;
