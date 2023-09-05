import { Board } from "../Board/Board";
import { Cell } from "../Cell/Cell";
import { Color } from "../Piece/Piece";

export class GameStateCheck {
  // ===========Check===========
  public getColorInCheck(board: Board, currentColor: Color, opposite: Color): Color | null {
    const king = board.findKing(opposite);
    const pieces = board.findPiecesByColor(currentColor);
    let color: Color | null = null;
    pieces.find((piece) => (piece.canMove(king!) ? (color = king!.piece!.color) : color));
    return color;
  }
  public isCheckOnClone(selectedCell: Cell, board: Board, target: Cell, color: Color, opposite: Color) {
    const clone = board.cloneDeep();
    let cloneCell: Cell = selectedCell;
    let cloneTarget: Cell = target;
    clone.cellsGrid.find((row) =>
      row.find((cell) => {
        if (cell.equals(selectedCell.x, selectedCell.y)) cloneCell = cell;
        if (cell.equals(target.x, target.y)) cloneTarget = cell;
      })
    );

    cloneCell.movePiece(cloneTarget);

    return this.getColorInCheck(clone, opposite, color);
  }
  // ===========CheckMate===========
}
