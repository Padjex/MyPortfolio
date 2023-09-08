import { useRef } from "react";
import { useGLTF, shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import flagVertexShader from "/shaders/board/vertex.glsl";
import flagFragmentShader from "/shaders/board/fragment.glsl";
import { Vector2 } from "three";
import { DoubleSide } from "three";
import BillboardContent from "./BillboardContent";

const Shad = shaderMaterial(
  { cursorUV: new Vector2(2) },
  flagVertexShader,
  flagFragmentShader
);

extend({ Shad });

export default function Billboard() {
  // model.scene.children.forEach((mesh) => {
  //   mesh.castShadow = true;
  // });
  const da = useGLTF("./billboard/billboard4.glb");

  // const { nodes } = useGLTF("./billboard/billboard2.glb");
  const boardShader = useRef();

  const eventHandler = (a) => {
    boardShader.current.cursorUV = a.uv;
    // console.log(boardShader.current.cursorUV);
  };
  const eventLeave = (a) => {
    boardShader.current.cursorUV.x = 2;
    boardShader.current.cursorUV.y = 2;
    // console.log(boardShader.current.cursorUV);
  };
  return (
    <>
      <group position={[0, -2, 0]} scale={0.74}>
        {/* <mesh
          geometry={nodes.Cube001.geometry}
          position={nodes.Cube001.position}
          scale={nodes.Cube001.scale}
        >
          <meshNormalMaterial />
        </mesh>
        <mesh
          geometry={nodes.Cube.geometry}
          position={nodes.Cube.position}
          scale={nodes.Cube.scale}
        >
          <meshNormalMaterial side={DoubleSide} />
        </mesh>
        <mesh
          geometry={nodes.Cylinder.geometry}
          position={nodes.Cylinder.position}
          scale={nodes.Cylinder.scale}
        >
          <meshNormalMaterial />
        </mesh>
        <mesh
          castShadow
          geometry={nodes.board.geometry}
          position={nodes.board.position}
          scale={nodes.board.scale}
          onPointerMove={eventHandler}
          onPointerLeave={eventLeave}
        >
          <shad ref={boardShader} side={DoubleSide} transparent={true} />
        </mesh> */}
        {/* <pointLight intensity={10} position={[]}></pointLight> */}
        <primitive castShadow object={da.scene}>
          <BillboardContent occlude={da} />
        </primitive>
      </group>
    </>
  );
}
