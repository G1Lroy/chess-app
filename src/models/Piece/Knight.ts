import { Cell } from "../Cell/Cell";
import { Color, Piece, PieceIcons, PieceNames } from "./Piece";

export class Knight extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell);
    this.name = PieceNames.KNIGHT;
    this.icon = PieceIcons.KNIGHT;
  }
  
}
