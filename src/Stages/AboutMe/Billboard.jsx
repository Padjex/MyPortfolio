import { useRef } from "react";
import { useGLTF, shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import flagVertexShader from "/shaders/board/vertex.glsl";
import flagFragmentShader from "/shaders/board/fragment.glsl";
import { Vector2 } from "three";
import { DoubleSide } from "three";
import BillboardContent from "./BillboardContent";

export default function Billboard() {
  const da = useGLTF("./billboard/billboard4.glb");

  // const { nodes } = useGLTF("./billboard/billboard2.glb");

  return (
    <>
      <group position={[0, -2, 0]} scale={0.74}>
        <primitive castShadow object={da.scene}>
          <BillboardContent occlude={da} />
        </primitive>
      </group>
    </>
  );
}
