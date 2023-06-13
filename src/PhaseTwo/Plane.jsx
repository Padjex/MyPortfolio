import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import Flag from "./Flag";
import storeMenager from "../Store/storeMenager";

export default function Plane({ phase }) {
  const { nodes } = useMemo(() => useGLTF("./plane/plane6.glb"));

  const textureM = useTexture("./plane/color.png");
  textureM.flipY = false;

  const plane = useRef();
  const propeller = useRef();

  const [planeStart, setPlaneStart] = useState(false);

  const hitSound = useMemo(() => {
    return new Audio("./sounds/plane.mp3");
  }, []);

  useEffect(() => {
    if (phase == 2) {
      setTimeout(() => {
        hitSound.playbackRate = 0.37;
        hitSound.volume = 0.1;
        hitSound.play();
        setPlaneStart(true);
      }, 1500);
    }
  }, [phase]);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;
    propeller.current.rotation.y += delta * 30;
    if (planeStart) {
      plane.current.position.x -= delta * 25;
      if (plane.current.position.x < -150) {
        setPlaneStart(false);
      }
    }
  });
  const material = useRef();

  return (
    <>
      <group
        ref={plane}
        position={[120, 20, -40]}
        rotation={[0, Math.PI * 0.5, 0]}
      >
        <mesh
          position={nodes.plane.position}
          geometry={nodes.plane.geometry}
          scale={nodes.plane.scale}
        >
          <meshStandardMaterial ref={material} map={textureM} />
        </mesh>
        <mesh
          position={nodes.windows.position}
          rotation={nodes.windows.rotation}
          geometry={nodes.windows.geometry}
          scale={nodes.windows.scale}
        ></mesh>
        <mesh
          ref={propeller}
          position={nodes.propeller.position}
          rotation={nodes.propeller.rotation}
          geometry={nodes.propeller.geometry}
          scale={nodes.propeller.scale}
        >
          <meshStandardMaterial map={textureM} />
        </mesh>

        <Flag />
      </group>
    </>
  );
}
