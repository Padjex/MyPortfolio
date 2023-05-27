import { OrbitControls } from "@react-three/drei";
import storeMenager from "./Store/storeMenager";
import World from "./PhaseTwo/World";
import { Perf } from "r3f-perf";

export default function Experience() {
  const phase = storeMenager((state) => state.phase);

  return (
    <>
      <Perf />
      <OrbitControls />
      <directionalLight position={[-2, 2, 3]} intensity={1.5} castShadow />
      <ambientLight intensity={0.5} />
      <World />
    </>
  );
}
