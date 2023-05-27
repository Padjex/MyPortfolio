import gsap from "gsap";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useState } from "react";
import { Letter } from "./Welcome";

const portfolio3DMaterial = new THREE.MeshStandardMaterial({
  color: "#fdff6e",
});
export default function Portfolio({ collisionEnter }) {
  const { camera } = useThree();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => {
      gsap.to(camera.position, {
        duration: 0.9,
        z: 36,
        y: -1,
        x: 1,
        ease: "power1.out",
      });
    }, 40);
    return () => {
      clearInterval(t1);
    };
  });

  useEffect(() => {
    const t1 = setTimeout(() => {
      setTimer(timer + 1);
    }, 140);
    if (timer == 9) clearInterval(t1);

    return () => {
      clearInterval(t1);
    };
  }, [timer]);

  const portfolio3DProps = useMemo(() => {
    const portfolio3DProps = {
      font: "./dad.json",
      castShadow: true,
      size: 1.4,
      bevelEnabled: true,
      bevelSize: 0.24,
      bevelThickness: 0.9,
      curveSegments: 2,
      material: portfolio3DMaterial,
    };
    return portfolio3DProps;
  }, []);

  const portfolioPositions = useMemo(() => {
    const portfolioPositions = [
      [-7.8, 5, 5],
      [-5.3, 5, 5],
      [-3.1, 5, 5],
      [0, 5, 5],
      [2.3, 5, 5],
      [5.1, 5, 5],
      [7.5, 5, 5],
      [9.4, 5, 5],
      [11, 5, 5],
    ];
    return portfolioPositions;
  });

  const rigidBodyProps = {
    onCollisionEnter: collisionEnter,
    rotation: [0, -0.05, 0],
  };

  return (
    <>
      {timer > 0 ? (
        <Letter
          text3DProps={portfolio3DProps}
          position={portfolioPositions[0]}
          rigidBodyProps={rigidBodyProps}
          l="P"
        />
      ) : null}
      {timer > 1 ? (
        <Letter
          text3DProps={portfolio3DProps}
          position={portfolioPositions[1]}
          rigidBodyProps={rigidBodyProps}
          l="O"
        />
      ) : null}
      {timer > 2 ? (
        <Letter
          text3DProps={portfolio3DProps}
          position={portfolioPositions[2]}
          rigidBodyProps={rigidBodyProps}
          l="R"
        />
      ) : null}
      {timer > 3 ? (
        <Letter
          text3DProps={portfolio3DProps}
          position={portfolioPositions[3]}
          rigidBodyProps={rigidBodyProps}
          l="T"
        />
      ) : null}
      {timer > 4 ? (
        <Letter
          text3DProps={portfolio3DProps}
          position={portfolioPositions[4]}
          rigidBodyProps={rigidBodyProps}
          l="F"
        />
      ) : null}
      {timer > 5 ? (
        <Letter
          text3DProps={portfolio3DProps}
          position={portfolioPositions[5]}
          rigidBodyProps={rigidBodyProps}
          l="O"
        />
      ) : null}
      {timer > 6 ? (
        <Letter
          text3DProps={portfolio3DProps}
          position={portfolioPositions[6]}
          rigidBodyProps={rigidBodyProps}
          l="L"
        />
      ) : null}
      {timer > 7 ? (
        <Letter
          text3DProps={portfolio3DProps}
          position={portfolioPositions[7]}
          rigidBodyProps={rigidBodyProps}
          l="I"
        />
      ) : null}
      {timer > 8 ? (
        <Letter
          text3DProps={portfolio3DProps}
          position={portfolioPositions[8]}
          rigidBodyProps={rigidBodyProps}
          l="O"
        />
      ) : null}
    </>
  );
}
