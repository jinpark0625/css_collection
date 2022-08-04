import React, { useEffect } from "react";
import "@egjs/flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/flicking-plugins/dist/arrow.css";
import "../../styles/carouselStyles/commonCarousel.css";
import "../../styles/carouselStyles/gridCarousel.css";
import "../../styles/carouselStyles/variableCarousel.css";
import { CarouselContainer, CarouselErrorMessage } from "../../styles/styles";
import PropTypes from "prop-types";
import GridCarousel from "./gridCarousel";
import VariableSizeCarousel from "./variableSizeCarousel";
import { AutoPlay, Arrow, Pagination } from "@egjs/flicking-plugins";

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
  }, [auto, bulletPagination, arrow, type]);

  const SelectedCarousel = ({ selected, plugin, arrow }) => {
    switch (selected) {
      case "variable":
        return <VariableSizeCarousel plugin={plugin} arrow={arrow} />;
      case "grid":
        return <GridCarousel plugin={plugin} arrow={arrow} />;
      default:
        return (
          <CarouselErrorMessage>
            There is no the type of carousel
          </CarouselErrorMessage>
        );
    }
  };

  return (
    <CarouselContainer>
      <SelectedCarousel selected={type} plugin={plugin} arrow={arrow} />
    </CarouselContainer>
  );
};

Carousel.propTypes = {
  type: PropTypes.oneOf(["variable", "grid"]),
  auto: PropTypes.bool,
  arrow: PropTypes.bool,
  bulletPagination: PropTypes.bool,
};

export default Carousel;
