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
      set((state) => {
        if (state.stage == 4) {
          return { stage: 1 };
        } else {
          return { stage: state.stage + 1 };
        }
      });
    },
    stageDown: () => {
      set((state) => {
        return { stage: state.stage - 1 };
      });
    },
  };
});
