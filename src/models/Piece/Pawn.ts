import { Cell } from "../Cell/Cell";
import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Pawn extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell);
    this.name = PieceNames.PAWN;
    this.icon = PieceIcons.PAWN;
  }
}
