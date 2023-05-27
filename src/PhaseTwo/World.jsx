import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import storeMenager from "../Store/storeMenager";
import { Sky, PresentationControls, Cloud, useMask } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Debug, RigidBody, Physics } from "@react-three/rapier";
import Welcome from "./Welcome";
//
export default function World() {
  const phase = storeMenager((state) => state.phase);
  const { camera } = useThree();

  const [welcome, setWelcome] = useState(false);

  useEffect(() => {
    if (phase == 2) {
      gsap.to(camera.position, {
        duration: 1.8,
        z: 20,
        y: -1,
        ease: "power2.out",
        onComplete: setWelcome(true),
      });
    }
  }, [phase]);

  return (
    <>
      <Sky azimuth={0.1} rayleigh={0.5} inclination={0.6} distance={10000} />
      <Cloud
        opacity={1}
        speed={0.1}
        width={2}
        position={[-10, 10, -10]}
        depth={9}
      />
      <Cloud
        opacity={1}
        speed={0.1}
        width={2}
        position={[10, 10, -10]}
        depth={9}
      />
      <Physics>
        {/* <Debug /> */}
        <RigidBody type="fixed" restitution={0} friction={0}>
          <mesh receiveShadow position-y={-2}>
            <boxGeometry args={[80, 0.5, 80]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        {welcome ? <Welcome /> : null}
      </Physics>
    </>
  );
}
