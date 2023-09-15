import { create } from "zustand";

import useBoardStore from "./board";
import usePlayerStore from "./player";
import useGameStore from "./game";
import { MainStore } from "./types";
import { Color } from "../models/Piece/types";

const useMainStore = create<MainStore>((set) => {
  return {
    helpers: true,
    toggleHelpers: (helpers) => set({ helpers }),
    restart: () => {
      set((state) => ({
        ...state,
        helpers: true,
      }));
      const restartBoard = useBoardStore.getState().restartBoard;
      const setCurrentPlayer = usePlayerStore.getState().setCurrentPlayer;
      const restartGameStore = useGameStore.getState().restartGameStore;
      restartBoard();
      setCurrentPlayer(Color.WHITE);
      restartGameStore();
    },
  };
});

export default useMainStore;
