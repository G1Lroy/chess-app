import { Cell } from "../Cell/Cell";
import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class King extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell);
    this.name = PieceNames.KING;
    this.icon = PieceIcons.KING;
  }
  public canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;

    // Проверяем, что ход является допустимым для коня
    return false;
  }
}
