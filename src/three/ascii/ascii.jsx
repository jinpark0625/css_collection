import React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { StyledTHREEContainer } from "../../styles/styles";
import { OrbitControls } from "@react-three/drei";
import { AsciiEffect } from "three-stdlib";

const AsciiRenderer = ({
  renderIndex = 1,
  characters = " .:-+*=%@#",
  ...props
}) => {
  // Reactive state
  const { size, gl, scene, camera } = useThree();

  // Create effect
  const effect = React.useMemo(() => {
    const effect = new AsciiEffect(gl, characters, props);
    effect.domElement.style.position = "absolute";
    effect.domElement.style.top = "0px";
    effect.domElement.style.left = "0px";
    effect.domElement.style.color = "#f2f2f2";
    effect.domElement.style.backgroundColor = "black";
    effect.domElement.style.pointerEvents = "none";
    return effect;
  }, [characters, props.invert]);

  // Append on mount, remove on unmount
  React.useEffect(() => {
    gl.domElement.parentNode.appendChild(effect.domElement);
    return () => gl.domElement.parentNode.removeChild(effect.domElement);
  }, [effect]);

  // Set size
  React.useEffect(() => {
    effect.setSize(size.width, size.height);
  }, [effect, size]);

  // Take over render-loop (that is what the index is for)
  useFrame((state) => {
    effect.render(scene, camera);
  }, renderIndex);
};

const Sphere = () => {
  const ref = React.useRef();

  useFrame(({ clock }, delta) => {
    ref.current.position.y = Math.sin(clock.elapsedTime * 3.2) * 80 + 40;
    //   Math.abs(Math.sin(clock.elapsedTime * 0.002)) * 150;
    ref.current.rotation.x += delta * 0.3;
    ref.current.rotation.z += delta * 0.2;
  });

  return (
    <mesh ref={ref} position={[0, 10, 0]}>
      <sphereGeometry args={[200, 20, 10]} />
      <meshPhongMaterial flatShading={true} />
    </mesh>
  );
};

const Plane = () => {
  return (
    <mesh position={[0, -200, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[400, 400]} />
      <meshBasicMaterial color={0xe0e0e0} />
    </mesh>
  );
};

const Ascii = () => {
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
        camera={{
          fov: 70,
          near: 1,
          far: 1000,
          aspect: windowSize.width / windowSize.height,
          position: [0, 150, 700],
        }}
      >
        <color attach="background" args={["black"]} />
        <OrbitControls />
        <pointLight color={0xffffff} position={[500, 500, 500]} />
        <pointLight
          color={0xffffff}
          intensity={0.25}
          position={[-500, -500, -500]}
        />
        <Sphere />
        <Plane />
        <AsciiRenderer invert />
      </Canvas>
    </StyledTHREEContainer>
  );
};

export default Ascii;
