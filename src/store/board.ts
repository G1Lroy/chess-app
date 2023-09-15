import { create } from "zustand";
import { Board } from "../models/Board/Board";
import { BoardRenderer } from "../models/Board/BoardRenderer";
import { BoardStore } from "./types";

const useBoardStore = create<BoardStore>((set) => ({
  board: new Board(),
  boardRenderer: new BoardRenderer(),
  selectedCell: null,
  setBoard: (board) => set({ board: board }),
  setSelectedCell: (cell) => set({ selectedCell: cell }),
  restartBoard: () => {
    const newBoard = new Board();
    newBoard.constructBoard();
    newBoard.defaultPieceSetup();
    set((state) => ({
      ...state,
      selectedCell: null,
      board: newBoard,
    }));
  },
}));

export default useBoardStore;
