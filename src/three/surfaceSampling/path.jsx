import React, { useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import { MeshSurfaceSampler, OBJLoader } from "three-stdlib";

import { useFrame, useLoader } from "@react-three/fiber";

const vertices = [];
const tempPosition = new Vector3();

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

const Path = () => {
  const lineRef = useRef([]);
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
        <lineBasicMaterial
          attachArray="material"
          color={0xff3d68}
          transparent={true}
          opacity={0.5}
        />
      </line>
    </group>
  );
};

export default Path;
