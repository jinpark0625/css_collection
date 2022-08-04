import React from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";

const VariableSizeCarousel = ({ plugin, arrow }) => {
  return (
    <div id="variable-size" className="container">
      <Flicking className="flicking flicking0" circular={true} plugins={plugin}>
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
        {arrow && (
          <ViewportSlot>
            <span className="flicking-arrow-prev"></span>
            <span className="flicking-arrow-next"></span>
          </ViewportSlot>
        )}
        <ViewportSlot>
          <div className="flicking-pagination"></div>
        </ViewportSlot>
      </Flicking>
    </div>
  );
};

export default VariableSizeCarousel;
