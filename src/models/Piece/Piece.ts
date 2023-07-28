import { Coordinates } from "./Coordinates";

export enum Color {
  WHITE,
  BLACK,
}
export enum PieceNames {
  PIECE = "PIECE",
  KING = "KING",
  KNIGHT = "KNIGHT",
  PAWN = "PAWN",
  QUEEN = "QUEEN",
  ROOK = "ROOK",
  BISHOP = "BISHOP",
}
export enum PieceIcons {
  PIECE = "",
  KING = "♚",
  KNIGHT = "♞",
  PAWN = "♟︎",
  QUEEN = "♛",
  ROOK = "♜",
  BISHOP = "♝",
}

export abstract class Piece {
  public readonly color: Color;
  public coordinates: Coordinates;
  public name: PieceNames;
  public icon: string;

  constructor(color: Color, coordinates: Coordinates) {
    this.color = color;
    this.coordinates = coordinates;
    this.name = PieceNames.PIECE;
    this.icon = PieceIcons.PIECE;
  }
}
