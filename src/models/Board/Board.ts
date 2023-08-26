import { Cell } from "../Cell/Cell";
import { Bishop } from "../Piece/Bishop";
import { King } from "../Piece/King";
import { Knight } from "../Piece/Knight";
import { Pawn } from "../Piece/Pawn";
import { Color } from "../Piece/Piece";
import { Queen } from "../Piece/Queen";
import { Rook } from "../Piece/Rook";

export class Board {
  cellsGrid: Cell[][] = [];

  public constructBoard(): void {
    for (let x = 0; x < 8; x++) {
      const row: Cell[] = [];
      for (let y = 0; y < 8; y++) {
        if ((x + y) % 2 !== 0) {
          row.push(new Cell(y, x, Color.BLACK, null, this));
        } else {
          row.push(new Cell(y, x, Color.WHITE, null, this));
        }
      }
      this.cellsGrid.push(row);
    }
  }
  public defaultPieceSetup(): void {
    // new King(Color.BLACK, this.getCell(1, 5));
    // new Rook(Color.WHITE, this.getCell(6, 7));
    // new Rook(Color.BLACK, this.getCell(7, 6));
    // new Rook(Color.BLACK, this.getCell(6, 6));
    // new Queen(Color.WHITE, this.getCell(6, 7));
    // new Bishop(Color.WHITE, this.getCell(3, 3));

    // for (let x = 0; x < 8; x++) {
    //   new Pawn(Color.BLACK, this.getCell(x, 1));
    //   new Pawn(Color.WHITE, this.getCell(x, 6));
    // }
    new Rook(Color.BLACK, this.getCell(0, 0));
    new Rook(Color.BLACK, this.getCell(7, 0));
    new Rook(Color.WHITE, this.getCell(0, 7));
    new Rook(Color.WHITE, this.getCell(7, 7));

    new Knight(Color.BLACK, this.getCell(1, 0));
    new Knight(Color.BLACK, this.getCell(6, 0));
    new Knight(Color.WHITE, this.getCell(1, 7));
    new Knight(Color.WHITE, this.getCell(6, 7));
    new Bishop(Color.BLACK, this.getCell(2, 0));
    new Bishop(Color.BLACK, this.getCell(5, 0));
    new Bishop(Color.WHITE, this.getCell(2, 7));
    new Bishop(Color.WHITE, this.getCell(5, 7));
    new Queen(Color.BLACK, this.getCell(3, 0));
    new Queen(Color.WHITE, this.getCell(3, 7));
    new King(Color.BLACK, this.getCell(4, 0));
    new King(Color.WHITE, this.getCell(4, 7));
  }
  public getCell(x: number, y: number) {
    return this.cellsGrid[y][x];
  }
  public clone(): Board {
    const newBoard = new Board();
    newBoard.cellsGrid = this.cellsGrid;
    return newBoard;
  }
}
