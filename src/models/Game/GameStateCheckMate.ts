import { Board } from "../Board/Board";
import { Cell } from "../Cell/Cell";
import { Color } from "../Piece/Piece";
import { PiecesUtils } from "../Utils/PiecesUtils";
import { GameStateCheck } from "./GameStateCheck";

export class GameStateCheckMate {
  public isCheckMate(board: Board, color: Color, opposite: Color): Color | null {
    const king = PiecesUtils.findKing(board, color);
    const kingMoves = PiecesUtils.findKingMoves(board, king as Cell, true);
    const pieces = PiecesUtils.findPiecesByColor(board, color, true);
    const check = new GameStateCheck();
    let possibleMoveToProtect = false;

    // Проходимся по каждой клетки короля
    // ходим нашими фигурами на нее
    // проверяем на клоне чтобы не было шаха после каждого такого хода
    // если тайкой ход есть - выходим
    for (const cell of kingMoves) {
      possibleMoveToProtect = pieces.some(
        (piece) => piece.canMove(cell) && !check.isCheckOnClone(piece.cell, board, cell, color, opposite)
      );
      if (possibleMoveToProtect) break;
    }

    return possibleMoveToProtect ? null : color;
  }
}
