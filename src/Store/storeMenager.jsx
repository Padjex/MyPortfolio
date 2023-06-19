import { create } from "zustand";

export default create((set, get) => {
  return {
    /**
     * Phases
     */
    phase: 1,
    startPhaseTwo: () => {
      set(() => {
        return { phase: 2 };
      });
    },
    scroll: false,
    enableScroll: () => {
      set(() => {
        return { scroll: true };
      });
    },
    stage: 1,
    stageUp: () => {
      set(() => {
        return { stage: stage + 1 };
      });
    },
    stageDown: () => {
      set(() => {
        return { stage: stage - 1 };
      });
    },
  };
});
