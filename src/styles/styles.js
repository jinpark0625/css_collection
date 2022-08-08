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
  margin: ${({ margin }) => margin};
`;

export const StyledTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;
/**
 * ACCORDIAN
 */
export const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 32px;
  margin: 0 32px 0 8px;
  color: ${({ headerColor }) => headerColor};
`;

export const AccordionButton = styled.div`
  top: 8px;
  right: 8px;
  font-size: 14px;
  position: absolute;
  color: #929292;
`;

export const AccordionContentsWrapper = styled.div`
  background: ${({ contentBackgroundColor }) => contentBackgroundColor};
  width: fit-content;
  height: ${({ isContentOpen, children }) =>
    isContentOpen ? `${children?.ref?.current.clientHeight}px` : 0};
  overflow: hidden;
  transition: height 0.35s ease, background 0.35s ease;
`;

export const AccordionContents = styled.div`
  padding: 20px;
  color: ${({ contentColor }) => contentColor};
`;

/**
 * CAROUSEL
 */
export const CarouselContainer = styled.div`
  max-width: 848px;
  width: 100%;
  margin: 30px auto;
  overflow: hidden;
`;

export const CarouselErrorMessage = styled.div`
  width: 320px;
  height: 80px;
  background: #eee;
  border-radius: 8px;
  color: #212921;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background: ${({ background }) => background};
`;
