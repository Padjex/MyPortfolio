import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { extend } from "@react-three/fiber";
import billboardVertex from "/shaders/billboard/vertex.glsl";
import billboardFragment from "/shaders/billboard/fragment.glsl";
const BillboardShader = shaderMaterial(
  {
    uTime: 0,
  },
  billboardVertex,
  billboardFragment
);
extend({ BillboardShader });

export default function BillboardLigths() {
  ////
  ////// Leva
  ////
  const { billboardDisplayPosition, width, height } = useControls("Billboard", {
    billboardDisplayPosition: {
      value: [-0.09, 4.68, -1.25],
      step: 0.01,
      joystick: "invertY",
    },
    width: {
      value: 12.5,
      step: 0.01,
      max: 20,
      min: 4,
    },
    height: {
      value: 5.56,
      step: 0.01,
      max: 20,
      min: 4,
    },
  });

  return (
    <>
      {/* <mesh
        position={billboardDisplayPosition}
        rotation={[0, Math.PI, 0]}
        name="BillboardShader"
      >
        <billboardShader transparent={true} opacity={0.1} />
        <planeGeometry args={[width, height, 128, 128]} />
      </mesh> */}
      <rectAreaLight color="#fdee4c" intensity={4} position={[0, 3.4, -1.22]} />
    </>
  );
}
