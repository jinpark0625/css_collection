import React from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { FrameGrid } from "@egjs/react-grid";
import { AutoPlay, Arrow, Pagination } from "@egjs/flicking-plugins";

const GridCarousel = ({ auto }) => {
  const plugins = [
    new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false }),
    new Arrow(),
    new Pagination({ type: "bullet" }),
  ];

  return (
    <Flicking className="flicking flicking0" circular={true} plugins={plugins}>
      <div className="grid-panel-primary grid-panel-first">1</div>
      <div style={{ width: "100%", maxWidth: "424px" }}>
        <FrameGrid
          className="grid-container"
          gap={10}
          defaultDirection={"end"}
          frame={[
            [1, 1, 2, 2],
            [3, 3, 2, 2],
            [4, 4, 4, 5],
          ]}
          rectSize={0}
          useFrameFill={true}
        >
          <div className={"item"}>2</div>
          <div className={"item"}>3</div>
          <div className={"item"}>4</div>
          <div className={"item"}>5</div>
          <div className={"item"}>6</div>
        </FrameGrid>
      </div>
      <div className="grid-panel-primary grid-panel-sec">7</div>
      <div style={{ width: "100%", maxWidth: "424px" }}>
        <FrameGrid
          className="grid-container"
          gap={10}
          defaultDirection={"end"}
          frame={[
            [1, 1, 1, 1],
            [2, 2, 3, 3],
            [4, 5, 5, 6],
          ]}
          rectSize={0}
          useFrameFill={true}
        >
          <div className={"itemSec"}>8</div>
          <div className={"itemSec"}>9</div>
          <div className={"itemSec"}>10</div>
          <div className={"itemSec"}>11</div>
          <div className={"itemSec"}>12</div>
          <div className={"itemSec"}>13</div>
        </FrameGrid>
      </div>
      <ViewportSlot>
        <span className="flicking-arrow-prev"></span>
        <span className="flicking-arrow-next"></span>
      </ViewportSlot>
      <ViewportSlot>
        <div className="flicking-pagination"></div>
      </ViewportSlot>
    </Flicking>
  );
};

export default GridCarousel;
