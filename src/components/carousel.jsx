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

const ErrorMessage = styled.div`
  width: 320px;
  height: 80px;
  background: #eee;
  border-radius: 8px;
  color: #212921;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Carousel = ({ type = "variable" }) => {
  const SelectedCarousel = ({ selected }) => {
    switch (selected) {
      case "variable":
        return <VariableSizeCarousel />;
      case "grid":
        return <GridCarousel />;
      default:
        return <ErrorMessage>There is no the type of carousel</ErrorMessage>;
    }
  };

  return (
    <Container>
      <SelectedCarousel selected={type} />
    </Container>
  );
};

Carousel.propTypes = {
  type: PropTypes.oneOf(["variable", "grid"]),
};

export default Carousel;
