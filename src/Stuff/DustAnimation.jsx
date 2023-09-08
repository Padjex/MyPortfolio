import * as THREE from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { DoubleSide } from "three";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import flagVertexShader from "../shaders/dust/vertex.glsl";
import flagFragmentShader from "../shaders/dust/fragment.glsl";

const DustMat = shaderMaterial(
  {
    transparent: true,
    vertexColor: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uSize: 4,
    uSpeedUp: 40,
    uTime: 0,
    centerX: 0,
    centerZ: 0,
    maxHeight: 5,
    maxWidth: 4,
  },

  flagVertexShader,
  flagFragmentShader
);
extend({ DustMat });

export default function DustAnimation({ position }) {
  const dustMat = useRef();

  const points = useMemo(() => new THREE.Points(), []);

  // const x = useThree();
  // useEffect(() => {
  //   const t = new THREE.AxesHelper(8);
  //   t.position.x = position.current.x;
  //   t.position.y = position.current.y;
  //   t.position.z = position.current.z;
  //   x.scene.add(t);

  //   return () => {
  //     x.scene.remove(t);
  //   };
  // }, []);

  useLayoutEffect(() => {
    const parameters = {};
    parameters.count = 100000;

    parameters.radius = 2;
    parameters.width = 4;
    parameters.size = 10;
    parameters.insideColor = "#eb9500";
    parameters.outsideColor = "#fa1807";

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    const scales = new Float32Array(parameters.count);
    const colors = new Float32Array(parameters.count * 3);
    const upSpeedRandomness = new Float32Array(parameters.count);

    const insideColor = new THREE.Color(parameters.insideColor);
    const outsideColor = new THREE.Color(parameters.outsideColor);

    // Center of points
    let centerSumX = 0;
    let centerSumZ = 0;

    for (let i = 0; i < parameters.count; i++) {
      // Position
      const i3 = i * 3;

      positions[i3 + 0] =
        Math.sin(i) * parameters.radius +
        Math.random() * parameters.width -
        parameters.width * 0.5;

      positions[i3 + 1] = Math.random() - 0.2;
      positions[i3 + 2] =
        Math.cos(i) * parameters.radius +
        Math.random() * parameters.width -
        parameters.width * 0.5;
      const radius = Math.random() * parameters.radius;

      // Center of points
      centerSumX += positions[i3 + 0];
      centerSumZ += positions[i3 + 2];

      // Scale
      scales[i] = Math.random() * parameters.size;

      // Color
      const mixedColor = insideColor.clone();
      mixedColor.lerp(outsideColor, radius / parameters.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      // SpeedUp
      upSpeedRandomness[i] = Math.random() * 0.1;
    }

    // Center of points
    const centerX = centerSumX / positions.length / 3;
    const centerZ = centerSumZ / positions.length / 3;
    dustMat.current.centerX = centerX + position.current.x;
    dustMat.current.centerZ = centerZ + position.current.z;

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute(
      "aUpSpeedRandomness",
      new THREE.BufferAttribute(upSpeedRandomness, 1)
    );

    points.geometry = geometry;
  }, [points]);

  useFrame((state, delta) => {
    dustMat.current.uTime += delta;
  });

  return (
    <>
      <points position={position.current}>
        <primitive object={points}>
          <dustMat ref={dustMat} />
        </primitive>
      </points>
    </>
  );
}
