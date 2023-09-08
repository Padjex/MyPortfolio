import { useGLTF, Clone } from "@react-three/drei";

export default function Cactus() {
  const cactus = useGLTF("./cactus/cactus1.glb");

  return (
    <>
      <Clone
        castShadow
        object={cactus.scene}
        scale={0.4}
        position={[23.4, -2.2, -7]}
      />
      <Clone
        castShadow
        object={cactus.scene}
        scale={0.4}
        position={[-30, -2.2, -19]}
      />
      <Clone
        castShadow
        object={cactus.scene}
        scale={0.4}
        position={[10, -2.2, 20]}
      />
      <Clone
        castShadow
        object={cactus.scene}
        scale={0.4}
        position={[-10, -2.2, 20]}
      />
      <Clone
        castShadow
        object={cactus.scene}
        scale={0.4}
        position={[12, -2.2, 50]}
      />
      <Clone
        castShadow
        object={cactus.scene}
        scale={0.4}
        position={[-3, -2.2, 45]}
      />
      <Clone
        castShadow
        object={cactus.scene}
        scale={0.4}
        position={[24, -2.2, 20]}
      />
    </>
  );
}
