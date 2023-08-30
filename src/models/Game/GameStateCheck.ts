import { Board } from "../Board/Board";
import { Cell } from "../Cell/Cell";
import { King } from "../Piece/King";
import { Color, Piece } from "../Piece/Piece";

export class GameStateCheck {
  pieces: Piece[] = [];
  kingCell: Cell | null = null;

  private getPiecesAndKing(board: Board, currentColor: Color): void {
    board.cellsGrid.some((row) => {
      row.some((cell) => {
        if (cell.piece && cell.piece.color === currentColor) this.pieces.push(cell.piece);
        if (cell.piece?.color !== currentColor && cell.piece instanceof King) this.kingCell = cell;
      });
    });
  }
  public getColorInCheck(board: Board, currentColor: Color): Color | null {
    this.getPiecesAndKing(board, currentColor);
    let color: Color | null = null;
    this.pieces.some((piece) =>
      piece.canMove(this.kingCell as Cell) ? (color = this.kingCell?.piece?.color as Color) : color
    );
    return color;
  }
  public isCheckOnClone(selectedCell: Cell, board: Board, target: Cell, color: Color) {
    const clone = board.cloneDeep();
    let cloneCell: Cell = selectedCell;
    let cloneTarget: Cell = target;
    clone.cellsGrid.some((row) =>
      row.some((cell) => {
        if (cell.equals(selectedCell.x, selectedCell.y)) cloneCell = cell;
        if (cell.equals(target.x, target.y)) cloneTarget = cell;
      })
    );

    cloneCell.movePiece(cloneTarget);
    const isCheck = this.getColorInCheck(clone, color);
    return isCheck;
  }
}
