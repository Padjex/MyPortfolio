import { Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useControls } from "leva";
import { useThree } from "@react-three/fiber";
import TypeWriter from "./TypeWriter";

export default function BillboardContent({ occlude }) {
  const billboardContainer = useRef();

  ////
  ///// Leva
  ////
  const { distanceFactor, height, width, position, borderRadius } = useControls(
    "BillboardScreen",
    {
      height: { value: 784, step: 1, min: 10, max: 2000 },
      width: { value: 1692, step: 1, min: 10, max: 4000 },
      distanceFactor: { value: 4, step: 0.001, min: 0, max: 20 },
      borderRadius: { value: 56.1, step: 0.1, min: 0, max: 1000 },
      position: {
        value: [-0.11, 9.07, -1.24],
        step: 0.01,
        joystick: "invertY",
      },
    }
  );

  return (
    <Html
      position={position}
      transform
      wrapperClass="BillboardScreen"
      distanceFactor={distanceFactor}
      center
      style={{ height, width }}
      rotation-y={[Math.PI]}
      occlude={[occlude.scene.children]}
    >
      <div
        ref={billboardContainer}
        style={{ borderRadius }}
        className="billboardContainer"
      >
        <TypeWriter text={"lore af a sdfsadfg addfad adsf asd"} />
      </div>
    </Html>
  );
}
