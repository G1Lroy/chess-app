import { Board } from "../models/Board/Board";
import { BoardRenderer } from "../models/Board/BoardRenderer";
import { Cell } from "../models/Cell/Cell";
import { Castling } from "../models/Game/Castling";
import { GameStateCheck } from "../models/Game/GameStateCheck";
import { GameStateCheckMate } from "../models/Game/GameStateCheckMate";
import { GameStateStaleMate } from "../models/Game/GameStateStaleMate";
import { Passant } from "../models/Game/Passant";
import { PawnTransform } from "../models/Game/PawnTransform";
import { Color } from "../models/Piece/types";

export interface PlayerStore {
  currentPlayer: Color;
  setCurrentPlayer: (color: Color) => void;
  passTurn: () => void;
}
export interface MainStore {
  helpers: boolean;
  gameCondition: string ;
  setGameCondition: (gameCondition: string) => void;
  toggleHelpers: (helpers: boolean) => void;
  restart: () => void;
}
export interface GameStore {
  colorInCheck: Color | null;
  colorInCheckMate: Color | null;
  colorInStaleMate: Color | null;
  check: GameStateCheck;
  checkMate: GameStateCheckMate;
  staleMate: GameStateStaleMate;
  castling: Castling;
  pawnUtils: PawnTransform;
  pawnPassant: Passant;
  validateCheck: () => void;
  validateCheckMate: () => void;
  validateStaleMate: () => void;
  restartGameStore: () => void;
}
export interface BoardStore {
  board: Board;
  selectedCell: Cell | null;
  boardRenderer: BoardRenderer;
  setBoard: (Board: Board) => void;
  setSelectedCell: (cell: Cell | null) => void;
  restartBoard: () => void;
  update: () => void;
}
