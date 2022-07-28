import React, { useState, useCallback, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Flicking from "@egjs/react-flicking";
import "./variable.css";
import "./flicking.css";
import "@egjs/flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";

import GridCarousel from "./gridCarousel";

const VariableSizeCarousel = () => {
  return (
    <div id="variable-size" className="container">
      {/* <Flicking className="flicking flicking0" circular={true}>
        <div className="panel panel0">
          <span className="flicking-index">0</span>
        </div>
        <div className="panel panel1">
          <span className="flicking-index">1</span>
        </div>
        <div className="panel panel2">
          <span className="flicking-index">2</span>
        </div>
        <div className="panel panel3">
          <span className="flicking-index">3</span>
        </div>
        <div className="panel panel4">
          <span className="flicking-index">4</span>
        </div>
      </Flicking> */}

      <GridCarousel />
    </div>
  );
};

export default VariableSizeCarousel;
