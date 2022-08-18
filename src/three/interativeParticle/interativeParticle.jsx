import React from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import { StyledTHREEContainer } from "../../styles/styles";
import { Vector2, LinearFilter, RGBFormat } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { vertexShader, fragmentShader } from "../shader/particleShader/shader";

const Particles = ({ float = new Float32Array(), discard = true }) => {
  /**
   * renderer
   */
  const {
    size: { width, height },
    gl,
  } = useThree();

  const ref = React.useRef();
  const geoRef = React.useRef();

  /**
   * texture Loader
   */
  const map = useLoader(TextureLoader, "/scroll_images/img1.jpg");
  map.minFilter = LinearFilter;
  map.magFilter = LinearFilter;
  map.format = RGBFormat;

  /**
   * options
   */

  // all pixels
  const numPoints = width * height;
  let numVisible = numPoints;
  let threshold = 0;
  let originalColors;

  // const img = map.image;

  // discard pixels darker than threshold #22
  numVisible = 0;
  threshold = 34;

  // const img = this.texture.image;
  const img = map.image;

  // canvas.width = this.width;
  // canvas.height = this.height;
  // ctx.scale(1, -1);
  // ctx.drawImage(img, 0, 0, this.width, this.height * -1);

  // const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  console.log(map, gl.domElement.getContext("2d"));

  // originalColors = Float32Array.from(imgData.data);

  // for (let i = 0; i < this.numPoints; i++) {
  //   if (originalColors[i * 4 + 0] > threshold) numVisible++;
  // }

  /**
   * attributes
   */
  const [positions, uvs, index] = React.useMemo(() => {
    const initialVertices = [
      -0.5, 0.5, 0, 0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0,
    ];
    const initialUvs = [0, 0, 1, 0, 0, 1, 1, 1];
    const initialIndex = [0, 2, 1, 2, 3, 1];

    return [
      new Float32Array(initialVertices),
      new Float32Array(initialUvs),
      new Uint16Array(initialIndex),
    ];
  }, []);

  const [indices, offsets, angles] = React.useMemo(() => {
    const initialIndices = [];
    const initialOffsets = [];
    const initialAngles = [];

    for (let i = 0; i < numPoints; i++) {
      initialIndices[i] = i;

      initialOffsets[i * 3 + 0] = i % width;
      initialOffsets[i * 3 + 1] = Math.floor(i / width);

      initialAngles[i] = Math.random() * Math.PI;
    }

    return [
      new Uint16Array(initialIndices),
      new Float32Array(initialOffsets),
      new Float32Array(initialAngles),
    ];
  }, []);

  /**
   * uniforms
   */

  const uniforms = React.useMemo(
    () => ({
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
        value: null,
      },
      uTouch: {
        value: null,
      },
    }),
    []
  );

  /**
   * material
   */

  return (
    <mesh ref={ref}>
      {/* <instancedBufferGeometry attach="geometry" ref={geoRef}>
        <instancedBufferAttribute
          attach={"attributes-position"}
          args={[positions, 3]}
        />
        <instancedBufferAttribute attach={"attributes-uv"} args={[uvs, 2]} />
        <instancedBufferAttribute
          attach={"attributes-index"}
          args={[index, 1]}
        />
        <instancedBufferAttribute
          attach={"attributes-pindex"}
          args={[indices, 1]}
        />
        <instancedBufferAttribute
          attach={"attributes-offset"}
          args={[offsets, 3]}
        />
        <instancedBufferAttribute
          attach={"attributes-angle"}
          args={[angles, 1]}
        />
      </instancedBufferGeometry> */}
      {/* <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthTest={false}
        transparent={true}
      /> */}
      <planeGeometry />
      <meshBasicMaterial map={map} />
    </mesh>
  );
};

const InterativeParticle = () => {
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

  const ref = React.useRef();
  const img = React.useRef();

  return (
    <StyledTHREEContainer windowSize={windowSize}>
      <Canvas
        dpr={[1, 1.5]} //pixelRatio
        ref={ref}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Particles />
        <Image ref={img} url={"/scroll_images/trip1.jpg"} />
      </Canvas>
    </StyledTHREEContainer>
  );
};

export default InterativeParticle;
