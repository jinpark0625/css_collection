import React, {
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
  useMemo,
  Suspense,
} from "react";
import * as THREE from "three";
import {
  Color,
  Group,
  InstancedMesh,
  Mesh,
  Object3D,
  Vector3,
  BufferAttribute,
} from "three";
import { MeshSurfaceSampler } from "three-stdlib";
import * as dat from "lil-gui";
import { OrbitControls, PointMaterial, Stage } from "@react-three/drei";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { StyledTHREEContainer } from "../styles/styles";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OBJLoader } from "three-stdlib";
import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

const Sampler = ({ SetSamplerRef, setMeshSampler }) => {
  /**
   * animations
   */
  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  /**
   * refs
   */
  const meshToSampleRef = useRef();
  const groupRef = useRef();

  /**
   * options
   */
  const count = 15000;
  const vertices = [];
  const colors = [];
  const palette = [
    new THREE.Color("#FAAD80"),
    new THREE.Color("#FF6767"),
    new THREE.Color("#FF3D68"),
    new THREE.Color("#A73489"),
  ];

  const [dotPositions, setDotPositions] = useState(1);
  const [colorAttr, setColorAttr] = useState(1);

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

  useLayoutEffect(() => {
    if (obj === "undefined") return;

    //model이라 ref로 안잡힌다.
    const samplerWhale = new MeshSurfaceSampler(obj.children[0]);
    samplerWhale.build();

    /**
     * playing with particles
     */
    // sample the coordinates
    const tempPosition = new Vector3();
    /* Get a random color from the palette */

    for (let i = 0; i < count; i++) {
      samplerWhale.sample(tempPosition);
      vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors.push(color.r, color.g, color.b);
    }
    setDotPositions(new BufferAttribute(new Float32Array(vertices), 3));
    setColorAttr(new BufferAttribute(new Float32Array(colors), 3));
  }, []);

  return (
    <group ref={groupRef}>
      <primitive
        object={obj}
        wireframe={true}
        color={0x000000}
        transparent={true}
        opacity={0.05}
      />

      <points>
        <bufferGeometry>
          <bufferAttribute attach={"attributes-position"} {...dotPositions} />
          <bufferAttribute attach={"attributes-color"} {...colorAttr} />
        </bufferGeometry>
        <pointsMaterial
          // Let Three.js knows that each point has a different color
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
