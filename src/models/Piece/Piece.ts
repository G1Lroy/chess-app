import { Cell } from "../Cell/Cell";

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
  public cell: Cell;
  public name: PieceNames;
  public icon: string;

  constructor(color: Color, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.piece = this;
    this.name = PieceNames.PIECE;
    this.icon = PieceIcons.PIECE;
  }

  public canMove(targetCell: Cell): boolean {
    if (this.color === targetCell.piece?.color) return false;
    else if (targetCell.piece?.name === PieceNames.KING) return false;
    return true;
  }
  // public movePiece(target: Cell) {}
}
