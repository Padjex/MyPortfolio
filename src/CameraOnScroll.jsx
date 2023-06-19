import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls, useScroll } from "@react-three/drei";
import { gsap } from "gsap";
import storeMenager from "./Store/storeMenager";

export default function () {
  const { camera } = useThree();
  const scroll = useScroll();
  const tl = useRef();

  const [stage, setStage] = useState(1);
  // const stage = storeMenager((state) => state.stage);

  const [stageChanged, setstageChanged] = useState(false);

  useEffect(() => {
    scroll.el.scrollTo({ top: 0 });
  }, []);

  const stageProps = [
    {
      cameraPosition: [6, 0, 40],
      duration: 2,
    },
    {
      cameraPosition: [6, 0, 80],
      duration: 2,
    },
    {
      cameraPosition: [6, 0, 120],
      duration: 2,
    },
  ];

  useEffect(() => {
    console.log(stage);

    tl.current = gsap.timeline();
    tl.current.to(camera.position, {
      x: stageProps[stage - 1].cameraPosition[0],
      y: stageProps[stage - 1].cameraPosition[1],
      z: stageProps[stage - 1].cameraPosition[2],

      duration: stageProps[stage - 1].duration,
    });

    setTimeout(() => {
      setstageChanged(false);
    }, 40);

    return () => {
      console.log("kill");
      tl.current.kill();
    };
  }, [stage]);

  useFrame(() => {
    // tl.current.seek(scroll.offset * tl.current.duration());
    tl.current.seek(scroll.scroll.current * tl.current.duration());

    if (scroll.offset > 0.9) {
      if (!stageChanged) {
        setStage(stage + 1);

        setstageChanged(true);
        scroll.el.scrollTo({ top: 0 });
      }
    }
  });

  return <>{/* <OrbitControls enableZoom={false} /> */}</>;
}
