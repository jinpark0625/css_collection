import * as THREE from "three";
import * as React from "react";
import {
  // context as fiberContext,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { Html } from "@react-three/drei";

//context를 통하여 state를 관리
const context = React.createContext(null);

export const useScroll = () => {
  //어떻게 state data가 넘어올까?
  return React.useContext(context);
};

export const ScrollControls = ({
  eps = 0.00001, //
  enabled = true, //
  infinite, //
  horizontal, //
  pages = 1, //
  distance = 1, //
  damping = 4, //
  children, //
}) => {
  // useThree를 사용해서 기본 renderer옵션들을 설정할수있다.
  const { gl, size, invalidate } = useThree();
  // element, div를 형성한다.
  const [el] = React.useState(() => document.createElement("div"));
  // div를 형성한다.
  const [fill] = React.useState(() => document.createElement("div"));
  //
  const [fixed] = React.useState(() => document.createElement("div"));
  //
  const target = gl.domElement.parentNode;
  //현재 스크롤을 저장한다.
  const scroll = React.useRef(0);

  const state = React.useMemo(() => {
    const state = {
      el,
      eps,
      fill,
      fixed,
      horizontal,
      damping,
      offset: 0,
      delta: 0,
      scroll,
      pages,

      // 0부터 1까지의 from부터 from + distance까지의 범위
      range(from, distance, margin) {
        const start = from - margin;
        const end = start + distance + margin * 2;
        return this.offset < start
          ? 0
          : this.offset > end
          ? 1
          : (this.offset - start) / (end - start);
      },
      // 0-1-0 from부터 from + distance까지의 범위
      curve(from, distance, margin) {
        return Math.sin(this.range(from, distance, margin) * Math.PI);
      },
      // true / false rom부터 from + distance까지의 범위
      visible(from, distance, margin = 0) {
        const start = from - margin;
        const end = start + distance + margin * 2;
        return this.offset >= start && this.offset <= end;
      },
    };
    return state;
  }, [eps, damping, horizontal, pages]);

  React.useEffect(() => {
    // el의 setup
    el.style.position = "absolute";
    el.style.width = "100%";
    el.style.height = "100%";
    el.style[horizontal ? "overflowX" : "overflowY"] = "auto";
    el.style[horizontal ? "overflowY" : "overflowX"] = "hidden";
    el.style.top = "0px";
    el.style.left = "0px";
    el.classList.add("el");
    // fixed의 setup
    fixed.style.position = "sticky";
    fixed.style.top = "0px";
    fixed.style.left = "0px";
    fixed.style.width = "100%";
    fixed.style.height = "100%";
    fixed.style.overflow = "hidden";
    fixed.classList.add("fixed");
    el.appendChild(fixed);

    // Fill의 setup
    fill.style.height = horizontal ? "100%" : `${pages * distance * 100}%`;
    fill.style.width = horizontal ? `${pages * distance * 100}%` : "100%";
    fill.style.pointerEvents = "none";
    fill.classList.add("fill");
    el.appendChild(fill);

    target.appendChild(el);

    // Init scroll one pixel in to allow upward/leftward scroll
    el[horizontal ? "scrollLeft" : "scrollTop"] = 1;

    return () => {
      target.removeChild(el);
    };
  }, [pages, distance, horizontal, el, fill, fixed, target]);

  React.useEffect(() => {
    const containerLength = size[horizontal ? "width" : "height"];
    const scrollLength = el[horizontal ? "scrollWidth" : "scrollHeight"];
    const scrollThreshold = scrollLength - containerLength;

    let current = 0;
    let disableScroll = true;
    let firstRun = true;

    const onScroll = (e) => {
      // Prevent first scroll because it is indirectly caused by the one pixel offset
      if (!enabled || firstRun) return;
      invalidate();
      current = el[horizontal ? "scrollLeft" : "scrollTop"];
      scroll.current = current / scrollThreshold;
      if (infinite) {
        if (!disableScroll) {
          if (scroll.current >= 1 - 0.001) {
            const damp = 1 - state.offset;
            el[horizontal ? "scrollLeft" : "scrollTop"] = 1;
            scroll.current = state.offset = -damp;
            disableScroll = true;
          } else if (current <= 0) {
            const damp = 1 + state.offset;
            el[horizontal ? "scrollLeft" : "scrollTop"] = scrollLength;
            scroll.current = state.offset = damp;
            disableScroll = true;
          }
        }
        if (disableScroll) setTimeout(() => (disableScroll = false), 40);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(() => (firstRun = false));

    const onWheel = (e) => (el.scrollLeft += e.deltaY / 2);
    if (horizontal) el.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      el.removeEventListener("scroll", onScroll);
      if (horizontal) el.removeEventListener("wheel", onWheel);
    };
  }, [el, size, infinite, state, invalidate, horizontal]);

  let last = 0;
  useFrame((_, delta) => {
    state.offset = THREE.MathUtils.damp(
      (last = state.offset),
      scroll.current,
      damping,
      delta
    );
    state.delta = THREE.MathUtils.damp(
      state.delta,
      Math.abs(last - state.offset),
      damping,
      delta
    );
    if (state.delta > eps) invalidate();
  });

  //여기서 context에 정보를 담는다.
  return <context.Provider value={state}>{children}</context.Provider>;
};

//type을 정해서 주기위해 forwardRef를 사용한다.
const ScrollCanvas = React.forwardRef(({ children }, ref) => {
  const group = React.useRef(null);
  const state = useScroll();
  const { width, height } = useThree((state) => state.viewport);
  useFrame(() => {
    group.current.position.x = state.horizontal
      ? -width * (state.pages - 1) * state.offset
      : 0;
    group.current.position.y = state.horizontal
      ? 0
      : height * (state.pages - 1) * state.offset;
  });
  return <group ref={group}>{children}</group>;
});

//ref를 전달받기위해서 forwardRef로 감싸주었다.
//canvas에 html 요소를 추가하기위한 컴포넌트
//Children으로 현재 H1태그들을 전달받는다.
const ScrollHtml = React.forwardRef(({ children, style, ...props }, ref) => {
  // state에 context data 를 받아온다.
  // state => curve, damping, delta, el, eps, fill, fixed, horizontal, offset, pages,
  // range, scroll, visible
  const state = useScroll();

  //group ref
  const group = React.useRef(null);
  // 현재 renderer의 width, height를 받아온다.
  const { width, height } = useThree((state) => state.size);

  //** animation */
  useFrame(() => {
    //delta => 한프레임당 실행하는시간
    //eps => 소요시간
    // 스크롤 시 delta 타임이 0 에서 증가한다
    // eps => 0.00001이다
    // 즉 스크롤이 발생하면 발동
    if (state.delta > state.eps) {
      // horizontal 일떄 는 x축 아니면 y축
      // offset은 기준이되는 주소의 더해진값
      group.current.style.transform = `translate3d(${
        state.horizontal ? -width * (state.pages - 1) * state.offset : 0
      }px,${
        state.horizontal ? 0 : height * (state.pages - 1) * -state.offset
      }px,0)`;
    }
  });

  return (
    <Html>
      <div
        ref={group}
        style={{
          ...style,
          position: "absolute",
          top: 0,
          left: 0,
          willChange: "transform",
        }}
        {...props}
      >
        <context.Provider value={state}>{children}</context.Provider>
      </div>
    </Html>
  );
});

//scroll
// forwardRef를 통해 하위 컴포넌트에게 ref를 전달한다.
// html이 참인경우 ScrollHtml로
// 거짓인경우 ScrollCanvas로
// 현재 전달받은 ref = null
export const Scroll = React.forwardRef(({ html, ...props }, ref) => {
  const El = html ? ScrollHtml : ScrollCanvas;
  return <El ref={ref} {...props} />;
});
