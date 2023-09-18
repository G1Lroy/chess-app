import { create } from "zustand";
import useBoardStore from "./board";
import usePlayerStore from "./player";
import useGameStore from "./game";
import { MainStore } from "./types";
import { Color } from "../models/Piece/types";

const useMainStore = create<MainStore>((set) => {
  return {
    helpers: true,
    gameCondition: "",
    takenPieces: [],
    // fenNotation: "",
    // setFenNotation: (str) => {
    //   set((state) => ({ ...state, fenNotation: str }));
    // },
    setTakenPieces: (piece) => {
      set((state) => ({
        ...state,
        takenPieces: [...state.takenPieces, piece],
      }));
    },
    toggleHelpers: (helpers) => set((state) => ({ ...state, helpers })),
    setGameCondition: (gameCondition) => set((state) => ({ ...state, gameCondition })),
    restart: () => {
      set((state) => ({
        ...state,
        fenNotation: "",
        helpers: true,
        takenPieces: [],
      }));
      const { restartBoard } = useBoardStore.getState();
      const { setCurrentPlayer } = usePlayerStore.getState();
      const { restartGameStore } = useGameStore.getState();
      setCurrentPlayer(Color.WHITE);
      restartBoard();
      restartGameStore();
    },
  };
});

export default useMainStore;
