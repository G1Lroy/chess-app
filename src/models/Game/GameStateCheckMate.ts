import { Board } from "../Board/Board";
import { Color } from "../Piece/types";
import { PiecesUtils } from "../Utils/PiecesUtils";
import { GameStateCheck } from "./GameStateCheck";

export class GameStateCheckMate {
  public isCheckMate(board: Board, color: Color, opposite: Color): Color | null {
    const cells = board.cellsGrid.flat();
    const pieces = PiecesUtils.findPiecesByColor(board, color, true);
    const check = new GameStateCheck();
    let possibleMoveToProtect = false;

    for (const cell of cells) {
      possibleMoveToProtect = pieces.some(
        (piece) => piece.canMove(cell) && !check.isCheckOnClone(piece.cell, board, cell, color, opposite)
      );
      if (possibleMoveToProtect) break;
    }

    return possibleMoveToProtect ? null : color;
  }
}
