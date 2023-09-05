import { Cell } from "../Cell/Cell";
import { King } from "./King";
import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Pawn extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell);
    this.name = PieceNames.PAWN;
    this.icon = PieceIcons.PAWN;
  }
  public canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;

    const diffX = this.cell.x - targetCell.x;
    const diffY = this.cell.y - targetCell.y;
    const direction = this.color === Color.WHITE ? 1 : -1;
    const startingRow = this.color === Color.WHITE ? 6 : 1;

    // Проверка на первый ход - доступно 2 клетки
    if (this.cell.y === startingRow && diffY === direction * 2) {
      // Проверка на первый ход - если фигура заблокирована
      const nextCell = this.cell.board.getCell(this.cell.x, startingRow - direction);
      if (!nextCell.isEmpty()) return false;

      return targetCell.isEmpty() && diffX === 0;
    }

    // Проверка атаки
    if ((diffX === 1 || diffX === -1) && diffY === direction) {
      return this.cell.isEnemy(targetCell);
    }

    // Проверка обычного хода на 1 клетку
    if (targetCell.isEmpty() && diffX === 0) {
      return diffY === direction;
    }

    return false;
  }
}
