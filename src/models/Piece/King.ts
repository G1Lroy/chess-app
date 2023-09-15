import { Cell } from "../Cell/Cell";
import { Piece } from "./Piece";
import { Color, PieceNames, PieceIcons } from "./types";

export class King extends Piece {
  isFirstStep = true;
  constructor(color: Color, cell: Cell) {
    super(color, cell);
    this.name = PieceNames.KING;
    this.icon = PieceIcons.KING;
  }

  public canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;

    const diffX = Math.abs(this.cell.x - targetCell.x);
    const diffY = Math.abs(this.cell.y - targetCell.y);

    return diffX <= 1 && diffY <= 1;
  }
}
