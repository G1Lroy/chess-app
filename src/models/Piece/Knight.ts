import { Coordinates } from "./Coordinates";
import { CoordinatesShift } from "./CoordinatesShift";
import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Knight extends Piece {
  protected getPieceMoves() {
    return [
      new CoordinatesShift(1, 2),
      new CoordinatesShift(2, 1),
      new CoordinatesShift(2, -1),
      new CoordinatesShift(1, -2),
      new CoordinatesShift(-2, -1),
      new CoordinatesShift(-1, -2),
      new CoordinatesShift(-2, 1),
      new CoordinatesShift(-1, 2),
    ];
  }
  constructor(color: Color, coordinates: Coordinates) {
    super(color, coordinates);
    this.name = PieceNames.KNIGHT;
    this.icon = PieceIcons.KNIGHT;
  }
}
