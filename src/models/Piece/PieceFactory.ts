import { Board } from "../Board/Board";
import { Bishop } from "./Bishop";
import { King } from "./King";
import { Knight } from "./Knight";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Queen } from "./Queen";
import { Rook } from "./Rook";
import { Color } from "./types";

export class PieceFactory {
  public fromFenChar(board: Board, fenChar: string, x: number, y: number): Piece {
    switch (fenChar) {
      case "p":
        return new Pawn(Color.BLACK, board.getCell(x, y));
      case "P":
        return new Pawn(Color.WHITE, board.getCell(x, y));

      case "r":
        return new Rook(Color.BLACK, board.getCell(x, y));
      case "R":
        return new Rook(Color.WHITE, board.getCell(x, y));

      case "n":
        return new Knight(Color.BLACK, board.getCell(x, y));
      case "N":
        return new Knight(Color.WHITE, board.getCell(x, y));

      case "b":
        return new Bishop(Color.BLACK, board.getCell(x, y));
      case "B":
        return new Bishop(Color.WHITE, board.getCell(x, y));

      case "q":
        return new Queen(Color.BLACK, board.getCell(x, y));
      case "Q":
        return new Queen(Color.WHITE, board.getCell(x, y));

      case "k":
        return new King(Color.BLACK, board.getCell(x, y));
      case "K":
        return new King(Color.WHITE, board.getCell(x, y));

      default:
        throw new Error("Unknown FEN char!");
    }
  }
}
