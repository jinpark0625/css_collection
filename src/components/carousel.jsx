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
import { AutoPlay, Arrow, Pagination } from "@egjs/flicking-plugins";

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

const _autoPlay = new AutoPlay({
  duration: 2000,
  direction: "NEXT",
  stopOnHover: false,
});
const _arrow = new Arrow();
const _pagination = new Pagination({ type: "bullet" });

const Carousel = ({
  type = "variable",
  auto = false,
  arrow = false,
  bulletPagination = false,
}) => {
  // const [plugin, setPlugin] = useState([]);
  let plugin = [];

  useEffect(() => {
    if (auto) {
      plugin.push(_autoPlay);
    } else {
      plugin.filter((el) => el !== _autoPlay);
    }
    if (bulletPagination) {
      plugin.push(_pagination);
    } else {
      plugin.filter((el) => el !== _pagination);
    }
    if (arrow) {
      plugin.push(_arrow);
    } else {
      plugin.filter((el) => el !== _arrow);
    }
  }, [auto, bulletPagination, arrow]);

  const SelectedCarousel = ({ selected, plugin }) => {
    switch (selected) {
      case "variable":
        return <VariableSizeCarousel plugin={plugin} />;
      case "grid":
        return <GridCarousel plugin={plugin} />;
      default:
        return <ErrorMessage>There is no the type of carousel</ErrorMessage>;
    }
  };

  return (
    <Container>
      <SelectedCarousel selected={type} plugin={plugin} />
    </Container>
  );
};

Carousel.propTypes = {
  type: PropTypes.oneOf(["variable", "grid"]),
  auto: PropTypes.bool,
  arrow: PropTypes.bool,
  bulletPagination: PropTypes.bool,
};

export default Carousel;
