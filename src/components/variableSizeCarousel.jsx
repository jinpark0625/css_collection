import React from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { AutoPlay, Arrow } from "@egjs/flicking-plugins";

const VariableSizeCarousel = () => {
  const plugins = [
    new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false }),
    new Arrow(),
  ];

  return (
    <div id="variable-size" className="container" plugins={plugins}>
      <Flicking className="flicking flicking0" circular={true}>
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
        <ViewportSlot>
          <span className="flicking-arrow-prev"></span>
          <span className="flicking-arrow-next"></span>
        </ViewportSlot>
      </Flicking>
    </div>
  );
};

export default VariableSizeCarousel;
