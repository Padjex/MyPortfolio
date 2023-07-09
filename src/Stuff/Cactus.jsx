import { useGLTF, Clone } from "@react-three/drei";

export default function Cactus() {
  const cactus = useGLTF("./cactus/cactus1.glb");

  return (
    <>
      <Clone object={cactus.scene} scale={0.4} position={[10, -2, 20]} />
      <Clone object={cactus.scene} scale={0.4} position={[-10, -2, 20]} />
      <Clone object={cactus.scene} scale={0.4} position={[12, -2, 50]} />
      <Clone object={cactus.scene} scale={0.4} position={[-3, -2, 45]} />
      <Clone object={cactus.scene} scale={0.4} position={[24, -2, 20]} />
    </>
  );
}
