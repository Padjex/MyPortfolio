import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRapier } from "@react-three/rapier";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Flag from "./Flag";
import { Group } from "three";

export default function Plane({ phase }) {
  const { nodes } = useMemo(() => useGLTF("./plane/plane1.glb"));
  const textureM = useTexture("./plane/texture.jpg");
  textureM.flipY = false;

  const plane = useRef();
  const propeller = useRef();

  const [planeStart, setPlaneStart] = useState(false);

  const hitSound = useMemo(() => {
    return new Audio("./sounds/plane.mp3");
  }, []);

  // useEffect(() => {
  //   if (phase == 2) {
  //     setTimeout(() => {
  //       hitSound.playbackRate = 0.37;
  //       hitSound.play();
  //       setPlaneStart(true);
  //     }, 1500);
  //   }
  // }, [phase]);

  useFrame((state, delta) => {
    // const elapsedTime = state.clock.elapsedTime;
    // propeller.current.rotation.y += delta * 30;
    // if (planeStart) {
    //   plane.current.position.x -= delta * 25;
    //   if (plane.current.position.x < -100) {
    //     setPlaneStart(false);
    //   }
    // }
  });

  return (
    <>
      <group
        ref={plane}
        position={[-19, 9, -20]}
        scale={0.64}
        rotation={[0, Math.PI * 0.5, 0]}
      >
        <mesh
          position={nodes.Plane004.position}
          geometry={nodes.Plane004.geometry}
        >
          <meshStandardMaterial map={textureM} />
        </mesh>
        <mesh
          ref={propeller}
          position={nodes.Propeller002.position}
          rotation={[Math.PI * 0.5, 0, 0]}
          geometry={nodes.Propeller002.geometry}
        >
          <meshStandardMaterial map={textureM} />
        </mesh>
        <Flag />
      </group>
    </>
  );
}
