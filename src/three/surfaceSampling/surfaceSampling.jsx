import React, { useEffect, useState, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { StyledTHREEContainer } from "../../styles/styles";
import Loader from "../loader";
import PropTypes from "prop-types";

const Point = React.lazy(() => import("./point"));
const Path = React.lazy(() => import("./path"));

const SurfaceSampling = ({ type = "point" }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [type]);

  return (
    <StyledTHREEContainer windowSize={windowSize}>
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          aspect: window.innerWidth / window.innerHeight,
          position: [0, 100, 230],
        }}
        gl={{ antialias: false }}
      >
        <OrbitControls />
        <Suspense fallback={<Loader />}>
          {type === "point" ? <Point /> : <Path />}
        </Suspense>
      </Canvas>
    </StyledTHREEContainer>
  );
};

SurfaceSampling.propTypes = {
  type: PropTypes.oneOf(["point", "line"]),
};

export default SurfaceSampling;
