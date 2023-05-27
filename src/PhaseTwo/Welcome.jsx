import { Center, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";
import To from "./To";
import * as THREE from "three";

const text3DMaterial = new THREE.MeshStandardMaterial({
  metalness: 0,
  roughness: 0,
  color: "violet",
});

export function Letter({ text3DProps, rigidBodyProps, position, l }) {
  const da = useRef();
  console.log(da);
  return (
    <>
      <RigidBody {...rigidBodyProps}>
        {/* <Center> */}

        <Text3D {...text3DProps} position={position} ref={da}>
          {l}
        </Text3D>

        {/* </Center> */}
      </RigidBody>
    </>
  );
}

export default function Welcome() {
  const hitSound = useMemo(() => {
    return new Audio("./sounds/hit.wav");
  }, []);

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // For welcome
    const t1 = setTimeout(() => {
      setTimer(timer + 1);
    }, 150);

    // For To
    if (timer > 11) {
      clearInterval(t1);
    }

    return () => {
      clearInterval(t1);
    };
  }, [timer]);

  const collisionEnter = () => {
    hitSound.currentTime = 0;
    hitSound.volume = 1.0;
    hitSound.play();
  };

  const text3DProps = useMemo(() => {
    const text3DProps = {
      font: "./dad.json",
      castShadow: true,
      size: 1.9,
      bevelEnabled: true,
      bevelSize: 0.14,
      bevelThickness: 0.9,
      curveSegments: 2,
      material: text3DMaterial,
    };
    return text3DProps;
  }, []);

  const welcomePositions = useMemo(() => {
    const welcomePositions = [
      [-9, 5, 0],
      [-6.75, 5, 0],
      [-5.1, 5, 0],
      [-3.5, 5, 0],
      [-1.8, 5, 0],
      [0.23, 5, 0],
      [2.5, 5, 0],
    ];

    return welcomePositions;
  }, []);

  const rigidBodyProps = {
    onCollisionEnter: collisionEnter,
  };
  const da = useRef();

  return (
    <>
      <Letter
        text3DProps={text3DProps}
        rigidBodyProps={rigidBodyProps}
        position={welcomePositions[0]}
        l="W"
      />
      {timer > 0 ? (
        <Letter
          text3DProps={text3DProps}
          rigidBodyProps={rigidBodyProps}
          position={welcomePositions[1]}
          l="E"
        />
      ) : null}
      {timer > 1 ? (
        <Letter
          text3DProps={text3DProps}
          rigidBodyProps={rigidBodyProps}
          position={welcomePositions[2]}
          l="L"
        />
      ) : null}
      {timer > 2 ? (
        <Letter
          text3DProps={text3DProps}
          rigidBodyProps={rigidBodyProps}
          position={welcomePositions[3]}
          l="C"
        />
      ) : null}
      {timer > 3 ? (
        <Letter
          text3DProps={text3DProps}
          rigidBodyProps={rigidBodyProps}
          position={welcomePositions[4]}
          l="O"
        />
      ) : null}
      {timer > 4 ? (
        <Letter
          text3DProps={text3DProps}
          rigidBodyProps={rigidBodyProps}
          position={welcomePositions[5]}
          l="M"
        />
      ) : null}
      {timer > 5 ? (
        <Letter
          text3DProps={text3DProps}
          rigidBodyProps={rigidBodyProps}
          position={welcomePositions[6]}
          l="E"
        />
      ) : null}
      {timer == 12 ? <To collisionEnter={collisionEnter} /> : null}
    </>
  );
}
