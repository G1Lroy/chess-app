import { Coordinates } from "./Coordinates";
import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Queen extends Piece {
  constructor(color: Color, coordinates: Coordinates) {
    super(color, coordinates);
    this.name = PieceNames.QUEEN;
    this.icon = PieceIcons.QUEEN;
  }
}
