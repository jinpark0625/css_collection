import styled from "styled-components";

export const StyledContainer = styled.div`
  background: ${({ headerBackgroundColor }) => headerBackgroundColor};
  width: ${({ containerSize }) => containerSize};
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
`;

export const StyledTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

export const StyledMenuContainer = styled.div`
  background: ${({ headerBackgroundColor }) => headerBackgroundColor};
  width: ${({ containerSize }) => containerSize};
  height: ${({ containerHeight }) => containerHeight};
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
`;

export const StyledMenuWrap = styled.div``;
