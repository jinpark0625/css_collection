import React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { StyledTHREEContainer } from "../styles/styles";
import { InstancedBufferGeometry } from "three";

const Particles = ({ float = new Float32Array() }) => {
  const {
    size: { width, height },
  } = useThree();

  const numPoints = width * height;

  const [positions, uvs, index] = React.useMemo(() => {
    const initialVertices = [
      -0.5, 0.5, 0, 0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0,
    ];
    const initialUvs = [0, 0, 1, 0, 0, 1, 1, 1];
    const initialIndex = [0, 2, 1, 2, 3, 1];

    return [
      new Float32Array(initialVertices),
      new Float32Array(initialUvs),
      new Uint16Array(initialIndex),
    ];
  }, []);

  const [indices, offsets, angles] = React.useMemo(() => {
    const initialIndices = [];
    const initialOffsets = [];
    const initialAngles = [];

    for (let i = 0; i < numPoints; i++) {
      initialIndices[i] = i;

      initialOffsets[i * 3 + 0] = i % width;
      initialOffsets[i * 3 + 1] = Math.floor(i / width);

      initialAngles[i] = Math.random() * Math.PI;
    }

    return [
      new Uint16Array(initialIndices),
      new Float32Array(initialOffsets),
      new Float32Array(initialAngles),
    ];
  }, []);

  const ref = React.useRef();
  const geoRef = React.useRef();

  return (
    <mesh ref={ref}>
      <instancedBufferGeometry attach="geometry" ref={geoRef}>
        <instancedBufferAttribute
          attach={"attributes-position"}
          args={[positions, 3]}
        />
        <instancedBufferAttribute attach={"attributes-uv"} args={[uvs, 2]} />
        <instancedBufferAttribute
          attach={"attributes-index"}
          args={[index, 1]}
        />
        <instancedBufferAttribute
          attach={"attributes-pindex"}
          args={[indices, 1]}
        />
        <instancedBufferAttribute
          attach={"attributes-offset"}
          args={[offsets, 3]}
        />
        <instancedBufferAttribute
          attach={"attributes-angle"}
          args={[angles, 1]}
        />
      </instancedBufferGeometry>
    </mesh>
  );
};

const InterativeParticle = () => {
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", () => {
      handleResize();
    });

    return window.removeEventListener("resize", () => {
      handleResize();
    });
  }, []);

  return (
    <StyledTHREEContainer windowSize={windowSize}>
      <Canvas
        dpr={[1, 1.5]} //pixelRatio
      >
        <Particles />
      </Canvas>
    </StyledTHREEContainer>
  );
};

export default InterativeParticle;
