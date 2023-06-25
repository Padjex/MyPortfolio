import { OrbitControls, ScrollControls } from "@react-three/drei";
import storeMenager from "./Store/storeMenager";
import World from "./World";
import { Perf } from "r3f-perf";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Experience() {
  const enableScroll = storeMenager((state) => state.scroll);

  return (
    <>
      <Perf />

      <directionalLight position={[-2, 2, 3]} intensity={1.5} castShadow />
      <ambientLight intensity={0.5} />

      <ScrollControls pages={2} damping={0.33}>
        <World />
      </ScrollControls>
    </>
  );
}
