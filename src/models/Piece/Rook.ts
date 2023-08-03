import { Cell } from "../Cell/Cell";

import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Rook extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell);
    this.name = PieceNames.ROOK;
    this.icon = PieceIcons.ROOK;
  }
}
