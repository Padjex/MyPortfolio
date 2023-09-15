import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useReducer, useRef } from "react";
import * as THREE from "three";

export default function Lights() {
  const directionalLight = useRef();
  const three = useThree();

  // Leva
  const { ALintensity, DLintensity, DLposition, DLcolor } = useControls(
    "Ligths",
    {
      DLcolor: "#ffffff",
      ALintensity: {
        value: 0.09,
        step: 0.001,
        min: 0,
        max: 10,
      },
      DLintensity: {
        value: 0.39,
        step: 0.001,
        min: 0,
        max: 10,
      },
      DLposition: {
        value: { x: -10, y: 9, z: -10 },
        step: 0.01,
        joystick: "invertY",
      },
    }
  );

  // DirectionalLight Helper
  // useEffect(() => {
  //   const cameraHelper = new THREE.CameraHelper(
  //     directionalLight.current.shadow.camera
  //   );
  //   const scene = three.scene;
  //   scene.add(cameraHelper);
  //   return () => {
  //     scene.remove(cameraHelper);
  //   };
  // }, []);

  return (
    <>
      <directionalLight
        ref={directionalLight}
        position={[DLposition.x, DLposition.y, DLposition.z]}
        intensity={DLintensity}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={3}
        shadow-camera-far={90}
        shadow-camera-top={40}
        shadow-camera-right={40}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
        color={DLcolor}
      />
      <ambientLight intensity={ALintensity} />
    </>
  );
}
