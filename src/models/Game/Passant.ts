import { Board } from "../Board/Board";
import { Cell } from "../Cell/Cell";
import { Pawn } from "../Piece/Pawn";
import { Piece } from "../Piece/Piece";
import { Color, PieceNames } from "../Piece/types";

export class Passant {
  enemyPawns: Cell[] = [];
  public canPassant(color: Color, pawnCell: Cell, board: Board): boolean {
    const validRow = color === Color.WHITE ? 3 : 4;
    if (pawnCell?.piece?.name !== PieceNames.PAWN || pawnCell.y !== validRow) return false;
    this.findPawnsToPassant(pawnCell, board, true);
    if (pawnCell.y === validRow && this.enemyPawns.length) return true;
    return false;
  }
  public findPawnsToPassant(pawnCell: Cell, board: Board, withLongStep: boolean): void {
    const leftCoordinates = pawnCell.x - 1 >= 0 ? pawnCell.x - 1 : null;
    const rightCoordinates = pawnCell.x + 1 < 8 ? pawnCell.x + 1 : null;

    const leftToPawn =
      typeof leftCoordinates === "number" ? board.getCell(leftCoordinates, pawnCell.y) : null;
    const rightToPawn = rightCoordinates ? board.getCell(rightCoordinates, pawnCell.y) : null;

    // тут нужно именно 2 кейса по поиску пешек
    // те что с походили на 2 клетки
    // и те что просто ходили
    // этот медод вызывается в нескольких местах под разные условия

    const leftValid = leftToPawn && leftToPawn.piece instanceof Pawn;
    const rightValid = rightToPawn && rightToPawn.piece instanceof Pawn;
    const leftFirstStep = leftToPawn?.piece?.isPawnLongStep;
    const rightFirstStep = rightToPawn?.piece?.isPawnLongStep;

    if (withLongStep) {
      if (leftValid && leftFirstStep) this.enemyPawns.push(leftToPawn);
      if (rightValid && rightFirstStep) this.enemyPawns.push(rightToPawn);
    } else {
      if (leftValid) this.enemyPawns.push(leftToPawn);
      if (rightValid) this.enemyPawns.push(rightToPawn);
    }
  }
  public makePassantAvailable(board: Board, color: Color, currentCell: Cell): void {
    this.enemyPawns.forEach((p) => {
      const direction = color === Color.WHITE ? p.y - 1 : p.y + 1;
      const cellToPassant = board.getCell(p.x, direction);
      const validX = cellToPassant.x - currentCell.x === -1 || cellToPassant.x - currentCell.x === 1;
      if (validX) cellToPassant.availableToPassant = true;
    });
  }
  public resetPassantCells(board: Board): void {
    // берем только те ряды на которых возможно взятие
    const lines = [...board.cellsGrid[2], ...board.cellsGrid[5]];
    for (const cell of lines) {
      if (cell.availableToPassant) cell.availableToPassant = false;
    }
    this.enemyPawns = [];
  }
  public getPawnByPassant(target: Cell, pawnCell: Cell, board: Board): void | Piece {
    this.findPawnsToPassant(pawnCell, board, true);
    // удаляем фигуру если она на обной оси с клеткой для взятия на проходе
    let pieceToTake;
    for (const p of this.enemyPawns) {
      const xDiff = target.x - p.x;
      if (xDiff === 0) {
        // делаем глубокую копию
        pieceToTake = { ...p.piece } as Piece;
        p.piece = null;
        break;
      }
    }
    return pieceToTake;
  }
  public checkPawnLongMove(cell: Cell, target: Cell): void {
    if (cell.piece instanceof Pawn && Math.abs(target.y - cell.y) === 2) {
      cell.piece.isPawnLongStep = true;
      this.findPawnsToPassant(target, cell.board, false);
      const pawns = this.enemyPawns;
      // если на момент хода на две клетки
      // на этом же ряду небыло пешек
      // тогда взятие на проходе невозможно
      if (!pawns.length) cell.piece.isPawnLongStep = false;
    }
    if (cell.piece instanceof Pawn && Math.abs(target.y - cell.y) === 1) cell.piece.isPawnLongStep = false;
  }
}
