import { Coordinates } from "./Coordinates";
import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Knight extends Piece {
  constructor(color: Color, coordinates: Coordinates) {
    super(color, coordinates);
    this.name = PieceNames.KNIGHT;
    this.icon = PieceIcons.KNIGHT;
  }
}
