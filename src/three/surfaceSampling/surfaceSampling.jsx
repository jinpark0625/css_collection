import React, { useEffect, useState, Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import { MeshSurfaceSampler, OBJLoader } from "three-stdlib";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { StyledTHREEContainer } from "../../styles/styles";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import Loader from "../loader";

const vertices = [];
const colors = [];
const tempPosition = new Vector3();

const palette = [
  new THREE.Color("#FAAD80"),
  new THREE.Color("#FF6767"),
  new THREE.Color("#FF3D68"),
  new THREE.Color("#A73489"),
];

const createGeometry = (samplerWhale, geometry) => {
  // const geometry = new THREE.BufferGeometry();

  samplerWhale.sample(tempPosition);
  vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
  const points = new Float32Array(vertices);
  geometry.setAttribute("position", new THREE.BufferAttribute(points, 3));

  const randomColor = palette[Math.floor(Math.random() * palette.length)];
  colors.push(randomColor.r, randomColor.g, randomColor.b);
  const colorsArray = new Float32Array(colors);
  geometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));
  // return geometry;
};

const Sampler = ({ dotCount, setDotCount }) => {
  const pointsRef = useRef();
  /**
   * animations
   */
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      if (vertices.length < 10000) {
        createGeometry(samplerWhale, pointsRef.current.geometry);
      }
    }
  });

  /**
   * options
   */

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

  // const [positions, colors] = useMemo(() => {
  //   samplerWhale.sample(tempPosition);
  //   pos.push(tempPosition.x, tempPosition.y, tempPosition.z);
  //   const randomColor = palette[Math.floor(Math.random() * palette.length)];
  //   cols.push(randomColor.r, randomColor.g, randomColor.b, 1);

  //   return [new Float32Array(pos), new Float32Array(cols)];
  // }, [dotCount]);

  // const geometry = useMemo(() => createGeometry(samplerWhale), []);

  return (
    <group>
      <primitive
        object={obj}
        wireframe={true}
        color={0x000000}
        transparent={true}
        opacity={0.05}
      />
      <points ref={pointsRef}>
        {/* <bufferGeometry attach="geometry">
          <bufferAttribute
            attach={"attributes-position"}
            args={[new Float32Array(vertices), 3]}
          />
          <bufferAttribute
            attach={"attributes-color"}
            args={[new Float32Array(colors), 4]}
          />
        </bufferGeometry> */}
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
          <Sampler />
        </Suspense>
      </Canvas>
    </StyledTHREEContainer>
  );
};

export default SurfaceSampling;
