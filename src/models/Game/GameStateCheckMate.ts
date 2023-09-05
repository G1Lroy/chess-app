import { Board } from "../Board/Board";
import { BoardRenderer } from "../Board/BoardRenderer";
import { Cell } from "../Cell/Cell";
import { King } from "../Piece/King";
import { Color, Piece } from "../Piece/Piece";
import { GameStateCheck } from "./GameStateCheck";

export class GameStateCheckMate {
  check = new GameStateCheck();
  private findKingMoves(board: Board, color: Color): Cell[] {
    const kingCell = board.findKing(color);
    const kingMoves = [];
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        if (xOffset === 0 && yOffset === 0) continue;
        const newX = kingCell!.x + xOffset;
        const newY = kingCell!.y + yOffset;
        if (kingCell!.isCellOnBoard(newX, newY)) kingMoves.push(board.getCell(newX, newY));
      }
    }
    return kingMoves;
  }
  public isCheckMate(board: Board, color: Color, opposite: Color): Color | null {
    const clone = board.cloneDeep();
    const kingMoves = this.findKingMoves(clone, color);
    const king = clone.findKing(color);
    const pieces = board.findPiecesByColor(color);

    new BoardRenderer().renderCells(king, clone, color);

    const kingCanMove = kingMoves.some((cell) => cell.availableToAttack === false && !cell.piece);
    const possibleMoveToProtect = kingMoves.some((cell) =>
      pieces.find(
        (piece) => piece.canMove(cell) && !this.check.isCheckOnClone(piece.cell, board, cell, color, opposite)
      )
    );

    return !kingCanMove && !possibleMoveToProtect ? color : null;
  }
}
