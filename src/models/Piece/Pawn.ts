import { Coordinates } from "./Coordinates";
import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Pawn extends Piece {
  constructor(color: Color, coordinates: Coordinates) {
    super(color, coordinates);
    this.name = PieceNames.PAWN;
    this.icon = PieceIcons.PAWN;
  }
}
