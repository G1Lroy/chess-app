import { Coordinates } from "./Coordinates";
import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Rook extends Piece {
  constructor(color: Color, coordinates: Coordinates) {
    super(color, coordinates);
    this.name = PieceNames.ROOK;
    this.icon = PieceIcons.ROOK;
  }
}
