import { Cell } from "../Cell/Cell";

import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Queen extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell);
    this.name = PieceNames.QUEEN;
    this.icon = PieceIcons.QUEEN;
  }
  public canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;
    if (this.cell.isEmptyVetrical(targetCell)) return true;
    if (this.cell.isEmptyHorizontal(targetCell)) return true;
    if (this.cell.isEmptyDiagonal(targetCell)) return true;
    return false;
  }
}
