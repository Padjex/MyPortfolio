import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import storeMenager from "../Store/storeMenager";

export default function Stage2() {
  const stage = storeMenager((state) => state.stage);

  return (
    <>
      <group position={[30, 0, 20]}>
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshDepthMaterial />
        </mesh>
      </group>
    </>
  );
}
