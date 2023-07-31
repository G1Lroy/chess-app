import { Coordinates } from "./Coordinates";
import { CoordinatesShift } from "./CoordinatesShift";
import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Rook extends Piece {
  protected getPieceMoves(): CoordinatesShift[] {
    return [];
  }
  constructor(color: Color, coordinates: Coordinates) {
    super(color, coordinates);
    this.name = PieceNames.ROOK;
    this.icon = PieceIcons.ROOK;
  }
}
