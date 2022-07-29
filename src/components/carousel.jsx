import React, { useState, useCallback, useRef, useEffect } from "react";
import "@egjs/flicking/dist/flicking.css";
import "../styles/commonCarousel.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/flicking-plugins/dist/arrow.css";
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

const Carousel = ({
  type = "variable",
  auto = false,
  arrow = false,
  pagination = false,
}) => {
  const SelectedCarousel = ({ selected, auto, arrow, pagination }) => {
    switch (selected) {
      case "variable":
        return <VariableSizeCarousel auto={auto} />;
      case "grid":
        return <GridCarousel auto={auto} />;
      default:
        return <ErrorMessage>There is no the type of carousel</ErrorMessage>;
    }
  };

  return (
    <Container>
      <SelectedCarousel selected={type} auto={auto} />
    </Container>
  );
};

Carousel.propTypes = {
  type: PropTypes.oneOf(["variable", "grid"]),
  auto: PropTypes.bool,
  arrow: PropTypes.bool,
  pagination: PropTypes.bool,
};

export default Carousel;
