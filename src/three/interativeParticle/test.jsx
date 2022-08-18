import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
// import { Image } from "@react-three/drei";
import { StyledTHREEContainer, GlobalStyle } from "../../styles/styles";
import { Vector2, LinearFilter, RGBFormat } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { forwardRef } from "react";

// import { vertexShader, fragmentShader } from "../shader/particleShader/shader";
// import { OrbitControls } from "@react-three/drei";

// const Particles = ({ canvasRef }) => {
//   //   const texture = useLoader(TextureLoader, "/scroll_images/img1.jpg");
//   //   texture.minFilter = LinearFilter;
//   //   texture.magFilter = LinearFilter;
//   //   texture.format = RGBFormat;
//   //   const img = texture.image;

//   //   const width = texture.image.width;
//   //   const height = texture.image.height;
//   //   const numPoints = width * height;

//   //   const canvas = React.useMemo(() => {
//   //     let numVisible = 0;
//   //     let threshold = 0;

//   //     const img = texture.image;
//   //     const canvas = document.createElement("canvas");
//   //     const ctx = canvas.getContext("2d");

//   //     canvas.width = width;
//   //     canvas.height = height;
//   //     ctx.scale(1, -1);
//   //     ctx.drawImage(img, 0, 0, width, height * -1);

//   //     const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//   //     const originalColors = Float32Array.from(imgData.data);

//   //     for (let i = 0; i < numPoints; i++) {
//   //       if (originalColors[i * 4 + 0] > threshold) {
//   //         numVisible++;
//   //       }
//   //     }

//   //     return numVisible;
//   //   }, []);

//   //   let uniforms = {
//   //     uTime: {
//   //       value: 0,
//   //     },
//   //     uRandom: {
//   //       value: 0,
//   //     },
//   //     uDepth: {
//   //       value: 2.0,
//   //     },
//   //     uSize: {
//   //       value: 0,
//   //     },
//   //     uTextureSize: {
//   //       value: new Vector2(width, height),
//   //     },
//   //     uTexture: {
//   //       value: texture,
//   //     },
//   //     uTouch: {
//   //       value: null,
//   //     },
//   //   };

//   //   const [positions, uvs, index] = React.useMemo(() => {
//   //     const initialVertices = [
//   //       -0.5, 0.5, 0, 0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0,
//   //     ];
//   //     const initialUvs = [0, 0, 1, 0, 0, 1, 1, 1];
//   //     const initialIndex = [0, 2, 1, 2, 3, 1];

//   //     return [
//   //       new Float32Array(initialVertices),
//   //       new Float32Array(initialUvs),
//   //       new Uint16Array(initialIndex),
//   //     ];
//   //   }, []);

//   //   const [indices, offsets, angles] = React.useMemo(() => {
//   //     const initialIndices = [];
//   //     const initialOffsets = [];
//   //     const initialAngles = [];

//   //     for (let i = 0; i < numPoints; i++) {
//   //       initialIndices[i] = i;

//   //       initialOffsets[i * 3 + 0] = i % width;
//   //       initialOffsets[i * 3 + 1] = Math.floor(i / width);

//   //       initialAngles[i] = Math.random() * Math.PI;
//   //     }

//   //     return [
//   //       new Uint16Array(initialIndices),
//   //       new Float32Array(initialOffsets),
//   //       new Float32Array(initialAngles),
//   //     ];
//   //   }, []);

//   //   const { gl } = useThree();

//   //   React.useEffect(() => {
//   //     const ctx = gl.getContext("2d");
//   //     console.log(ctx);
//   //     // ctx.scale(1, -1);
//   //     // ctx.drawImage(img, 0, 0, width, height * -1);
//   //   }, []);

//   React.useEffect(() => {
//     const positons = new Float32Array([
//       -0.5, 0.5, 0, 0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0,
//     ]);
//   });

//   return(
//     <mesh>
//         <instancedBufferGeometry attach="geometry">
//             <instancedBufferAttribute
//             attach={"attributes-position"}
//             args={[positions, 3]}
//             />
//         </instancedBufferGeometry>
//     </mesh>
//   )

//   return (
//     // <mesh>
//     //   <instancedBufferGeometry attach="geometry">
//     //     <instancedBufferAttribute
//     //       attach={"attributes-position"}
//     //       args={[positions, 3]}
//     //     />
//     //     <instancedBufferAttribute attach={"attributes-uv"} args={[uvs, 2]} />
//     //     <instancedBufferAttribute
//     //       attach={"attributes-index"}
//     //       args={[index, 1]}
//     //     />
//     //     <instancedBufferAttribute
//     //       attach={"attributes-pindex"}
//     //       args={[indices, 1]}
//     //     />
//     //     <instancedBufferAttribute
//     //       attach={"attributes-offset"}
//     //       args={[offsets, 3]}
//     //     />
//     //     <instancedBufferAttribute
//     //       attach={"attributes-angle"}
//     //       args={[angles, 1]}
//     //     />
//     //   </instancedBufferGeometry>
//     //   <shaderMaterial
//     //     uniforms={uniforms}
//     //     vertexShader={vertexShader}
//     //     fragmentShader={fragmentShader}
//     //     depthTest={false}
//     //     transparent={true}
//     //   />
//     //   <meshBasicMaterial />
//     // </mesh>
//   );
// };

// const Plz = () => {
//   const ref = React.useRef();

//   const [windowSize, setWindowSize] = React.useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   React.useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", () => {
//       handleResize();
//     });

//     return window.removeEventListener("resize", () => {
//       handleResize();
//     });
//   }, []);

//   return (
//     <StyledTHREEContainer windowSize={windowSize}>
//       <Canvas
//         dpr={[1, 1.5]} //pixelRatio
//         ref={ref}
//         gl={{ preserveDrawingBuffer: true }}
//       >
//         <OrbitControls />
//         <Particles canvasRef={ref} />
//       </Canvas>
//     </StyledTHREEContainer>
//   );
// };

// export default Plz;

const value = {
  numVisible: null,
  threshold: null,
  uniforms: {},
  positions: null,
  uvs: null,
  index: null,
  indices: null,
  offsets: null,
  angles: null,
};

const Plz = () => {
  const texture = useLoader(TextureLoader, "/scroll_images/soccer.png");
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.format = RGBFormat;

  useEffect(() => {
    const width = texture.image.width;
    const height = texture.image.height;

    const numPoints = width * height;
    value.numVisible = numPoints;
    value.threshold = 0;
    let discard = true;

    const img = texture.image;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    document.body.appendChild(ctx.canvas);
    ctx.canvas.classList.add("canvas2D");

    canvas.width = width;
    canvas.height = height;
    ctx.scale(1, -1);
    ctx.drawImage(img, 0, 0, width, height * -1);

    initPoints(discard, width, height, texture, numPoints);
  }, [texture]);

  return <>{/* <Canvas></Canvas> */}</>;
};

export default Plz;

const initPoints = (discard, width, height, texture, numPoints) => {
  let originalColors;

  if (discard) {
    // discard pixels darker than threshold #22
    value.numVisible = 0;
    value.threshold = 34;

    const img = texture.image;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;
    ctx.scale(1, -1);
    ctx.drawImage(img, 0, 0, width, height * -1);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    originalColors = Float32Array.from(imgData.data);

    for (let i = 0; i < numPoints; i++) {
      if (originalColors[i * 4 + 0] > value.threshold) value.numVisible++;
    }

    value.uniforms = {
      uTime: {
        value: 0,
      },
      uRandom: {
        value: 0,
      },
      uDepth: {
        value: 2.0,
      },
      uSize: {
        value: 0,
      },
      uTextureSize: {
        value: new Vector2(width, height),
      },
      uTexture: {
        value: texture,
      },
      uTouch: {
        value: null,
      },
    };

    const initialVertices = [
      -0.5, 0.5, 0, 0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0,
    ];
    const initialUvs = [0, 0, 1, 0, 0, 1, 1, 1];
    const initialIndex = [0, 2, 1, 2, 3, 1];
    const initialIndices = [];
    const initialOffsets = [];
    const initialAngles = [];

    for (let i = 0; i < numPoints; i++) {
      initialIndices[i] = i;

      initialOffsets[i * 3 + 0] = i % width;
      initialOffsets[i * 3 + 1] = Math.floor(i / width);

      initialAngles[i] = Math.random() * Math.PI;
    }

    const [positions, uvs, index] = [
      new Float32Array(initialVertices),
      new Float32Array(initialUvs),
      new Uint16Array(initialIndex),
    ];

    const [indices, offsets, angles] = [
      new Uint16Array(initialIndices),
      new Float32Array(initialOffsets),
      new Float32Array(initialAngles),
    ];
  }
};
