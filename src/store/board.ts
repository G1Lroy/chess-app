import { create } from "zustand";
import { Board } from "../models/Board/Board";
import { BoardRenderer } from "../models/Board/BoardRenderer";
import { BoardStore } from "./types";
import usePlayerStore from "./player";
import { BoardFactory } from "../models/Board/BoardFactory";

const useBoardStore = create<BoardStore>((set, get) => ({
  board: new Board(),
  boardRenderer: new BoardRenderer(),
  selectedCell: null,
  setBoard: (board) => set((state) => ({ ...state, board })),
  setSelectedCell: (cell) => set((state) => ({ ...state, selectedCell: cell })),
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
  startGameFromFen: (fen) => {
    const { setCurrentPlayer } = usePlayerStore.getState();
    const newBoard = new Board();
    const factory = new BoardFactory(newBoard);
    factory.fromFEN(fen);
    setCurrentPlayer(factory.player);
    set((state) => ({
      ...state,
      selectedCell: null,
      board: newBoard,
    }));
  },
}));

export default useBoardStore;
