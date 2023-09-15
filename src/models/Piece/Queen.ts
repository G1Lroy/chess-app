import { Cell } from "../Cell/Cell";
import { LongRangePieceMath } from "../Utils/LongRangePieceMath";

import { Piece } from "./Piece";
import { Color, PieceNames, PieceIcons } from "./types";

export class Queen extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell);
    this.name = PieceNames.QUEEN;
    this.icon = PieceIcons.QUEEN;
  }
  public canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;
    if (LongRangePieceMath.isEmptyHorizontal(targetCell, this.cell.x, this.cell.y)) return true;
    if (LongRangePieceMath.isEmptyVetrical(targetCell, this.cell.x, this.cell.y)) return true;
    if (LongRangePieceMath.isEmptyDiagonal(targetCell, this.cell.x, this.cell.y)) return true;
    return false;
  }

}
