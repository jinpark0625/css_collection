import React, { useState, useCallback, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * style
 */
const StyledContainer = styled.div`
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

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 32px;
  margin: 0 32px 0 8px;
  color: ${({ headerColor }) => headerColor};
`;

const StyledButton = styled.div`
  top: 8px;
  right: 8px;
  font-size: 14px;
  position: absolute;
  color: #929292;
`;

const ContentsWrapper = styled.div`
  background: ${({ contentBackgroundColor }) => contentBackgroundColor};
  width: fit-content;
  height: ${({ isContentOpen, children }) =>
    isContentOpen ? `${children?.ref?.current.clientHeight}px` : 0};
  overflow: hidden;
  transition: height 0.35s ease, background 0.35s ease;
`;

const Contents = styled.div`
  padding: 20px;
  color: ${({ contentColor }) => contentColor};
`;

const Accordian = ({
  label,
  size = "md",
  headerColor = "#212b36",
  contentColor = "#212b36",
  headerBackgroundColor = "#fff",
  contentBackgroundColor = "#F5F5F5",
}) => {
  /**
   * states
   */
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const [containerSize, setContainerSize] = useState("500px");

  /**
   * events
   */
  const handleButtonClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      setIsContentOpen((prev) => !prev);
      setIsCollapsed(!isCollapsed);
    },
    [isCollapsed]
  );

  useEffect(() => {
    switch (size) {
      case "sm":
        setContainerSize("300px");
        break;
      case "md":
        setContainerSize("500px");
        break;
      case "lg":
        setContainerSize("800px");
        break;
      default:
        return null;
    }
  }, [size]);

  return (
    <StyledContainer
      headerBackgroundColor={headerBackgroundColor}
      containerSize={containerSize}
    >
      <StyledHeader onClick={handleButtonClick} headerColor={headerColor}>
        {label}
        <StyledButton>{isCollapsed ? "close" : "open"}</StyledButton>
      </StyledHeader>
      <ContentsWrapper
        ref={parentRef}
        isContentOpen={isContentOpen}
        contentBackgroundColor={contentBackgroundColor}
      >
        <Contents
          ref={childRef}
          isContentOpen={isContentOpen}
          contentColor={contentColor}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
          voluptates quae nostrum totam quaerat, commodi asperiores ullam. Neque
          enim beatae, cum, optio, tempora autem est a sint vitae ipsum debitis!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
          voluptates quae nostrum totam quaerat, commodi asperiores ullam. Neque
          enim beatae, cum, optio, tempora autem est a sint vitae ipsum debitis!
        </Contents>
      </ContentsWrapper>
    </StyledContainer>
  );
};

Accordian.propTypes = {
  label: PropTypes.string,
  backgroundColor: PropTypes.string,
  contentColor: PropTypes.string,
  headerColor: PropTypes.string,
  contentBackgroundColor: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Accordian;
