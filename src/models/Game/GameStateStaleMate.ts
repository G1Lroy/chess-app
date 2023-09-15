import { Board } from "../Board/Board";
import { BoardRenderer } from "../Board/BoardRenderer";
import { Color } from "../Piece/types";
import { PiecesUtils } from "../Utils/PiecesUtils";

export class GameStateStaleMate {
  private kingCanMove(board: Board, color: Color) {
    const clone = board.cloneDeep();
    const king = PiecesUtils.findKing(clone, color);
    const kingMoves = PiecesUtils.findKingMoves(clone, king!, true);
    new BoardRenderer().renderCells(king!, clone, color);
    return kingMoves.some((cell) => cell.availableToAttack === false && !cell.piece);
  }
  private pieceCanMove(board: Board, color: Color) {
    const pieces = PiecesUtils.findPiecesByColor(board, color, false);
    const cells = board.cellsGrid.flat();
    let result = false;

    for (const piece of pieces) {
      result = cells.some((cell) => piece.canMove(cell));
      if (result) break;
    }
    return result;
  }
  public isStaleMate(board: Board, color: Color) {
    const kingCanMove = this.kingCanMove(board, color);
    const pieceCanMove = this.pieceCanMove(board, color);
    return !kingCanMove && !pieceCanMove ? color : null;
  }
}
