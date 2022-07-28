import React, { useState, useCallback, useRef, useEffect } from "react";
import "@egjs/flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "../styles/gridCarousel.css";
import "../styles/variableCarousel.css";
import GridCarousel from "./gridCarousel";
import VariableSizeCarousel from "./variableSizeCarousel";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  max-width: 848px;
  width: 100%;
  margin: 30px auto;
  overflow: hidden;
`;

const Carousel = ({ type = "variable" }) => {
  console.log(type);
  const SelectedCarousel = ({ selected }) => {
    switch (selected) {
      case "variable":
        return <VariableSizeCarousel />;
      case "grid":
        return <GridCarousel />;
      default:
        return <div>Error...</div>;
    }
  };

  return (
    <Container>
      <SelectedCarousel selected={type} />
    </Container>
  );
};

Carousel.propTypes = {
  type: PropTypes.string,
};

export default Carousel;
