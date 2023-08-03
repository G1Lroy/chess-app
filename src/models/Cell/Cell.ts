import { Piece } from "../Piece/Piece";

export class Cell {
  public readonly x: number;
  public readonly y: number;
  public readonly color: number;
  public piece: Piece | null;
  public availableToMove: boolean;

  constructor(x: number, y: number, color: number, piece: Piece | null) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.piece = piece;
    this.availableToMove = false;
  }
  public equals(otherX: number, otherY: number) {
    return this.x === otherX && this.y === otherY;
  }
  public movePiece(target: Cell) {
    if (this.piece && this.piece.isCellavilableToMove(target)) {
      console.log("move");

      this.piece.move(target);
      target.piece = this.piece;
      this.piece = null;
    }
  }
}
