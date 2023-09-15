import { create } from "zustand";
import { opposite } from "../helpers/getOppositeColor";
import { PlayerStore } from "./types";
import { Color } from "../models/Piece/types";

const usePlayerStore = create<PlayerStore>((set) => ({
  currentPlayer: Color.WHITE,
  setCurrentPlayer: (color) => set({ currentPlayer: color }),
  passTurn: () =>
    set((state) => ({
      ...state,
      currentPlayer: opposite(state.currentPlayer),
    })),
}));

export default usePlayerStore;
