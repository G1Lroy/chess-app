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
  boardArray: { piece: Piece | undefined; color: string; coordinates: Coordinates }[][] = [];

  constructor() {

  }

  public clone(): Board {
    const newBoard = new Board();
    newBoard.piecesOnBoard = this.piecesOnBoard;
    return newBoard;
  }

  public constructBoard(): { piece: Piece | undefined; color: string; coordinates: Coordinates }[][] {
    for (let x = 8; x >= 1; x--) {
      const row: { piece: Piece | undefined; color: string; coordinates: Coordinates }[] = [];
      for (const y of fileCoords) {
        const coordinates = new Coordinates(y, x);
        const piece = this.getPieceByCoordinates(coordinates);
        const color = this.colorizeCell(this.isCellDark(coordinates));
        row.push({ piece: piece || undefined, color, coordinates });
      }
      this.boardArray.push(row);
    }
    return this.boardArray;
  }

  public setPiece(piece: Piece, coordinates: Coordinates): void {
    if (piece) this.piecesOnBoard.push({ piece, coordinates });
  }

  public removePiece(coordinates: Coordinates) {
    this.piecesOnBoard = this.piecesOnBoard.filter((piece) => !piece.coordinates.equals(coordinates));
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
    this.setPiece(new Rook(Color.WHITE, new Coordinates("A", 1)), new Coordinates("A", 1));
    this.setPiece(new Rook(Color.WHITE, new Coordinates("H", 1)), new Coordinates("H", 1));
    this.setPiece(new Rook(Color.BLACK, new Coordinates("A", 8)), new Coordinates("A", 8));
    this.setPiece(new Rook(Color.BLACK, new Coordinates("H", 8)), new Coordinates("H", 8));
    // set knight
    this.setPiece(new Knight(Color.WHITE, new Coordinates("B", 1)), new Coordinates("B", 1));
    this.setPiece(new Knight(Color.WHITE, new Coordinates("G", 1)), new Coordinates("G", 1));
    this.setPiece(new Knight(Color.BLACK, new Coordinates("B", 8)), new Coordinates("B", 8));
    this.setPiece(new Knight(Color.BLACK, new Coordinates("G", 8)), new Coordinates("G", 8));
    //set bishops
    this.setPiece(new Bishop(Color.WHITE, new Coordinates("C", 1)), new Coordinates("C", 1));
    this.setPiece(new Bishop(Color.WHITE, new Coordinates("F", 1)), new Coordinates("F", 1));
    this.setPiece(new Bishop(Color.BLACK, new Coordinates("C", 8)), new Coordinates("C", 8));
    this.setPiece(new Bishop(Color.BLACK, new Coordinates("F", 8)), new Coordinates("F", 8));
    //set queens
    this.setPiece(new Queen(Color.WHITE, new Coordinates("D", 1)), new Coordinates("D", 1));
    this.setPiece(new Queen(Color.BLACK, new Coordinates("D", 8)), new Coordinates("D", 8));
    // set kings
    this.setPiece(new King(Color.WHITE, new Coordinates("E", 1)), new Coordinates("E", 1));
    this.setPiece(new King(Color.BLACK, new Coordinates("E", 8)), new Coordinates("E", 8));
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
