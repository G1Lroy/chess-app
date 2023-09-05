import { Cell } from "../Cell/Cell";
import { LongRangePieceMath } from "../Utils/LongRangePieceMath";

import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Bishop extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell);
    this.name = PieceNames.BISHOP;
    this.icon = PieceIcons.BISHOP;
  }
  public canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;
    if (LongRangePieceMath.isEmptyDiagonal(targetCell, this.cell.x, this.cell.y)) return true;
    return false;
  }
}
