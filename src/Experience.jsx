import { OrbitControls, ScrollControls } from "@react-three/drei";
import storeMenager from "./Store/storeMenager";
import World from "./World";
import { Perf } from "r3f-perf";
import Lights from "./Lights";

export default function Experience() {
  const enableScroll = storeMenager((state) => state.scroll);

  return (
    <>
      <Perf position="top-left" />

      <ScrollControls pages={2} damping={0.33}>
        <World />
        <Lights />
      </ScrollControls>
    </>
  );
}
