import { useEffect, useLayoutEffect, useReducer, useRef } from "react";
import storeMenager from "../Store/storeMenager";
import { gsap } from "gsap";

export default function ShowScroll() {
  const enableScroll = storeMenager((state) => state.scroll);

  useEffect(() => {
    if (enableScroll) {
      gsap.to(".scrollDiv", { scale: 1 });
      const tl = gsap.timeline({ delay: 1, repeat: 2, yoyo: true });

      tl.to(".scrollDot", { y: 9, duration: 0.8 });

      tl.to(".scrollText", { opacity: 0, duration: 0.8 });

      tl.then(() => {
        setTimeout(() => {
          tl.to(".scrollDiv", { scale: 0 });
        }, 800);
      });

      return () => {
        tl.kill();
      };
    }

    return () => {};
  }, [enableScroll]);

  const component = (
    <>
      <div className="scrollDiv">
        <div className="scrollDot"></div>
        <div className="scrollText">Scroll to explore!</div>
      </div>
    </>
  );

  return <>{enableScroll ? component : null}</>;
}
