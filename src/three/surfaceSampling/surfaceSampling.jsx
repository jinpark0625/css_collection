import React, {
  useEffect,
  useState,
  Suspense,
  useMemo,
  useRef,
  useLayoutEffect,
} from "react";
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

let previousPoint;

const createPath = (samplerWhale, geometry) => {
  /* Variable used to exit the while loop when we find a point */

  let pointFound = false;
  /* Loop while we haven't found a point */
  while (!pointFound) {
    /* Sample a random point */
    samplerWhale.sample(tempPosition);
    /* If the new point is less 30 units from the previous point */
    if (tempPosition.distanceTo(previousPoint) < 30) {
      /* Add the new point in the vertices array */
      vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
      /* Store the new point vector */
      previousPoint = tempPosition.clone();
      /* Exit the loop */
      pointFound = true;
    }
  }
  const points = new Float32Array(vertices);
  geometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
};

const Sampler = () => {
  const lineRef = useRef();
  /**
   * animations
   */
  useFrame(({ clock }) => {
    if (lineRef.current) {
      if (vertices.length < 10000) {
        createPath(samplerWhale, lineRef.current.geometry);
      }
    }
  });

  /**
   * options
   */

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

  useLayoutEffect(() => {
    samplerWhale.sample(tempPosition);
    previousPoint = tempPosition.clone();
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
      <line ref={lineRef}>
        <lineBasicMaterial color={0x14b1ff} transparent={true} opacity={0.5} />
      </line>
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
