import React, { useEffect, useState } from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { AutoPlay, Arrow, Pagination } from "@egjs/flicking-plugins";

const VariableSizeCarousel = ({ auto, pagination, arrow }) => {
  const _autoPlay = new AutoPlay({
    duration: 2000,
    direction: "NEXT",
    stopOnHover: false,
  });
  const _arrow = new Arrow();
  const _pagination = new Pagination({ type: "bullet" });

  const [plugin, setPlugin] = useState([]);

  const plugins = plugin;

  useEffect(() => {
    if (auto) {
      setPlugin((prev) => [...prev, _autoPlay]);
    } else {
      let newPlugin = plugin.filter((el) => el !== _autoPlay);
      setPlugin(newPlugin);
    }
    if (arrow) {
      setPlugin((prev) => [...prev, _arrow]);
    } else {
      let newPlugin = plugin.filter((el) => el !== _arrow);
      setPlugin(newPlugin);
    }
    // if (pagination) {
    //   setPlugin((prev) => [...prev, _pagination]);
    // } else {
    //   let newPlugin = plugin.filter((el) => el !== _pagination);
    //   setPlugin(newPlugin);
    // }
  }, [auto, arrow]);

  return (
    <div id="variable-size" className="container">
      <Flicking
        className="flicking flicking0"
        circular={true}
        plugins={plugins}
      >
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
        <ViewportSlot>
          <div className="flicking-pagination"></div>
        </ViewportSlot>
      </Flicking>
    </div>
  );
};

export default VariableSizeCarousel;
