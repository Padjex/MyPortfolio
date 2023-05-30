import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRapier } from "@react-three/rapier";
import { Suspense, useMemo, useRef } from "react";

export default function Plane() {
  const { nodes } = useMemo(() => useGLTF("./plane/plane1.glb"));
  const textureM = useTexture("./plane/texture.jpg");
  textureM.flipY = false;

  const plane = useRef();

  useFrame((state, delta) => {
    plane.current.position.x -= 70 * delta;
  });

  return (
    <>
      <mesh
        ref={plane}
        position={[0, 20, -60]}
        scale={0.64}
        rotation={[0, 1.72, 0]}
      >
        <mesh
          // scale={0.4}
          position={nodes.Plane004.position}
          // rotation={[0, 1.72, 0]}
          geometry={nodes.Plane004.geometry}
        >
          <meshStandardMaterial map={textureM} />
        </mesh>
        <mesh
          // scale={0.4}
          position={nodes.Propeller002.position}
          rotation={[Math.PI * 0.5, 0, 0]}
          geometry={nodes.Propeller002.geometry}
        >
          <meshStandardMaterial map={textureM} />
        </mesh>
      </mesh>
    </>
  );
}
