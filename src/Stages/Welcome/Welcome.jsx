import { Text3D, useMatcapTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import storeMenager from "../../Store/storeMenager";
import DustAnimation from "../../Stuff/DustAnimation";
import React from "react";

const text3DMaterial1 = new THREE.MeshStandardMaterial({
  metalness: 0.5,
  roughness: 0,
  color: "violet",
});
const text3DMaterial2 = new THREE.MeshStandardMaterial({
  // metalness: 0.7,
  // roughness: 0,
  // color: "#fff000",
});
const text3DMaterial3 = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0,
  color: "#38e0ab",
});
const text3DMaterial4 = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0,
  color: "#3a35b8",
});
const materialMatCap1 = new THREE.MeshMatcapMaterial();
const materialMatCap2 = new THREE.MeshMatcapMaterial();
const matcapTexture1 = new THREE.TextureLoader().load(
  "./texture/matCap/matcap-opal.png"
);
const matcapTexture2 = new THREE.TextureLoader().load(
  "./texture/matCap/matcap-opal.png"
);
materialMatCap1.matcap = matcapTexture1;
materialMatCap2.matcap = matcapTexture2;

// console.log(matCapTexture);
// ////
// Letter component
// ////
export function Letter({
  letter,
  position,
  newPosition,
  material,
  size,
  hitSound,
  rigidBodyProps,
}) {
  const text3DProps = useMemo(() => {
    const text3DProps = {
      font: "./fonts/ln.json",
      castShadow: true,
      size: size,
      bevelEnabled: true,
      bevelSize: 0.041,
      bevelThickness: 0.7,
      bevelSegments: 4,
      curveSegments: 4,
    };
    return text3DProps;
  }, []);

  const letterRef = useRef();
  // For dustAnimation
  const letterPosition = useRef();
  const [dustA, setDustA] = useState(false);

  const collisionEnter = () => {
    hitSound.currentTime = 0;
    hitSound.play();
    setDustA(true);

    // For dustAnimation
    letterPosition.current = letterRef.current.getWorldPosition(
      new THREE.Vector3()
    );
    letterPosition.current.x +=
      letterRef.current.geometry.boundingBox.max.x / 2;

    // End of dustAnimation
    setTimeout(() => {
      setDustA(false);
    }, 900);
  };

  useEffect(() => {
    const getNewPosition = position;
    getNewPosition[0] += letterRef.current.geometry.boundingBox.max.x * 1.25;

    // newPosition((prev) => [...prev, getNewPosition]);
    newPosition(getNewPosition);
  }, []);

  // For debug
  const proba = () => {
    setDustA(true);
    setTimeout(() => {
      setDustA(false);
    }, 900);
  };

  return (
    <>
      <RigidBody {...rigidBodyProps} onCollisionEnter={collisionEnter}>
        <Text3D
          ref={letterRef}
          {...text3DProps}
          material={material}
          position={position}
          onClick={proba}
        >
          {letter}
        </Text3D>
      </RigidBody>
      {/* {dustA ? <DustAnimation position={letterPosition} dustA={dustA} /> : null} */}
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
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
        },
      });
    }
    // lettersAnimation
    let count = 0;
    const timer = setInterval(() => {
      count++;
      setLetter((prevState) => [...prevState, components.pop()]);

      if (count === word.length) {
        // Needs to set enableScroll = true, when is the last letter
        if (wordProp.end) {
        }
        clearInterval(timer);
      }
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
          hitSound={wordProp.hitSound}
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
    return new Audio("./sounds/hit1.wav");
  }, []);

  const enableScroll = storeMenager((state) => state.enableScroll);

  const wordProps = useMemo(() => {
    return [
      {
        startPosition: [-9, 5, 0],
        material: materialMatCap1,
        word: "WELCOME",
        cameraPosition: false,
        duration: 0.54,
        size: 2,
        hitSound: hitSound,
        rigidBodyProps: {
          rotation: [0, 0, 0],
          // onCollisionEnter: collisionEnter,
        },
      },
      {
        startPosition: [4.5, 5, 1],
        material: materialMatCap2,
        word: "TO",
        cameraPosition: [-7, -1, 20],
        duration: 0.6,
        size: 1.54,
        hitSound: hitSound,
        rigidBodyProps: {
          rotation: [0, -0.24, 0],
          // onCollisionEnter: collisionEnter,
        },
      },
      {
        startPosition: [-13.5, 5, 1.4],
        material: materialMatCap1,
        word: "My",
        cameraPosition: [4, -0.9, 22],
        duration: 0.44,
        size: 1.84,
        hitSound: hitSound,
        rigidBodyProps: {
          rotation: [0, 0.44, 0],
          // onCollisionEnter: collisionEnter,
        },
      },
      {
        startPosition: [-7.1, 5, 5],
        material: materialMatCap2,
        word: "PORTFOLIO",
        cameraPosition: [0, -1, 27],
        duration: 0.74,
        size: 2.4,
        hitSound: hitSound,
        rigidBodyProps: {
          rotation: [0, -0.05, 0],
          // onCollisionEnter: collisionEnter,
        },
        end: true,
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
    }, 800);
  }, []);

  useEffect(() => {
    if (word.length === 4) {
      setTimeout(() => {
        enableScroll();
      }, 1000);
    }
  }, [word]);

  // proba
  const x = useThree();
  useEffect(() => {
    const t = new THREE.AxesHelper(2);
    // t.position.x = position.current.x;
    t.position.y = -1.9;
    // t.position.z = position.current.z;
    x.scene.add(t);

    return () => {
      x.scene.remove(t);
    };
  }, []);

  return <>{word}</>;
}
