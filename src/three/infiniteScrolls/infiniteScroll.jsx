import * as THREE from "three";
import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Preload, Image as ImageImpl, OrbitControls } from "@react-three/drei";
import { ScrollControls, Scroll, useScroll } from "./scrollControls";
import { StyledTHREEContainer } from "../../styles/styles";

const Image = (props) => {
  const ref = useRef();
  const group = useRef();
  // const data = useScroll();

  console.log(ref);

  return (
    <group ref={group}>
      <ImageImpl ref={ref} {...props} />
    </group>
  );
};

const Page = ({ m = 0.4, urls, ...props }) => {
  // viewport 의 width의 접근
  const { width } = useThree((state) => state.viewport);

  //viewport에 따른 비율
  //viewport는 width/height의 비율이다.
  //1200px 미만은 10이다.
  // 0.5 && 0.33
  const w = width < 10 ? 1.5 / 3 : 1 / 3;

  //**
  //* m이란?
  //**

  //pages > 에서 받은 props는
  // url과 position

  return (
    <group {...props}>
      <Image
        position={[-width * w, 0, -1]} //현재 x축 : -width(10.xxx) * 0.5, y축: 0, z축 : -1
        scale={[width * w - m * 2, 5, 1]} // x축 : width(10.xxx) * 0.5 - 0.4 * 2, y축 : 5, z축 : 1]
        url={urls[0]}
      />
      <Image
        position={[0, 0, 0]} //현재 x축 : 0, y축: 0, z축 : 0
        //scale를 통해서 Image를 원하는 크기로 자를수있다.
        scale={[width * w - m * 2, 5, 1]} // x축 : width(10.xxx) * 0.5 - 0.4 * 2, y축 : 5, z축 : 1]
        url={urls[1]}
      />
      <Image
        position={[width * w, 0, 1]} //현재 x축 : width(10.xxx) * 0.5, y축: 0, z축 : 1
        scale={[width * w - m * 2, 5, 1]} // x축 : width(10.xxx) * 0.5 - 0.4 * 2, y축 : 5, z축 : 1]
        url={urls[2]}
      />
    </group>
  );
};

const Pages = () => {
  // viewport 의 width의 접근
  const { width } = useThree((state) => state.viewport);

  //**
  //* pages를 보면 Page컴포넌트가 반복이된다. 반복문으로 도 사용할수있지않을까?
  //**

  return (
    <group>
      <Page
        position={[-width * 1, 0, 0]} //한 화면(width)에 3개의 이미지를 띄우기위해
        urls={[
          "/scroll_images/trip1.jpg",
          "/scroll_images/trip2.jpg",
          "/scroll_images/trip3.jpg",
        ]}
      />
      <Page
        position={[width * 0, 0, 0]}
        urls={[
          "/scroll_images/img1.jpg",
          "/scroll_images/img2.jpg",
          "/scroll_images/img3.jpg",
        ]}
      />
      <Page
        position={[width * 1, 0, 0]}
        urls={[
          "/scroll_images/img4.jpg",
          "/scroll_images/img5.jpg",
          "/scroll_images/img6.jpg",
        ]}
      />

      <Page
        position={[width * 2, 0, 0]}
        urls={[
          "/scroll_images/trip1.jpg",
          "/scroll_images/trip2.jpg",
          "/scroll_images/trip3.jpg",
        ]}
      />
      <Page
        position={[width * 3, 0, 0]}
        urls={[
          "/scroll_images/img1.jpg",
          "/scroll_images/img2.jpg",
          "/scroll_images/img3.jpg",
        ]}
      />
      <Page
        position={[width * 4, 0, 0]}
        urls={[
          "/scroll_images/img4.jpg",
          "/scroll_images/img5.jpg",
          "/scroll_images/img6.jpg",
        ]}
      />
    </group>
  );
};

const InfiniteScroll = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
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
        gl={{ antialias: false }}
        dpr={[1, 1.5]} //pixelRatio
      >
        <OrbitControls />
        <Suspense fallback={null}>
          <Pages />
          <ScrollControls />
          {/* <ScrollControls
            infinite
            horizontal
            damping={4}
            pages={4}
            distance={1}
          ></ScrollControls> */}
        </Suspense>
      </Canvas>
    </StyledTHREEContainer>
  );
};

export default InfiniteScroll;
