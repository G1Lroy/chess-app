import { Cell } from "../Cell/Cell";
import { Bishop } from "../Piece/Bishop";
import { King } from "../Piece/King";
import { Knight } from "../Piece/Knight";
import { Pawn } from "../Piece/Pawn";
import { Color, Piece } from "../Piece/Piece";
import { Queen } from "../Piece/Queen";
import { Rook } from "../Piece/Rook";
import _ from "lodash";

export class Board {
  cellsGrid: Cell[][] = [];
  black = Color.BLACK;
  white = Color.WHITE;

  public constructBoard(): void {
    for (let x = 0; x < 8; x++) {
      const row: Cell[] = [];
      for (let y = 0; y < 8; y++) {
        if ((x + y) % 2 !== 0) {
          row.push(new Cell(y, x, this.black, null, this));
        } else {
          row.push(new Cell(y, x, this.white, null, this));
        }
      }
      this.cellsGrid.push(row);
    }
  }
  public defaultPieceSetup(): void {
    new King(this.black, this.getCell(7, 0));
    new Queen(this.black, this.getCell(6, 0));
    new Rook(this.white, this.getCell(6, 7));
    // new Rook(this.black, this.getCell(7, 6));
    // new Rook(this.black, this.getCell(6, 6));
    new Queen(this.white, this.getCell(5, 2));
    // new Bishop(this.white, this.getCell(3, 3));

    // for (let x = 0; x < 8; x++) {
    //   new Pawn(this.black, this.getCell(x, 1));
    //   new Pawn(this.white, this.getCell(x, 6));
    // }
    // new Rook(this.black, this.getCell(0, 0));
    // new Rook(this.black, this.getCell(7, 0));
    // new Rook(this.white, this.getCell(0, 7));
    // new Rook(this.white, this.getCell(7, 7));

    // new Knight(this.black, this.getCell(1, 0));
    // new Knight(this.black, this.getCell(6, 0));
    // new Knight(this.white, this.getCell(1, 7));
    // new Knight(this.white, this.getCell(6, 7));
    // new Bishop(this.black, this.getCell(2, 0));
    // new Bishop(this.black, this.getCell(5, 0));
    // new Bishop(this.white, this.getCell(2, 7));
    // new Bishop(this.white, this.getCell(5, 7));
    // new Queen(this.black, this.getCell(3, 0));
    // new Queen(this.white, this.getCell(3, 7));
    // new King(this.black, this.getCell(4, 0));
    new King(this.white, this.getCell(4, 7));
  }
  public getCell(x: number, y: number) {
    return this.cellsGrid[y][x];
  }
  public clone(): Board {
    const newBoard = new Board();
    newBoard.cellsGrid = this.cellsGrid;
    return newBoard;
  }
  public cloneDeep(): Board {
    const newBoard = new Board();
    newBoard.cellsGrid = _.cloneDeep(this.cellsGrid);
    return newBoard;
  }
  public findPiecesByColor(color: Color): Piece[] {
    const pieces: Piece[] = [];
    this.cellsGrid.forEach((row) =>
      row.forEach((cell) => {
        if (cell.piece && cell.piece.color === color) pieces.push(cell.piece);
      })
    );
    return pieces;
  }
  public findKing(color: Color): Cell | null {
    let kingCell;
    this.cellsGrid.some((row) =>
      row.some((cell) => {
        if (cell.piece?.color === color && cell.piece instanceof King) {
          kingCell = cell;
          return true;
        }
      })
    );
    return kingCell || null;
  }
}
