import { useRef } from "react";
import storeMenager from "./Store/storeMenager";

export default function GetInto() {
  const phase = storeMenager((state) => state.phase);
  const startPhaseTwo = storeMenager((state) => state.startPhaseTwo);
  const startButton = useRef();

  const clickHandle = () => {
    startButton.current.addEventListener("transitionend", getExperience);
  };

  const getExperience = (event) => {
    if (event.propertyName === "box-shadow") {
      startButton.current.removeEventListener("transitionend", getExperience);
      startPhaseTwo();
    }
  };

  return (
    <>
      {phase == 1 ? (
        <div className="container">
          <button
            ref={startButton}
            className="startButton"
            onClick={clickHandle}
          >
            GET INTO
          </button>
        </div>
      ) : null}
    </>
  );
}
