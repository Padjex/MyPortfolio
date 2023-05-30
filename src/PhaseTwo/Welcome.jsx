import { Center, Text3D } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const text3DMaterial1 = new THREE.MeshStandardMaterial({
  metalness: 0,
  roughness: 0,
  color: "violet",
});
const text3DMaterial2 = new THREE.MeshStandardMaterial({
  metalness: 0,
  roughness: 0,
  color: "#fff000",
});
const text3DMaterial3 = new THREE.MeshStandardMaterial({
  metalness: 0,
  roughness: 0,
  color: "#38e0ab",
});
const text3DMaterial4 = new THREE.MeshStandardMaterial({
  metalness: 0,
  roughness: 0,
  color: "#3a35b8",
});

// ////
// Letter component
// ////
export function Letter({
  letter,
  position,
  newPosition,
  material,
  size,
  rigidBodyProps,
}) {
  const text3DProps = useMemo(() => {
    const text3DProps = {
      font: "./fonts/dad.json",
      castShadow: true,
      size: size,
      bevelEnabled: true,
      bevelSize: 0.14,
      bevelThickness: 0.9,
      bevelSegments: 4,
      curveSegments: 2,
      material: text3DMaterial1,
    };
    return text3DProps;
  }, []);

  const letterRef = useRef();
  useEffect(() => {
    const getNewPosition = position;
    getNewPosition[0] += letterRef.current.geometry.boundingBox.max.x * 1.25;
    newPosition((prev) => [...prev, getNewPosition]);
  }, []);

  return (
    <>
      <RigidBody {...rigidBodyProps}>
        <Text3D
          ref={letterRef}
          {...text3DProps}
          material={material}
          position={position}
        >
          {letter}
        </Text3D>
      </RigidBody>
    </>
  );
}
// ////
// Word component
// ////
export function Word({ wordProp }) {
  const { camera } = useThree();
  const [letter, setLetter] = useState([]);
  const [letterPosition, setLetterPosition] = useState(wordProp.startPosition);

  const word = wordProp.word;

  useEffect(() => {
    // Camera animation
    if (wordProp.cameraPosition) {
      gsap.to(camera.position, {
        duration: wordProp.duration,
        x: wordProp.cameraPosition[0],
        y: wordProp.cameraPosition[1],
        z: wordProp.cameraPosition[2],
        ease: "power1.out",
      });
    }
    // lettersAnimation
    let count = 0;
    const timer = setInterval(() => {
      count++;
      setLetter((prevState) => [...prevState, components.pop()]);
      if (count === word.length) clearInterval(timer);
    }, 80);
  }, []);

  const components = useMemo(() => {
    const letters = word.split("").map((letter, index) => {
      return (
        <Letter
          letter={letter}
          position={letterPosition}
          key={index}
          newPosition={setLetterPosition}
          material={wordProp.material}
          size={wordProp.size}
          rigidBodyProps={wordProp.rigidBodyProps}
        />
      );
    });

    return letters.reverse();
  }, []);

  return <>{letter}</>;
}

// ////
// Welcome component
// ////
export default function Welcome() {
  const [word, setWord] = useState([]);
  const hitSound = useMemo(() => {
    return new Audio("./sounds/hit.mp3");
  }, []);

  const collisionEnter = () => {
    // console.log(hitSound);
    hitSound.currentTime = 0;
    hitSound.play();
  };
  const wordProps = useMemo(() => {
    return [
      {
        startPosition: [-9, 5, 0],
        material: text3DMaterial2,
        word: "WELCOME",
        cameraPosition: false,
        duration: 0.54,
        size: 2,
        rigidBodyProps: {
          rotation: [0, 0, 0],
          onCollisionEnter: collisionEnter,
        },
      },
      {
        startPosition: [4.5, 5, 1],
        material: text3DMaterial3,
        word: "TO",
        cameraPosition: [-7, -1, 20],
        duration: 0.94,
        size: 1.54,
        rigidBodyProps: {
          rotation: [0, -0.24, 0],
          onCollisionEnter: collisionEnter,
        },
      },
      {
        startPosition: [-13.5, 5, 1.4],
        material: text3DMaterial1,
        word: "My",
        cameraPosition: [4, -1, 24],
        duration: 0.7,
        size: 1.84,
        rigidBodyProps: {
          rotation: [0, 0.44, 0],
          onCollisionEnter: collisionEnter,
        },
      },
      {
        startPosition: [-7.1, 5, 5],
        material: text3DMaterial4,
        word: "PORTFOLIO",
        cameraPosition: [1, -1, 36],
        duration: 0.84,
        size: 2.4,
        rigidBodyProps: {
          rotation: [0, -0.05, 0],
          onCollisionEnter: collisionEnter,
        },
      },
    ];
  }, []);

  const components = useMemo(() => {
    const wordProp = wordProps.map((wordProp, index) => {
      return <Word wordProp={wordProp} key={index} />;
    });
    return wordProp.reverse();
  }, []);

  useEffect(() => {
    let count = 0;
    const timer = setInterval(() => {
      count++;
      setWord((prevState) => [...prevState, components.pop()]);
      if (count === wordProps.length) clearInterval(timer);
    }, 1000);
  }, []);

  return <>{word}</>;
}
