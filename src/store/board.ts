import { create } from "zustand";
import { Cell } from "../models/Cell/Cell";
import { Board } from "../models/Board/Board";
import { Color } from "../models/Piece/Piece";
import { opposite } from "../helpers/getOppositeColor";
import { BoardRenderer } from "../models/Board/BoardRenderer";
import { GameStateCheck } from "../models/Game/GameStateCheck";
import { GameStateCheckMate } from "../models/Game/GameStateCheckMate";
import { GameStateStaleMate } from "../models/Game/GameStateStaleMate";
import { Castling } from "../models/Game/Castling";
import { PawnTransform } from "../models/Game/PawnTransform";
import { Passant } from "../models/Game/Passant";

interface BoardStore {
  board: Board;
  currentPlayer: Color;
  selectedCell: Cell | null;
  helpers: boolean;
  colorInCheck: Color | null;
  colorInCheckMate: Color | null;
  colorInStaleMate: Color | null;
  boardRenderer: BoardRenderer;
  check: GameStateCheck;
  checkMate: GameStateCheckMate;
  staleMate: GameStateStaleMate;
  castling: Castling;
  pawnUtils: PawnTransform;
  pawnPassant: Passant;
  setBoard: (Board: Board) => void;
  setCurrentPlayer: (color: Color) => void;
  setSelectedCell: (cell: Cell | null) => void;
  toggleHelpers: (helpers: boolean) => void;
  passTurn: () => void;
  setColorInCheck: (color: Color | null) => void;
  setColorInCheckMate: (color: Color | null) => void;
  setColorInStaleMate: (color: Color | null) => void;
  restart: () => void;
  validateCheck: () => void;
  validateCheckMate: () => void;
  validateStaleMate: () => void;
}

const useBoardStore = create<BoardStore>((set) => ({
  board: new Board(),
  boardRenderer: new BoardRenderer(),
  check: new GameStateCheck(),
  checkMate: new GameStateCheckMate(),
  staleMate: new GameStateStaleMate(),
  castling: new Castling(),
  currentPlayer: Color.WHITE,
  selectedCell: null,
  helpers: true,
  colorInCheck: null,
  colorInCheckMate: null,
  colorInStaleMate: null,
  pawnPassant: new Passant(),
  pawnUtils: new PawnTransform(),
  setBoard: (board) => set({ board: board }),
  setCurrentPlayer: (color) => set({ currentPlayer: color }),
  setSelectedCell: (cell) => set({ selectedCell: cell }),
  toggleHelpers: (helpers) => set({ helpers }),
  passTurn: () =>
    set((state) => ({
      ...state,
      currentPlayer: opposite(state.currentPlayer),
    })),
  setColorInCheck: (color) => set({ colorInCheck: color }),
  setColorInCheckMate: (color) => set({ colorInCheckMate: color }),
  setColorInStaleMate: (color) => set({ colorInStaleMate: color }),
  restart: () => {
    const newBoard = new Board();
    newBoard.constructBoard();
    newBoard.defaultPieceSetup();
    set({
      board: newBoard,
      currentPlayer: Color.WHITE,
      selectedCell: null,
      colorInCheck: null,
      colorInStaleMate: null,
      colorInCheckMate: null,
    });
  },
  validateCheck: () => {
    set((state) => ({
      ...state,
      colorInCheck: state.check.getColorInCheck(
        state.board,
        state.currentPlayer,
        opposite(state.currentPlayer)
      ),
    }));
  },
  validateCheckMate: () => {
    set((state) => ({
      ...state,
      colorInCheckMate: state.checkMate.isCheckMate(
        state.board,
        state.currentPlayer,
        opposite(state.currentPlayer)
      ),
    }));
  },
  validateStaleMate: () => {
    set((state) => ({
      ...state,
      colorInStaleMate: state.staleMate.isStaleMate(state.board, state.currentPlayer),
    }));
  },
}));

export default useBoardStore;
