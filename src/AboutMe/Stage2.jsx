import { useScroll, OrbitControls } from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import { useRef } from "react";
import storeMenager from "../Store/storeMenager";

import Billboard from "./Billboard";

export default function Stage2() {
  const stage = storeMenager((state) => state.stage);

  return (
    <>
      <group position={[10, 0, 30]}>
        <Billboard />
      </group>
      {/*  */}
      {/* <OrbitControls target={[30, 0, 20]} /> */}
      {/*  */}
    </>
  );
}
