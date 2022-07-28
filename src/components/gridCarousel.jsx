import React from "react";
import Flicking from "@egjs/react-flicking";
import { FrameGrid } from "@egjs/react-grid";

// import "./variable.css";
// import "./flicking.css";
// import "@egjs/flicking/dist/flicking.css";
// import "@egjs/flicking-plugins/dist/flicking-plugins.css";

const GridCarousel = () => {
  return (
    <Flicking className="flicking flicking0" circular={true}>
      <div className="grid-panel-primary">1</div>

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
      <div className="grid-panel-primary">7</div>
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
          <div className={"item"}>8</div>
          <div className={"item"}>9</div>
          <div className={"item"}>10</div>
          <div className={"item"}>11</div>
          <div className={"item"}>12</div>
          <div className={"item"}>13</div>
        </FrameGrid>
      </div>
    </Flicking>
  );
};

export default GridCarousel;
