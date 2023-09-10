import { opposite } from "../../helpers/getOppositeColor";
import { Board } from "../Board/Board";
import { Cell } from "../Cell/Cell";
import { Color, PieceNames } from "../Piece/Piece";
import { PiecesUtils } from "../Utils/PiecesUtils";

export class Castling {
  public isEmptyOrAttacedBetween(board: Board, color: Color, long: boolean): boolean {
    const enemyPieces = PiecesUtils.findPiecesByColor(board, opposite(color), true);
    const y = color === Color.WHITE ? 7 : 0;
    let startX, endX;
    if (long) {
      startX = 1;
      endX = 3;
    } else {
      startX = 5;
      endX = 6;
    }

    for (let x = startX; x <= endX; x++) {
      const cell = board.cellsGrid[y][x];
      const isCellAttaced = enemyPieces.some((piece) => piece.canMove(cell));
      if (!cell.isEmpty() || isCellAttaced) return false;
    }
    return true;
  }
  public makeCastlingMoves(board: Board, king: Cell, rook: Cell, long: boolean): void {
    const kingOffset = long ? 1 : 6;
    const rookOffset = long ? 2 : 5;
    const targetKing = board.getCell(kingOffset, king.y);
    const targetRook = board.getCell(rookOffset, king.y);
    king.movePiece(targetKing);
    rook.movePiece(targetRook);
  }
  public findRooks(board: Board, color: Color): Cell[] {
    const cells = board.cellsGrid.flat();
    return cells.filter(
      (cell) =>
        cell.piece?.name === PieceNames.ROOK && cell.piece.color === color && cell.piece.isFirstStep === true
    );
  }
}
