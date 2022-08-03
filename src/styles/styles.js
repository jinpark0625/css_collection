import styled from "styled-components";

//common

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

//hamburger

export const StyledMenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 50px;
`;

export const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
  margin-top: 50px;
`;

export const StyledMenuWrap = styled.div`
  background-color: #f2f2f2;
  border-radius: 20px;
  display: flex;
  flex: 1 1 33.33333%;
  justify-content: center;
  align-items: center;
  max-width: 240px;
  min-width: 240px;
  height: 240px;
  flex-direction: column;
`;

/**
 * THREE
 */
//grain
export const StyledTHREEContainer = styled.div`
  width: ${({ windowSize }) => windowSize.width}px;
  height: ${({ windowSize }) => windowSize.height}px;
`;
