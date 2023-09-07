import { Board } from "../Board/Board";
import { Color, Piece } from "../Piece/Piece";

export class Cell {
  public readonly x: number;
  public readonly y: number;
  public readonly color: Color;
  public piece: Piece | null;
  public availableToMove: boolean;
  public availableToAttack: boolean;
  public board: Board;

  constructor(x: number, y: number, color: Color, piece: Piece | null, board: Board) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.piece = piece;
    this.availableToMove = false;
    this.availableToAttack = false;
    this.board = board;
  }
  public equals(otherX: number, otherY: number): boolean {
    return this.x === otherX && this.y === otherY;
  }
  public setPiece(piece: Piece) {
    this.piece = piece;
    this.piece.cell = this;
  }
  public movePiece(target: Cell) {
    target.setPiece(this.piece as Piece);
    this.piece = null;
  }
  public isEmpty(): boolean {
    return this.piece === null;
  }
  // метод нужен только для пешки
  public isEnemy(target: Cell): boolean {
    if (!target.piece) return false;
    return this.piece?.color !== target.piece?.color;
  }
  public isCellOnBoard(x: number, y: number): boolean {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
  }
}
