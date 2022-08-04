import React, { useRef, useCallback, useState } from "react";
import {
  StyledContainer,
  AccordionHeader,
  AccordionButton,
  AccordionContentsWrapper,
  AccordionContents,
} from "../../styles/styles";

const AccordionMultiple = ({
  headerColor,
  label,
  contentBackgroundColor,
  contentColor,
  headerBackgroundColor,
  containerSize,
}) => {
  //to give animation
  const parentRef = useRef(null);
  const childRef = useRef(null);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false);

  const handleButtonClick = useCallback(
    (e) => {
      e.stopPropagation();

      setIsContentOpen((prev) => !prev);
      setIsCollapsed(!isCollapsed);
    },
    [isCollapsed]
  );

  return (
    <StyledContainer
      headerBackgroundColor={headerBackgroundColor}
      containerSize={containerSize}
      margin="0 0 16px 0"
    >
      <AccordionHeader onClick={handleButtonClick} headerColor={headerColor}>
        {label}
        <AccordionButton>{isCollapsed ? "close" : "open"}</AccordionButton>
      </AccordionHeader>
      <AccordionContentsWrapper
        ref={parentRef}
        isContentOpen={isContentOpen ? true : false}
        contentBackgroundColor={contentBackgroundColor}
      >
        <AccordionContents
          ref={childRef}
          isContentOpen={isContentOpen ? true : false}
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

export default AccordionMultiple;
