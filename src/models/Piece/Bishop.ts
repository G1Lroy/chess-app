import { Coordinates } from "./Coordinates";
import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Bishop extends Piece {
  constructor(color: Color, coordinates: Coordinates) {
    super(color, coordinates);
    this.name = PieceNames.BISHOP;
    this.icon = PieceIcons.BISHOP
  }
}
