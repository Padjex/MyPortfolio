import gsap from "gsap";
import { Letter } from "./Welcome";
import { useEffect, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import My from "./My";

const to3DMaterial = new THREE.MeshStandardMaterial({ color: "#d303fc" });

export default function To({ collisionEnter }) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setTimer(timer + 1);
    }, 300);
    if (timer == 3) clearInterval(t1);

    return () => {
      clearInterval(t1);
    };
  }, [timer]);

  const { camera } = useThree();
  useEffect(() => {
    gsap.to(camera.position, {
      duration: 0.9,
      z: 20,
      y: -1,
      x: -7,
      ease: "power2.out",
    });
  }, []);

  const text3DProps = useMemo(() => {
    const text3DProps = {
      font: "./dad.json",
      castShadow: true,
      size: 1.2,
      bevelEnabled: true,
      bevelSize: 0.14,
      bevelThickness: 0.4,
      curveSegments: 2,
      material: to3DMaterial,
    };
    return text3DProps;
  }, []);

  const toPositions = useMemo(() => {
    const toPositions = [
      [4.5, 5, 1],
      [6.1, 5, 1],
    ];
    return toPositions;
  });

  const rigidBodyProps = {
    onCollisionEnter: collisionEnter,
    rotation: [0, -0.24, 0],
  };

  return (
    <>
      {timer > 0 ? (
        <Letter
          text3DProps={text3DProps}
          position={toPositions[0]}
          rigidBodyProps={rigidBodyProps}
          l="T"
        />
      ) : null}
      {timer > 1 ? (
        <Letter
          text3DProps={text3DProps}
          position={toPositions[1]}
          rigidBodyProps={rigidBodyProps}
          l="O"
        />
      ) : null}
      {timer > 2 ? <My collisionEnter={collisionEnter} /> : null}
    </>
  );
}
