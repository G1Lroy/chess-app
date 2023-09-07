import { Board } from "../Board/Board";
import { BoardRenderer } from "../Board/BoardRenderer";
import { Color } from "../Piece/Piece";
import { GameStateCheckMate } from "./GameStateCheckMate";

export class GameStateStaleMate {
  private kingCanMove(board: Board, color: Color) {
    const clone = board.cloneDeep();
    const king = clone.findKing(color);
    if (!king) return false;
    const kingMoves = new GameStateCheckMate().findKingMoves(clone, king);
    new BoardRenderer().renderCells(king, clone, color);
    return kingMoves.some((cell) => cell.availableToAttack === false && !cell.piece);
  }
  private pieceCanMove(board: Board, color: Color) {
    const pieces = board.findPiecesWithOutKing(color);
    const cells = board.cellsGrid.flat();
    let result = false;

    for (const piece of pieces) {
      const availableMove = cells.some((cell) => piece.canMove(cell));
      if (availableMove) {
        result = true;
        break;
      }
    }
    return result;
  }
  public isStaleMate(board: Board, color: Color) {
    const kingCanMove = this.kingCanMove(board, color);
    const pieceCanMove = this.pieceCanMove(board, color);
    return !kingCanMove && !pieceCanMove ? color : null;
  }
}
