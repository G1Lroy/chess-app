import { Bishop } from "../Piece/Bishop";
import { Coordinates, FileCoords } from "../Piece/Coordinates";
import { King } from "../Piece/King";
import { Knight } from "../Piece/Knight";
import { Pawn } from "../Piece/Pawn";
import { Color, Piece } from "../Piece/Piece";
import { Queen } from "../Piece/Queen";
import { Rook } from "../Piece/Rook";

export class Board {
  piecesOnBoard: { coordinates: Coordinates; piece: Piece }[] = [];

  constructor() {
    this.defaultPieceSetup();
  }

  public setPiece(piece: Piece, coordinates: Coordinates): void {
    piece.coordinates = coordinates;
    this.piecesOnBoard.push({ coordinates, piece });
  }

  public defaultPieceSetup(): void {
    // set pawns
    for (const x of Object.values(FileCoords)) {
      this.setPiece(new Pawn(Color.WHITE, new Coordinates(x, 2)), new Coordinates(x, 2));
      this.setPiece(new Pawn(Color.BLACK, new Coordinates(x, 7)), new Coordinates(x, 7));
    }
    // set rooks
    this.setPiece(new Rook(Color.WHITE, new Coordinates(FileCoords.A, 1)), new Coordinates(FileCoords.A, 1));
    this.setPiece(new Rook(Color.WHITE, new Coordinates(FileCoords.H, 1)), new Coordinates(FileCoords.H, 1));
    this.setPiece(new Rook(Color.BLACK, new Coordinates(FileCoords.H, 8)), new Coordinates(FileCoords.H, 8));
    this.setPiece(new Rook(Color.BLACK, new Coordinates(FileCoords.H, 8)), new Coordinates(FileCoords.A, 8));
    // set knight
    this.setPiece(new Knight(Color.WHITE, new Coordinates(FileCoords.B, 1)), new Coordinates(FileCoords.B, 1));
    this.setPiece(new Knight(Color.WHITE, new Coordinates(FileCoords.G, 1)), new Coordinates(FileCoords.G, 1));
    this.setPiece(new Knight(Color.BLACK, new Coordinates(FileCoords.B, 8)), new Coordinates(FileCoords.G, 8));
    this.setPiece(new Knight(Color.BLACK, new Coordinates(FileCoords.G, 8)), new Coordinates(FileCoords.B, 8));
    //set bishops
    this.setPiece(new Bishop(Color.WHITE, new Coordinates(FileCoords.C, 1)), new Coordinates(FileCoords.C, 1));
    this.setPiece(new Bishop(Color.WHITE, new Coordinates(FileCoords.F, 1)), new Coordinates(FileCoords.F, 1));
    this.setPiece(new Bishop(Color.BLACK, new Coordinates(FileCoords.C, 8)), new Coordinates(FileCoords.C, 8));
    this.setPiece(new Bishop(Color.BLACK, new Coordinates(FileCoords.F, 8)), new Coordinates(FileCoords.F, 8));
    //set queens
    this.setPiece(new Queen(Color.WHITE, new Coordinates(FileCoords.D, 1)), new Coordinates(FileCoords.D, 1));
    this.setPiece(new Queen(Color.BLACK, new Coordinates(FileCoords.D, 8)), new Coordinates(FileCoords.D, 8));
    // set kings
    this.setPiece(new King(Color.WHITE, new Coordinates(FileCoords.E, 1)), new Coordinates(FileCoords.E, 1));
    this.setPiece(new King(Color.BLACK, new Coordinates(FileCoords.E, 8)), new Coordinates(FileCoords.E, 8));
  }

  public isCellDark(coordinates: Coordinates): boolean {
    const { xCoords, yCoords } = coordinates;
    const xIndex = Object.values(FileCoords).indexOf(xCoords);
    const yIndex = yCoords - 1;
    return (xIndex + yIndex) % 2 === 0;
  }

  public getPieceByCoordinates(coordinates: Coordinates) {
    for (const item of this.piecesOnBoard) {
      if (item.coordinates.equals(coordinates)) {
        return item.piece;
      }
    }
  }
}
