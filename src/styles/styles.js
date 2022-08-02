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
  padding: 50px 50px 0;
  width: 100%;
  box-sizing: border-box;
  margin: -10px;
`;

export const StyledMenuWrap = styled.div`
  background: ${({ headerBackgroundColor }) => headerBackgroundColor};
  flex: 1 1 30%;
  min-width: 530px;
  max-width: 530px;
  margin: 10px;
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
