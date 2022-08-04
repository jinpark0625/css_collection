import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import AccordionElements from "./accordionElements";
import AccordionMultiple from "./accordionMultiple";

const Accordion = ({
  label,
  size = "md",
  headerColor = "#212b36",
  contentColor = "#212b36",
  headerBackgroundColor = "#fff",
  contentBackgroundColor = "#F5F5F5",
  selected = "openOne",
}) => {
  /**
   * states
   */
  const [isCollapsed, setIsCollapsed] = useState(null);
  const [isContentOpen, setIsContentOpen] = useState(null);
  const [containerSize, setContainerSize] = useState("500px");

  const accordionsLength = [
    {
      name: "first",
    },
    {
      name: "second",
    },
    {
      name: "third",
    },
    {
      name: "fourth",
    },
  ];

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

  /**
   * events
   */
  const handleButtonClick = useCallback(
    (e, index) => {
      e.stopPropagation();
      if (isContentOpen === index) {
        setIsContentOpen(null);
        setIsCollapsed(null);
        return;
      }
      setIsContentOpen(index);
      setIsCollapsed(index);
    },
    [isCollapsed]
  );

  if (selected === "openOne")
    return (
      <>
        {accordionsLength.map((item, idx) => (
          <AccordionElements
            key={idx}
            index={idx}
            headerColor={headerColor}
            label={label}
            isCollapsed={isCollapsed}
            isContentOpen={isContentOpen}
            headerBackgroundColor={headerBackgroundColor}
            containerSize={containerSize}
            contentBackgroundColor={contentBackgroundColor}
            contentColor={contentColor}
            onClick={handleButtonClick}
          />
        ))}
      </>
    );
  if (selected === "multipleOne")
    return (
      <>
        {accordionsLength.map((item, idx) => (
          <AccordionMultiple
            key={idx}
            headerColor={headerColor}
            label={label}
            headerBackgroundColor={headerBackgroundColor}
            containerSize={containerSize}
            contentColor={contentColor}
            contentBackgroundColor={contentBackgroundColor}
          />
        ))}
      </>
    );
};

Accordion.propTypes = {
  selected: PropTypes.oneOf(["openOne", "multipleOne"]),
  label: PropTypes.string,
  backgroundColor: PropTypes.string,
  contentColor: PropTypes.string,
  headerColor: PropTypes.string,
  contentBackgroundColor: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Accordion;
