import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import { MeshSurfaceSampler, OBJLoader } from "three-stdlib";

import { useFrame, useLoader } from "@react-three/fiber";

import { TextureLoader } from "three/src/loaders/TextureLoader";

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
  samplerWhale.sample(tempPosition);
  vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
  const points = new Float32Array(vertices);
  geometry.setAttribute("position", new THREE.BufferAttribute(points, 3));

  const randomColor = palette[Math.floor(Math.random() * palette.length)];
  colors.push(randomColor.r, randomColor.g, randomColor.b);
  const colorsArray = new Float32Array(colors);
  geometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));
};

const Point = () => {
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

export default Point;
