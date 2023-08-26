import { Board } from "../Board/Board";
import { Cell } from "../Cell/Cell";
import { King } from "../Piece/King";
import { Color, Piece } from "../Piece/Piece";

export class GameCondition {
  public witchKingOnCheck(board: Board, currentColor: Color): Color | null {
    const pieces: Piece[] = [];
    let kingCell: Cell;
    let color: Color | null = null;
    board.cellsGrid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.piece && cell.piece?.color === currentColor) pieces.push(cell.piece);
        if (cell.piece?.color !== currentColor && cell.piece instanceof King) kingCell = cell;
      });
    });
    pieces.some((piece) => (piece.canMove(kingCell) ? (color = kingCell.piece?.color as Color) : color));
    return color;
  }
}
