import { Board } from "../Board/Board";
import { Piece } from "../Piece/Piece";

export class Cell {
  public readonly x: number;
  public readonly y: number;
  public readonly color: number;
  public piece: Piece | null;
  public availableToMove: boolean;
  public availableToAttack: boolean;
  public board: Board;

  constructor(x: number, y: number, color: number, piece: Piece | null, board: Board) {
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
    if (this.piece && this.piece.canMove(target)) {
      target.setPiece(this.piece);
      this.piece = null;
    }
  }
  public isEmpty(): boolean {
    return this.piece === null;
  }
  // метод нужен только для пешки
  isEnemy(target: Cell): boolean {
    if (!target.piece) return false;
    return this.piece?.color !== target.piece?.color;
  }
}
