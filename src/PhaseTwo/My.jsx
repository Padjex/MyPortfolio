import gsap from "gsap";
import { useEffect, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Letter } from "./Welcome";
import Portfolio from "./Portfolio";

const my3DMaterial = new THREE.MeshStandardMaterial({ color: "#03fca1" });

export default function My({ collisionEnter }) {
  const { camera } = useThree();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => {
      gsap.to(camera.position, {
        duration: 0.7,
        z: 24,
        y: -1,
        x: 4,
        ease: "power1.out",
      });
    }, 100);
    return () => {
      clearInterval(t1);
    };
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setTimer(timer + 1);
    }, 300);
    if (timer == 3) clearInterval(t1);

    return () => {
      clearInterval(t1);
    };
  }, [timer]);

  const my3DProps = useMemo(() => {
    const my3DProps = {
      font: "./dad.json",
      castShadow: true,
      size: 2.1,
      bevelEnabled: true,
      bevelSize: 0.14,
      bevelThickness: 0.4,
      curveSegments: 2,
      material: my3DMaterial,
    };
    return my3DProps;
  }, []);

  const myPositions = useMemo(() => {
    const myPositions = [
      [-13.5, 5, 1.4],
      [-11.1, 5, 1.4],
    ];
    return myPositions;
  });

  const rigidBodyProps = {
    onCollisionEnter: collisionEnter,
    rotation: [0, 0.44, 0],
  };
  return (
    <>
      {timer > 0 ? (
        <Letter
          text3DProps={my3DProps}
          position={myPositions[0]}
          rigidBodyProps={rigidBodyProps}
          l="M"
        />
      ) : null}
      {timer > 1 ? (
        <Letter
          text3DProps={my3DProps}
          position={myPositions[1]}
          rigidBodyProps={rigidBodyProps}
          l="y"
        />
      ) : null}
      {timer > 2 ? <Portfolio collisionEnter={collisionEnter} /> : null}
    </>
  );
}
