import { Cell } from "../Cell/Cell";

import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Bishop extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell);
    this.name = PieceNames.BISHOP;
    this.icon = PieceIcons.BISHOP;
  }
}
