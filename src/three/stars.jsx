import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
// import DatGui, { DatColor, DatNumber } from "@tim-soft/react-dat-gui";
import DatGui, { DatColor, DatNumber } from "react-dat-gui";
import "../styles/gui.css";

const Star = ({ starsOpt }) => {
  const ref = useRef();
  const materialRef = useRef();
  //0 ~ 1.5 랜덤의 구를 형성한다
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(1000), { radius: 1.5 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <>
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color={starsOpt.starColor}
            size={starsOpt.starSize}
            sizeAttenuation={true}
            depthWrite={false}
            ref={materialRef}
          />
        </Points>
      </group>
    </>
  );
};

const Stars = () => {
  const [starsOpt, setStarsOpt] = useState({
    starSize: 0.005,
    starColor: "#ffa0e0",
    background: "#12071F",
  });
  return (
    <div
      style={{ background: starsOpt.background, width: "100%", height: "100%" }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <OrbitControls />
        <Star starsOpt={starsOpt} />
      </Canvas>
      <DatGui data={starsOpt} onUpdate={setStarsOpt}>
        <DatNumber
          path="starSize"
          label="stars size"
          min={0}
          max={0.01}
          step={0.001}
        />
        <DatColor path="starColor" label="stars color" />
        <DatColor path="background" label="background color" />
      </DatGui>
    </div>
  );
};

export default Stars;
