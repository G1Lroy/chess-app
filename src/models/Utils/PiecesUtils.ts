import { Board } from "../Board/Board";
import { Cell } from "../Cell/Cell";
import { King } from "../Piece/King";
import { Pawn } from "../Piece/Pawn";
import { Color, Piece, PieceNames } from "../Piece/Piece";

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
        const newX = king.x + xOffset;
        const newY = king.y + yOffset;
        if (king.isCellOnBoard(newX, newY)) {
          const cell = board.getCell(newX, newY);
          if (withPieces) kingMoves.push(cell);
          else if (!withPieces && (cell.isEmpty() || cell.piece instanceof King)) kingMoves.push(cell);
        }
      }
    }
    return kingMoves;
  }
  public static checkPawnLongMove(cell: Cell, target: Cell) {
    if (cell.piece instanceof Pawn && Math.abs(target.y - cell.y) === 2) cell.piece.isPawnLongStep = true;
    if (cell.piece instanceof Pawn && Math.abs(target.y - cell.y) === 1) cell.piece.isPawnLongStep = false;
  }
}
