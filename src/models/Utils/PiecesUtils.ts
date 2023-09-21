import { Board } from "../Board/Board";
import { Cell } from "../Cell/Cell";
import { Passant } from "../Game/Passant";
import { King } from "../Piece/King";
import { Pawn } from "../Piece/Pawn";
import { Piece } from "../Piece/Piece";
import { Color, PieceNames } from "../Piece/types";

export class PiecesUtils {
  public static findPiecesByColor(board: Board, color: Color, withKing: boolean): Piece[] {
    const pieces: Piece[] = [];
    const cells = board.cellsGrid.flat();
    cells.forEach((cell) => {
      if (!withKing && cell.piece && cell.piece.color === color && cell.piece.name !== PieceNames.KING) {
        pieces.push(cell.piece);
      } else if (withKing && cell.piece && cell.piece.color === color) {
        pieces.push(cell.piece);
      }
    });

    return pieces;
  }
  public static findKing(board: Board, color: Color): Cell | void {
    const cells = board.cellsGrid.flat();
    return cells.find((cell) => cell.piece?.color === color && cell.piece instanceof King);
  }
  public static findKingMoves(board: Board, king: Cell, withPieces: boolean): Cell[] {
    const kingMoves = [];
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        if (xOffset === 0 && yOffset === 0) continue;
        const newX = king?.x + xOffset;
        const newY = king?.y + yOffset;
        if (king?.isCellOnBoard(newX, newY)) {
          const cell = board.getCell(newX, newY);
          if (withPieces) kingMoves.push(cell);
          else if (!withPieces && (cell.isEmpty() || cell.piece instanceof King)) kingMoves.push(cell);
        }
      }
    }
    return kingMoves;
  }
}
