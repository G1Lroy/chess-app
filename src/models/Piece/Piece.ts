import { Board } from "../Board/Board";
import { Coordinates } from "./Coordinates";
import { CoordinatesShift } from "./CoordinatesShift";

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

  public getAvailableCell(board: Board): Coordinates[] {
    const resultCells = [];
    
    for (const shift of this.getPieceMoves()) {
      if (this.coordinates.canShift(shift)) {
        const coordinatesToShift = this.coordinates.shift(shift);
        if (this.isCellavilableToMove(coordinatesToShift, board)) {
          resultCells.push(coordinatesToShift);
        }
      }
    }
    return resultCells;
  }

  public isCellavilableToMove(coordinatesToShift: Coordinates, board: Board): boolean {
    return (
      !board.isCellUsed(coordinatesToShift) ||
      board.getPieceByCoordinates(coordinatesToShift)?.color != this.color
    );
  }

  protected abstract getPieceMoves(): CoordinatesShift[];
}
