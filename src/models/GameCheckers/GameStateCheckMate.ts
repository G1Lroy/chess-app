import { Board } from "../Board/Board";
import { Cell } from "../Cell/Cell";
import { Color } from "../Piece/Piece";
import { GameStateCheck } from "./GameStateCheck";

export class GameStateCheckMate {
  check = new GameStateCheck();
  public findKingMoves(board: Board, king: Cell): Cell[] {
    const kingCell = king;
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
    const king = board.findKing(color);
    const kingMoves = this.findKingMoves(board, king as Cell);
    const pieces = board.findPiecesByColor(color);
    let possibleMoveToProtect = false;

    // Проходимся по каждой клетки короля
    // ходим нашими фигурами на нее
    // проверяем на клоне чтобы не было шаха после каждого такого хода
    // если тайкой ход есть - выходим
    for (const cell of kingMoves) {
      const findMove = pieces.some(
        (piece) => piece.canMove(cell) && !this.check.isCheckOnClone(piece.cell, board, cell, color, opposite)
      );
      if (findMove) {
        possibleMoveToProtect = true;
        break;
      }
    }

    return possibleMoveToProtect ? null : color;
  }
}
