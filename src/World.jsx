import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import storeMenager from "./Store/storeMenager";
import {
  Sky,
  PresentationControls,
  Cloud,
  ScrollControls,
  OrbitControls,
} from "@react-three/drei";
import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Debug, RigidBody, Physics } from "@react-three/rapier";
import Welcome from "./PhaseTwo/Welcome";
import Plane from "./Stuff/Plane";
import Cactus from "./Stuff/Cactus";
import CameraOnScroll from "./CameraOnScroll";
import Stage2 from "./AboutMe/Stage2";

export default function World() {
  const phase = storeMenager((state) => state.phase);
  const enableScroll = storeMenager((state) => state.scroll);

  const { camera } = useThree();

  const [welcome, setWelcome] = useState(false);

  useEffect(() => {
    if (phase == 2)
      if (!welcome) {
        gsap.to(camera.position, {
          duration: 1.8,
          z: 20,
          y: -1,
          ease: "power2.out",
          onUpdate: () => {
            camera.lookAt(0, 0, 0);
          },
          onComplete: setWelcome(true),
        });
      }
    return () => {};
  }, [phase]);

  return (
    <>
      <Suspense>
        <Sky azimuth={0.1} rayleigh={0.5} inclination={0.6} distance={10000} />
        <Cloud
          opacity={1}
          speed={0.1}
          width={20}
          position={[-10, 30, -200]}
          depth={9}
        />
        <Cloud
          opacity={1}
          speed={0.1}
          width={21}
          position={[10, 30, -200]}
          depth={9}
        />
      </Suspense>
      <Physics>
        {/* <Debug /> */}
        <RigidBody type="fixed" restitution={0} friction={0}>
          <mesh receiveShadow position-y={-2}>
            <boxGeometry args={[180, 0.5, 280]} />
            <meshStandardMaterial color="#d1d690" />
          </mesh>
        </RigidBody>
        <Suspense>
          <Plane phase={phase} />
          <Cactus />
        </Suspense>
        {welcome ? <Welcome /> : null}
        {enableScroll ? <CameraOnScroll /> : null}
        {/* <OrbitControls makeDefault target={[10, 1, 30]} /> */}
        <Stage2 />
      </Physics>
    </>
  );
}
