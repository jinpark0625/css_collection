import React, { useRef, useCallback } from "react";
import {
  StyledContainer,
  AccordionHeader,
  AccordionButton,
  AccordionContentsWrapper,
  AccordionContents,
} from "../../styles/styles";

const AccordionElements = ({
  index,
  headerColor,
  label,
  isCollapsed,
  isContentOpen,
  contentBackgroundColor,
  contentColor,
  headerBackgroundColor,
  containerSize,
  onClick,
}) => {
  //to give animation
  const parentRef = useRef(null);
  const childRef = useRef(null);

  return (
    <StyledContainer
      headerBackgroundColor={headerBackgroundColor}
      containerSize={containerSize}
      margin="0 0 16px 0"
    >
      <AccordionHeader
        onClick={(e) => onClick(e, index)}
        headerColor={headerColor}
      >
        {label}
        <AccordionButton>
          {isCollapsed === index ? "close" : "open"}
        </AccordionButton>
      </AccordionHeader>
      <AccordionContentsWrapper
        ref={parentRef}
        isContentOpen={isContentOpen === index ? true : false}
        contentBackgroundColor={contentBackgroundColor}
      >
        <AccordionContents
          ref={childRef}
          isContentOpen={isContentOpen === index ? true : false}
          contentColor={contentColor}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
          voluptates quae nostrum totam quaerat, commodi asperiores ullam. Neque
          enim beatae, cum, optio, tempora autem est a sint vitae ipsum debitis!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
          voluptates quae nostrum totam quaerat, commodi asperiores ullam. Neque
          enim beatae, cum, optio, tempora autem est a sint vitae ipsum debitis!
        </AccordionContents>
      </AccordionContentsWrapper>
    </StyledContainer>
  );
};

export default AccordionElements;
