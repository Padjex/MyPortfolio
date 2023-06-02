import { DoubleSide } from "three";
import flagVertexShader from "./shaders/flag/vertex.glsl";
import flagFragmentShader from "./shaders/flag/fragment.glsl";
// import { shaderMaterial } from "@react-three/drei";
console.log(flagFragmentShader);
console.log(flagVertexShader);

export default function Flag() {
  return (
    <>
      <mesh position={[0, 1, 34]} rotation={[0, Math.PI * 0.5, 0]}>
        <planeGeometry args={[24, 6, 128, 128]} />
        <shaderMaterial
          side={DoubleSide}
          uniforms={{ uBigElevation: { value: 0.2 } }}
          vertexShader={flagVertexShader}
          fragmentShader={flagFragmentShader}
        />
      </mesh>
    </>
  );
}
