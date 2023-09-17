import { create } from "zustand";
import { Board } from "../models/Board/Board";
import { BoardRenderer } from "../models/Board/BoardRenderer";
import { BoardStore } from "./types";
import usePlayerStore from "./player";

const useBoardStore = create<BoardStore>((set, get) => ({
  board: new Board(),
  boardRenderer: new BoardRenderer(),
  selectedCell: null,
  setBoard: (board) => set({ board: board }),
  setSelectedCell: (cell) => set({ selectedCell: cell }),
  update: () => {
    const { boardRenderer, selectedCell, board } = get();
    const { currentPlayer } = usePlayerStore.getState();
    boardRenderer.renderCells(selectedCell, board, currentPlayer);
  },
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
