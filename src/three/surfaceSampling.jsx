import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import * as THREE from "three";
import { Color, Group, InstancedMesh, Mesh, Object3D, Vector3 } from "three";
import { MeshSurfaceSampler } from "three-stdlib";
import * as dat from "lil-gui";
// import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { StyledTHREEContainer } from "../styles/styles";

const Sampler = ({ SetSamplerRef, setMeshSampler }) => {
  useFrame(({ clock }) => {
    meshToSampleRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  const meshToSampleRef = useRef();

  const instancedRef = useRef();

  const count = 300;

  useEffect(() => {
    if (meshToSampleRef.current === "undefined") return;
    if (instancedRef.current === "undefined") return;

    const samplerKnot = new MeshSurfaceSampler(meshToSampleRef.current);
    samplerKnot.build();

    const tempPosition = new Vector3();
    const tempObject = new Object3D();

    // updates the global transform of the object and its descendants
    meshToSampleRef.current.updateMatrixWorld(true);

    for (let i = 0; i < count; i++) {
      // sample a random point on the surface of the cube & 상장를 표본으로 만들기, 랜덤한 위치의 표본들이 생성
      samplerKnot.sample(tempPosition);
      // store that point coordinates in the dummy object & 다양한 점들의 좌표들을 저장, 샘플러들로부터 받은 위치를 선정
      tempObject.position.set(tempPosition.x, tempPosition.y, tempPosition.z);
      // define a random scale, 구의 크기를 랜덤으로 생성 0 ~ 1 까지의 수를 생성
      tempObject.scale.setScalar(Math.random() * 0.5 + 0.5);
      //update the matrix of the object
      tempObject.updateMatrix();
      //insert the object updated matrix into our instancedMesh matrix
      instancedRef.current.setMatrixAt(i, tempObject.matrix);
    }
    // Update the instance
    instancedRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      <mesh ref={meshToSampleRef}>
        <torusKnotGeometry args={[4, 1.3, 100, 16]} />
      </mesh>
      <instancedMesh ref={instancedRef} args={[null, null, count]}>
        <sphereGeometry args={[0.05, 6, 6]} />
        <meshBasicMaterial color={0xffa0e6} />
      </instancedMesh>
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
  /**
   * playing with particles
   */
  // sample the coordinates
  //   const vertices = [];
  //   const tempPosition = new THREE.Vector3();
  //   for (let i = 0; i < 15000; i++) {
  //     meshSampler.sample(tempPosition);
  //     vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
  //   }

  //create a geometry from the coordinates
  //   const pointsGeomtery = <bufferGeometry />;

  return (
    <StyledTHREEContainer windowSize={windowSize}>
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          aspect: window.innerWidth / window.innerHeight,
          position: [1, 1, 2],
        }}
        gl={{ antialias: false }}
      >
        <OrbitControls />

        <Sampler />
      </Canvas>
    </StyledTHREEContainer>
  );
};

export default SurfaceSampling;
