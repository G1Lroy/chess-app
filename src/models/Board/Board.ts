import { Bishop } from "../Piece/Bishop";
import { Coordinates, fileCoords } from "../Piece/Coordinates";
import { King } from "../Piece/King";
import { Knight } from "../Piece/Knight";
import { Pawn } from "../Piece/Pawn";
import { Color, Piece } from "../Piece/Piece";
import { Queen } from "../Piece/Queen";
import { Rook } from "../Piece/Rook";

export class Board {
  piecesOnBoard: { piece: Piece; coordinates: Coordinates }[] = [];

  constructor() {
    this.defaultPieceSetup();
    this.setPiece(new Knight(Color.WHITE, new Coordinates("D", 4)), new Coordinates("D", 4));
  }

  public setPiece(piece: Piece, coordinates: Coordinates): void {
    this.piecesOnBoard.push({ piece, coordinates });
  }

  public removePiece(coordinates: Coordinates) {
    return (this.piecesOnBoard = this.piecesOnBoard.filter(
      (piece) => !piece.coordinates.equals(coordinates)
    ));
  }

  public movePiece(from: Coordinates, to: Coordinates): void {
    const piece = this.getPieceByCoordinates(from);
    this.removePiece(from);
    this.setPiece(piece as Piece, to);
  }

  public defaultPieceSetup(): void {
    // set pawns
    for (const x of fileCoords) {
      this.setPiece(new Pawn(Color.WHITE, new Coordinates(x, 2)), new Coordinates(x, 2));
      this.setPiece(new Pawn(Color.BLACK, new Coordinates(x, 7)), new Coordinates(x, 7));
    }
    // set rooks
    this.setPiece(
      new Rook(Color.WHITE, new Coordinates(fileCoords[0], 1)),
      new Coordinates(fileCoords[0], 1)
    );
    this.setPiece(
      new Rook(Color.WHITE, new Coordinates(fileCoords[7], 1)),
      new Coordinates(fileCoords[7], 1)
    );
    this.setPiece(
      new Rook(Color.BLACK, new Coordinates(fileCoords[0], 8)),
      new Coordinates(fileCoords[0], 8)
    );
    this.setPiece(
      new Rook(Color.BLACK, new Coordinates(fileCoords[7], 8)),
      new Coordinates(fileCoords[7], 8)
    );
    // set knight
    this.setPiece(
      new Knight(Color.WHITE, new Coordinates(fileCoords[1], 1)),
      new Coordinates(fileCoords[1], 1)
    );
    this.setPiece(
      new Knight(Color.WHITE, new Coordinates(fileCoords[6], 1)),
      new Coordinates(fileCoords[6], 1)
    );
    this.setPiece(
      new Knight(Color.BLACK, new Coordinates(fileCoords[1], 8)),
      new Coordinates(fileCoords[6], 8)
    );
    this.setPiece(
      new Knight(Color.BLACK, new Coordinates(fileCoords[6], 8)),
      new Coordinates(fileCoords[1], 8)
    );
    //set bishops
    this.setPiece(
      new Bishop(Color.WHITE, new Coordinates(fileCoords[2], 1)),
      new Coordinates(fileCoords[2], 1)
    );
    this.setPiece(
      new Bishop(Color.WHITE, new Coordinates(fileCoords[5], 1)),
      new Coordinates(fileCoords[5], 1)
    );
    this.setPiece(
      new Bishop(Color.BLACK, new Coordinates(fileCoords[2], 8)),
      new Coordinates(fileCoords[2], 8)
    );
    this.setPiece(
      new Bishop(Color.BLACK, new Coordinates(fileCoords[5], 8)),
      new Coordinates(fileCoords[5], 8)
    );
    //set queens
    this.setPiece(
      new Queen(Color.WHITE, new Coordinates(fileCoords[3], 1)),
      new Coordinates(fileCoords[3], 1)
    );
    this.setPiece(
      new Queen(Color.BLACK, new Coordinates(fileCoords[3], 8)),
      new Coordinates(fileCoords[3], 8)
    );
    // set kings
    this.setPiece(
      new King(Color.WHITE, new Coordinates(fileCoords[4], 1)),
      new Coordinates(fileCoords[4], 1)
    );
    this.setPiece(
      new King(Color.BLACK, new Coordinates(fileCoords[4], 8)),
      new Coordinates(fileCoords[4], 8)
    );
  }

  public isCellDark(coordinates: Coordinates): boolean {
    const { xCoords, yCoords } = coordinates;
    const xIndex = fileCoords.indexOf(xCoords);
    const yIndex = yCoords - 1;
    return (xIndex + yIndex) % 2 === 0;
  }

  public colorizeCell(isCellDark: boolean): string {
    return isCellDark ? "dark" : "light";
  }

  public getPieceByCoordinates(coordinates: Coordinates): Piece | undefined {
    for (const item of this.piecesOnBoard) {
      if (item.coordinates.equals(coordinates)) return item.piece;
    }
  }

  public isCellUsed(coordinates: Coordinates): boolean {

    for (const item of this.piecesOnBoard) {
      if (item.coordinates.equals(coordinates)) return true;
    }
    return false;
  }
}
