import { useScroll, OrbitControls } from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import { useRef } from "react";
import storeMenager from "../../Store/storeMenager";

import Billboard from "../AboutMe/Billboard";
import BillboardLigths from "./BillboardLigths";
// import BillboardContent from "../AboutMe/BillboardContent";

export default function Stage2() {
  const stage = storeMenager((state) => state.stage);

  return (
    <>
      <group position={[10, 0, 30]} rotation-y={Math.PI * 0.8}>
        <Billboard />
        {/* <BillboardContent /> */}
        <BillboardLigths />
      </group>
      {/*  */}
      {/* <OrbitControls target={[10, 0, 30]} /> */}
      {/*  */}
    </>
  );
}
