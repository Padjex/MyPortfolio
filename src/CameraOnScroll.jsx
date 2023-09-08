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

  // const [stage, setStage] = useState(1);
  const stage = storeMenager((state) => state.stage);
  const stageUp = storeMenager((state) => state.stageUp);
  const stageDown = storeMenager((state) => state.stageDown);

  const [stageChanged, setstageChanged] = useState(false);

  const [startScrollPosition, setStartScrollPosition] = useState(
    scroll.el.clientHeight
  );
  const [endScrollPosition, setEndScrollPosition] = useState(
    scroll.el.clientHeight
  );

  const [smoothedCameraLookAt] = useState(() => new THREE.Vector3());

  // Set start scroll position
  useLayoutEffect(() => {
    setStartScrollPosition(scroll.el.clientHeight * scroll.pages * 0.01);
    setEndScrollPosition(scroll.el.clientHeight * scroll.pages * 0.99);
  }, []);

  // Resize
  useEffect(() => {
    const resizeListener = window.addEventListener("resize", (s) => {
      setStartScrollPosition(scroll.el.clientHeight * scroll.pages * 0.01);
      setEndScrollPosition(scroll.el.clientHeight * scroll.pages * 0.99);
    });

    scroll.el.scrollTo({ top: startScrollPosition });
    return () => {
      removeEventListener("resize", resizeListener);
    };
  }, [startScrollPosition]);

  // Stage props
  const stageProps = useMemo(() => {
    return [
      {
        cameraPositionStart: [0, -1, 27],
        cameraPositionEnd: [1, 0.4, 37],
        duration: 1,
        cameraLookAt: new THREE.Vector3(0, 0.2, 0),
      },
      {
        cameraPositionStart: [1, 0.4, 37],
        cameraPositionEnd: [1, 0.9, 47],
        duration: 1,
        cameraLookAt: new THREE.Vector3(10, 1.4, 30),
      },
      {
        cameraPositionStart: [1, 0.9, 47],
        cameraPositionEnd: [6, -1, 60],
        duration: 1,
        cameraLookAt: new THREE.Vector3(-10, 0.2, 38),
      },
      {
        cameraPositionStart: [6, -0.5, 80],
        cameraPositionEnd: [6, -0.4, 20],
        duration: 1,
        cameraLookAt: new THREE.Vector3(0, 0.2, 0),
      },
    ];
  });

  // Set props for new stage
  useEffect(() => {
    // console.log(stage);

    tl.current = gsap.timeline();
    tl.current.fromTo(
      camera.position,
      {
        x: stageProps[stage - 1].cameraPositionStart[0],
        y: stageProps[stage - 1].cameraPositionStart[1],
        z: stageProps[stage - 1].cameraPositionStart[2],
      },
      {
        x: stageProps[stage - 1].cameraPositionEnd[0],
        y: stageProps[stage - 1].cameraPositionEnd[1],
        z: stageProps[stage - 1].cameraPositionEnd[2],

        duration: stageProps[stage - 1].duration,
      }
    );

    setstageChanged(false);

    return () => {
      tl.current.kill();
    };
  }, [stage]);

  // needs to set seek(0), when stage changed

  useFrame(() => {
    if (!stageChanged) {
      tl.current.seek(scroll.offset * tl.current.duration());
    }

    // tl.current.seek(0.0001);

    // tl.current.seek(scroll.scroll.current * tl.current.duration());
    // console.log(camera.position);
    // console.log(scroll.scroll.current);

    // Scroll Down
    if (scroll.scroll.current == 1) {
      if (!stageChanged) {
        stageUp();
        setstageChanged(true);
        scroll.el.scrollTo({ top: startScrollPosition });
      }
    }
    // Scroll Up
    if (stage != 1) {
      if (scroll.scroll.current == 0) {
        stageDown();
        setstageChanged(true);
        scroll.el.scrollTo({ top: endScrollPosition });
      }
    }

    // Camera LookAt animation
    const cameraLookAt = new THREE.Vector3();
    cameraLookAt.copy(stageProps[stage - 1].cameraLookAt);

    smoothedCameraLookAt.lerp(cameraLookAt, 0.024);
    camera.lookAt(smoothedCameraLookAt);
  });

  return <>{<OrbitControls enableZoom={false} />}</>;
}
