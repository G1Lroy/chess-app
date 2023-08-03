import { Cell } from "../Cell/Cell";

import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Queen extends Piece {

  constructor(color: Color, cell: Cell) {
    super(color, cell);
    this.name = PieceNames.QUEEN;
    this.icon = PieceIcons.QUEEN;
  }
}
