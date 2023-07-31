import { Coordinates } from "./Coordinates";
import { CoordinatesShift } from "./CoordinatesShift";
import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Pawn extends Piece {
  protected getPieceMoves(): CoordinatesShift[] {
    return [];
  }
  constructor(color: Color, coordinates: Coordinates) {
    super(color, coordinates);
    this.name = PieceNames.PAWN;
    this.icon = PieceIcons.PAWN;
  }
}
