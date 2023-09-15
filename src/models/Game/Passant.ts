import { Board } from "../Board/Board";
import { Cell } from "../Cell/Cell";
import { Pawn } from "../Piece/Pawn";
import { Color, PieceNames } from "../Piece/types";

export class Passant {
  enemyPawns: Cell[] = [];
  public canPassant(color: Color, pawnCell: Cell, board: Board): boolean {
    const validRow = color === Color.WHITE ? 3 : 4;
    if (pawnCell?.piece?.name !== PieceNames.PAWN || pawnCell.y !== validRow) return false;
    this.findPawnsToPassant(pawnCell, board);
    if (pawnCell.y === validRow && this.enemyPawns.length) return true;
    return false;
  }
  private findPawnsToPassant(pawnCell: Cell, board: Board): void {
    const leftCoordinates = pawnCell.x - 1 > 0 ? pawnCell.x - 1 : null;
    const rightCoordinates = pawnCell.x + 1 < 8 ? pawnCell.x + 1 : null;

    const leftToPawn = leftCoordinates ? board.getCell(leftCoordinates, pawnCell.y) : null;
    const rightToPawn = rightCoordinates ? board.getCell(rightCoordinates, pawnCell.y) : null;

    if (leftToPawn && leftToPawn.piece instanceof Pawn && leftToPawn.piece.isPawnLongStep)
      this.enemyPawns.push(leftToPawn);
    if (rightToPawn && rightToPawn.piece instanceof Pawn && rightToPawn.piece.isPawnLongStep)
      this.enemyPawns.push(rightToPawn);
  }
  public makePassantAvailable(board: Board, color: Color) {
    this.enemyPawns.forEach((p) => {
      const direction = color === Color.WHITE ? p.y - 1 : p.y + 1;
      const cellToPassant = board.getCell(p.x, direction);
      cellToPassant.availableToPassant = true;
    });
  }
  public resetPassantCells(board: Board): void {
    // берем только те ряды на которых возможно взятие
    const lines = [...board.cellsGrid[2], ...board.cellsGrid[5]];
    for (const cell of lines) {
      if (cell.availableToPassant) cell.availableToPassant = false;
    }
  }
  public getPawnByPassant(target: Cell, pawnCell: Cell, board: Board): void {
    this.findPawnsToPassant(pawnCell, board);
    // удаляем фигуру если она на обной оси с клеткой для взятия на проходе
    this.enemyPawns.forEach((p) => {
      const xDiff = target.x - p.x;
      if (xDiff === 0) p.piece = null;
    });
  }
}
