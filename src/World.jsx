import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import storeMenager from "./Store/storeMenager";
import {
  Sky,
  PresentationControls,
  Cloud,
  ScrollControls,
  OrbitControls,
  useTexture,
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
import Welcome from "./Stages/Welcome/Welcome";
import Plane from "./Stuff/Plane";
import Cactus from "./Stuff/Cactus";
import CameraOnScroll from "./CameraOnScroll";
import Stage2 from "./Stages/AboutMe/Stage2";
import * as THREE from "three";
import { useControls } from "leva";

export default function World() {
  const phase = storeMenager((state) => state.phase);
  const enableScroll = storeMenager((state) => state.scroll);

  const texture = useTexture("../texture/ground/123.jpg");
  // //
  // //// Leva
  // //

  //Leva ground
  const { grColor, textureScale } = useControls("Ground", {
    grColor: "#acd3eb",
    textureScale: { value: 200, step: 1, min: 10, max: 500 },
  });

  // Leva sky
  const {
    rayleigh,
    turbidity,
    sunPosition,
    mieCoefficient,
    mieDirectionalG,
    inclination,
    azimuth,
  } = useControls("Sky", {
    rayleigh: {
      value: 7,
      min: 0,
      max: 14,
      step: 0.0001,
    },
    azimuth: {
      value: 1.17,
      min: 0,
      max: 4,
      step: 0.0001,
    },
    turbidity: {
      value: 10.56,
      min: 0,
      max: 20,
      step: 0.01,
    },
    // sunPosition: {
    //   value: [0, 3, 0],
    //   step: 1,
    //   joystick: "invertY",
    // },
    mieCoefficient: {
      value: 0.08,
      min: 0,
      max: 0.1,
      step: 0.0001,
    },
    mieDirectionalG: {
      value: 0.73,
      min: 0,
      max: 1,
      step: 0.001,
    },
    inclination: {
      value: 5,
      min: 3,
      max: 10,
      step: 0.001,
    },
  });
  // Leva clouds
  const { cloudPosition, clColor, opacity, speed, width, depth, segments } =
    useControls("Clouds", {
      opacity: {
        value: 0.5,
        step: 0.01,
        max: 1,
        min: 0,
      },
      speed: {
        value: 0.29,
        step: 0.01,
        max: 1,
        min: 0,
      },
      width: {
        value: 58.6,
        step: 0.1,
        max: 100,
        min: 0,
      },
      depth: {
        value: 3.4,
        step: 0.1,
        max: 100,
        min: 0,
      },
      segments: {
        value: 21,
        step: 1,
        max: 100,
        min: 0,
      },
      clColor: "#ffffff",
      cloudPosition: {
        value: [0, 43, -200],
        step: 1,
        joystick: "invertY",
      },
    });

  // //
  // //// Ground texture
  // //
  texture.repeat.set(textureScale, textureScale);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

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
      <Sky
        azimuth={azimuth}
        rayleigh={rayleigh}
        inclination={inclination / 10}
        distance={4000}
        turbidity={turbidity}
        // sunPosition={sunPosition}
        mieCoefficient={mieCoefficient}
        mieDirectionalG={mieDirectionalG}
      />
      <Cloud
        opacity={opacity}
        speed={speed}
        width={width}
        position={cloudPosition}
        depth={depth}
        segments={segments}
        color={clColor}
      />

      <Physics>
        {/* <Debug /> */}
        <RigidBody type="fixed" restitution={0} friction={0}>
          <mesh receiveShadow position-y={-2}>
            <boxGeometry args={[180, 0.05, 280]} />
            <meshStandardMaterial
              map={texture}
              color={grColor}
              roughness={1}
              // displacementMap={heigth}
            />
          </mesh>
        </RigidBody>

        <Plane phase={phase} />
        <Cactus />

        {welcome ? <Welcome /> : null}
        {/* {enableScroll ? <CameraOnScroll /> : null} */}
        <OrbitControls makeDefault target={[0, 0, 0]} />
        <Stage2 />
      </Physics>
    </>
  );
}
