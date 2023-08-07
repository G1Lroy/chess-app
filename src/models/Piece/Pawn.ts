import { Cell } from "../Cell/Cell";
import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Pawn extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell);
    this.name = PieceNames.PAWN;
    this.icon = PieceIcons.PAWN;
  }
  public canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    const deltaX = this.cell.x - target.x;
    const deltaY = this.cell.y - target.y;
    const direction = this.color === Color.WHITE ? 1 : -1;
    const startingRow = this.color === Color.WHITE ? 6 : 1;

    // Проверка на первый ход - доступно 2 клетки
    if (this.cell.y === startingRow && deltaY === direction * 2) {
      // Проверка на первый ход - если фигура заблокирована
      const nextCell = this.cell.board.getCell(this.cell.x, startingRow - direction);
      if (!nextCell.isEmpty()) return false;

      return target.isEmpty() && deltaX === 0;
    }

    // Проверка атаки
    if ((deltaX === 1 || deltaX === -1) && deltaY === direction) {
      return this.cell.isEnemy(target);
    }

    // Проверка обычного хода на 1 клетку
    if (target.isEmpty() && deltaX === 0) {
      return deltaY === direction;
    }

    return false;
  }
  // public movePiece(target: Cell): void {
  //   super.movePiece(target);
  //   this.isFirstStep = false;
  // }
}
