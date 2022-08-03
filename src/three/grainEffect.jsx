import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import * as dat from "lil-gui";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { StyledTHREEContainer } from "../styles/styles";

// const debugObject = {};
// const gui = new dat.GUI({
//   width: 400,
// });

// //scene
// const scene = new THREE.Scene();

// //model
// const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
// const sphereMaterial = new THREE.MeshBasicMaterial({
//   color: "black",
//   wireframe: true,
// });
// const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
// scene.add(sphereMesh);

// //sizes
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// // resize
// window.addEventListener("resize", () => {
//   // Update sizes
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;

//   // Update camera
//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();

//   // Update renderer
//   renderer.setSize(sizes.width, sizes.height);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//   // update fireflies
//   firefliesMaterial.uniforms.uPixelRatio.value = Math.min(
//     window.devicePixelRatio,
//     2
//   );
// });

// //camera
// const camera = new THREE.PerspectiveCamera(
//   45,
//   sizes.width / sizes.height,
//   0.1,
//   100
// );
// camera.position.x = 4;
// camera.position.y = 2;
// camera.position.z = 4;
// scene.add(camera);

// // Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// // renderer
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
//   antialias: true,
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// /**
//  * Animate
//  */
// const clock = new THREE.Clock();

// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();

//   //update matarial
//   firefliesMaterial.uniforms.uTime.value = elapsedTime;
//   portalLightMaterial.uniforms.uTime.value = elapsedTime;

//   // Update controls
//   controls.update();

//   // Render
//   renderer.render(scene, camera);

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick);
// };

// tick();

const GrainEffect = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {}, []);

  return (
    <StyledTHREEContainer>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          aspect: window.innerWidth / window.innerHeight,
          position: [4, 2, 4],
        }}
      >
        <OrbitControls />
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </StyledTHREEContainer>
  );
};

export default GrainEffect;
