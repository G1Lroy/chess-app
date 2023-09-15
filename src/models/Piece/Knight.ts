import { Cell } from "../Cell/Cell";
import { Piece } from "./Piece";
import { Color, PieceNames, PieceIcons } from "./types";

export class Knight extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell);
    this.name = PieceNames.KNIGHT;
    this.icon = PieceIcons.KNIGHT;
  }
  public canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;

    const dx = Math.abs(targetCell.x - this.cell.x);
    const dy = Math.abs(targetCell.y - this.cell.y);

    // Проверяем, что ход является допустимым для коня
    return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
  }
}
