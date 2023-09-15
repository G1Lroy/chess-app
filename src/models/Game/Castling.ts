import { opposite } from "../../helpers/getOppositeColor";
import { Board } from "../Board/Board";
import { Cell } from "../Cell/Cell";
import { Color, PieceNames } from "../Piece/types";
import { PiecesUtils } from "../Utils/PiecesUtils";
import { GameStateCheck } from "./GameStateCheck";

export class Castling {
  check = new GameStateCheck();
  
  public isCellsAvailableToCastling(board: Board, color: Color, long: boolean, king: Cell): boolean {
    const enemyPieces = PiecesUtils.findPiecesByColor(board, opposite(color), true);
    const cells = this.getCastlingCells(long, board, color);

    if (!cells.length) return false;

    for (const cell of cells) {
      const isCellAttack = enemyPieces.some(
        (piece) => piece.canMove(cell) || this.check.isCheckOnClone(king, board, cell, color, opposite(color))
      );

      if (isCellAttack) return false;
    }

    return true;
  }
  private getCastlingCells(long: boolean, board: Board, color: Color): Cell[] {
    const cells = [];
    const y = color === Color.WHITE ? 7 : 0;
    const [startX, endX] = long ? [1, 3] : [5, 6];

    for (let x = startX; x <= endX; x++) {
      const cell = board.getCell(x, y);
      if (!cell.isEmpty()) return [];
      cells.push(cell);
    }
    return cells;
  }
  public makeCastlingMoves(board: Board, king: Cell, rook: Cell, long: boolean): void {
    const kingOffset = long ? 1 : 6;
    const rookOffset = long ? 2 : 5;
    const targetKing = board.getCell(kingOffset, king.y);
    const targetRook = board.getCell(rookOffset, king.y);
    king.movePiece(targetKing);
    rook.movePiece(targetRook);
  }
  public findRooks(board: Board, color: Color): (Cell | null)[] {
    const cells = board.cellsGrid.flat();
    let leftRook = null;
    let rightRook = null;

    for (const cell of cells) {
      if (
        cell.piece?.isFirstStep === true &&
        cell.piece.name === PieceNames.ROOK &&
        cell.piece.color === color
      ) {
        if (cell.x === 0) leftRook = cell;
        else if (cell.x === 7) rightRook = cell;
      }
      if (leftRook && rightRook) break;
    }

    return [leftRook, rightRook];
  }
}
