import React, { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import * as dat from "lil-gui";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { StyledTHREEContainer } from "../styles/styles";

const Sphere = ({ SetSphereRef, meshSampler }) => {
  const spref = useRef();
  const count = 300;
  const tempPosition = new THREE.Vector3();
  const tempObject = new THREE.Object3D();

  useEffect(() => {
    SetSphereRef(spref);
  }, []);

  useEffect(() => {
    // Set positions
    if (meshSampler && spref) {
      for (let i = 0; i < 300; i++) {
        meshSampler.sample(tempPosition);
        tempObject.position.set(tempPosition.x, tempPosition.y, tempPosition.z);
        tempObject.scale.setScalar(Math.random() * 0.5 + 0.5);
        tempObject.updateMatrix();
        spref.current.setMatrixAt(i, tempObject.matrix);
      }
      console.log("sss");
      // Update the instance
      spref.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  return (
    <instancedMesh ref={spref} args={[null, null, count]}>
      <sphereGeometry args={[0.05, 6, 6]} />
      <meshBasicMaterial color={0xffa0e6} />
    </instancedMesh>
  );
};

const Sampler = ({ SetSamplerRef, setMeshSampler }) => {
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    cubeRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  const cubeRef = useRef();

  useEffect(() => {
    SetSamplerRef(cubeRef);
    setMeshSampler(new MeshSurfaceSampler(cubeRef.current).build());
  }, []);

  return (
    <>
      <mesh ref={cubeRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={0x66ccff} wireframe={true} />
      </mesh>
    </>
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

  const [meshSampler, setMeshSampler] = useState();
  const [samplerRef, SetSamplerRef] = useState();

  const [sphereRef, SetSphereRef] = useState();

  //   const tempPosition = new THREE.Vector3();
  //   const tempObject = new THREE.Object3D();

  //   useEffect(() => {
  //     // Set positions
  //     if (meshSampler && sphereRef) {
  //       for (let i = 0; i < 300; i++) {
  //         meshSampler.sample(tempPosition);
  //         tempObject.position.set(tempPosition.x, tempPosition.y, tempPosition.z);
  //         tempObject.scale.setScalar(Math.random() * 0.5 + 0.5);
  //         tempObject.updateMatrix();
  //         sphereRef.current.setMatrixAt(i, tempObject.matrix);
  //       }
  //       // Update the instance
  //       sphereRef.current.instanceMatrix.needsUpdate = true;
  //     }
  //   }, []);

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
        <group>
          <Sampler
            SetSamplerRef={SetSamplerRef}
            setMeshSampler={setMeshSampler}
          />
          <Sphere SetSphereRef={SetSphereRef} meshSampler={meshSampler} />
        </group>
      </Canvas>
    </StyledTHREEContainer>
  );
};

export default SurfaceSampling;
