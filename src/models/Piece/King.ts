import { Cell } from "../Cell/Cell";
import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class King extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell);
    this.name = PieceNames.KING;
    this.icon = PieceIcons.KING;
  }
}
