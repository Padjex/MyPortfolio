import { BackSide, DoubleSide, FrontSide } from "three";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import flagVertexShader from "/shaders/flag/vertex.glsl";
import flagFragmentShader from "/shaders/flag/fragment.glsl";
import { useEffect, useRef } from "react";

const FlagShader = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
  },
  flagVertexShader,
  flagFragmentShader
);
extend({ FlagShader });

export default function Flag() {
  const flagTexture = useTexture("./flag/rpp.jpg");

  const flagShader = useRef();

  useEffect(() => {
    flagShader.current.uniforms.uTexture.value = flagTexture;
  }, [flagTexture]);

  useFrame((state, delta) => {
    flagShader.current.uTime += delta * 3;
  });

  return (
    <>
      <mesh position={[0, 1, 31]} rotation={[0, -Math.PI * 0.5, 0]}>
        <planeGeometry args={[24, 6, 128, 128]} />
        <flagShader ref={flagShader} side={DoubleSide} />
      </mesh>
    </>
  );
}
