import { create } from "zustand";
import { opposite } from "../helpers/getOppositeColor";
import { Castling } from "../models/Game/Castling";
import { GameStateCheck } from "../models/Game/GameStateCheck";
import { GameStateCheckMate } from "../models/Game/GameStateCheckMate";
import { GameStateStaleMate } from "../models/Game/GameStateStaleMate";
import { Passant } from "../models/Game/Passant";
import { PawnTransform } from "../models/Game/PawnTransform";
import useBoardStore from "./board";
import usePlayerStore from "./player";
import { GameStore } from "./types";

const useGameStore = create<GameStore>((set) => {
  return {
    check: new GameStateCheck(),
    checkMate: new GameStateCheckMate(),
    staleMate: new GameStateStaleMate(),
    castling: new Castling(),
    pawnPassant: new Passant(),
    pawnUtils: new PawnTransform(),
    colorInCheck: null,
    colorInCheckMate: null,
    colorInStaleMate: null,
    validateCheck: () => {
      const board = useBoardStore.getState().board;
      const currentPlayer = usePlayerStore.getState().currentPlayer;
      set((state) => ({
        ...state,
        colorInCheck: state.check.getColorInCheck(board, currentPlayer, opposite(currentPlayer)),
      }));
    },
    validateCheckMate: () => {
      const board = useBoardStore.getState().board;
      const currentPlayer = usePlayerStore.getState().currentPlayer;
      set((state) => ({
        ...state,
        colorInCheckMate: state.checkMate.isCheckMate(board, currentPlayer, opposite(currentPlayer)),
      }));
    },
    validateStaleMate: () => {
      const board = useBoardStore.getState().board;
      const currentPlayer = usePlayerStore.getState().currentPlayer;
      set((state) => ({
        ...state,
        colorInStaleMate: state.staleMate.isStaleMate(board, currentPlayer),
      }));
    },
    restartGameStore: () => {
      set((state) => ({
        ...state,
        colorInCheck: null,
        colorInCheckMate: null,
        colorInStaleMate: null,
      }));
    },
  };
});

export default useGameStore;
