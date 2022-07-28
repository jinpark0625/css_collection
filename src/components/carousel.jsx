import React from "react";
// import Flicking from "@egjs/react-flicking";
// import { FrameGrid } from "@egjs/react-grid";
// import "./variable.css";
// import "./flicking.css";
// import "@egjs/flicking/dist/flicking.css";
// import "@egjs/flicking-plugins/dist/flicking-plugins.css";

const Carousel = () => {
  return (
    <Flicking className="flicking flicking0" circular={true}>
      <div
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <div className={"item"}>1</div>
        <FrameGrid
          className="container"
          gap={20}
          defaultDirection={"end"}
          // frame={[
          //   [1, 1, 2, 2],
          //   [3, 3, 2, 2],
          //   [4, 4, 4, 5],
          // ]}
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
    </Flicking>
  );
};

export default Carousel;
