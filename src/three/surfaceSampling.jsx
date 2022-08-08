import React, { useRef, useEffect, useState, Suspense, useMemo } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import { MeshSurfaceSampler } from "three-stdlib";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { StyledTHREEContainer } from "../styles/styles";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OBJLoader } from "three-stdlib";
import Loader from "./loader";

const pos = [];
const cols = [];

const Sampler = ({ dotCount, setDotCount }) => {
  /**
   * animations
   */
  useFrame(({ clock }) => {});

  /**
   * options
   */
  const palette = [
    new THREE.Color("#FAAD80"),
    new THREE.Color("#FF6767"),
    new THREE.Color("#FF3D68"),
    new THREE.Color("#A73489"),
  ];

  const tempPosition = new Vector3();

  const colorMap = useLoader(
    TextureLoader,
    "https://assets.codepen.io/127738/dotTexture.png"
  );

  /**
   * whale
   */
  const whaleMaterials = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0x000000,
    transparent: true,
    opacity: 0.05,
  });
  const obj = useLoader(OBJLoader, "/textures/whale/Mesh_Whale.obj");
  obj.children[0].material = whaleMaterials;

  const samplerWhale = new MeshSurfaceSampler(obj.children[0]);
  samplerWhale.build();

  //   const cols = [];

  const [positions, colors] = useMemo(() => {
    samplerWhale.sample(tempPosition);
    pos.push(tempPosition.x, tempPosition.y, tempPosition.z);
    const randomColor = palette[Math.floor(Math.random() * palette.length)];
    cols.push(randomColor.r, randomColor.g, randomColor.b, 1);

    return [new Float32Array(pos), new Float32Array(cols)];
  }, [dotCount]);

  useEffect(() => {
    if (obj === "undefined") return;

    const t = setInterval(() => {
      if (dotCount < 100) {
        setDotCount((prev) => prev + 1);
      }
    }, 100);

    return () => clearTimeout(t);
  }, []);

  return (
    <group>
      <primitive
        object={obj}
        wireframe={true}
        color={0x000000}
        transparent={true}
        opacity={0.05}
      />
      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach={"attributes-position"}
            args={[positions, 3]}
          />
          <bufferAttribute attach={"attributes-color"} args={[colors, 4]} />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          size={1}
          alphaTest={0.2}
          map={colorMap}
          vertexColors={true}
        />
      </points>
    </group>
  );
};

const SurfaceSampling = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [dotCount, setDotCount] = useState(20);

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

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
          <Sampler dotCount={dotCount} setDotCount={setDotCount} />
        </Suspense>
      </Canvas>
    </StyledTHREEContainer>
  );
};

export default SurfaceSampling;
