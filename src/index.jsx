import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import GetInto from "./GetInto";
import ShowScroll from "./PhaseTwo/ShowScroll";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 500,
        position: [0, 4, 0],
      }}
    >
      <Experience />
    </Canvas>
    <GetInto />
    <ShowScroll />
  </>
);
