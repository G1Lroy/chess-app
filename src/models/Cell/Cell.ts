import { Board } from "../Board/Board";
import { Color, Piece } from "../Piece/Piece";

export class Cell {
  public readonly x: number;
  public readonly y: number;
  public readonly color: number;
  public piece: Piece | null;
  public availableToMove: boolean;
  public board: Board;

  constructor(x: number, y: number, color: number, piece: Piece | null, board: Board) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.piece = piece;
    this.availableToMove = false;
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
  isEmptyVetrical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }

    const minY = Math.min(this.y, target.y);
    const maxY = Math.max(this.y, target.y);

    for (let y = minY + 1; y < maxY; y++) {
      const cell = this.board.getCell(this.x, y);
      if (!cell.isEmpty()) {
        return false;
      }
    }

    return true;
  }
  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }
    const minX = Math.min(this.x, target.x);
    const maxX = Math.max(this.x, target.x);

    for (let x = minX + 1; x < maxX; x++) {
      const cell = this.board.getCell(x, this.y);
      if (!cell.isEmpty()) {
        return false;
      }
    }

    return true;
  }
  isEmptyDiagonal(target: Cell): boolean {
    const xDiff = Math.abs(this.x - target.x);
    const yDiff = Math.abs(this.y - target.y);
    if (xDiff !== yDiff) {
      return false;
    }
    const xDirection = this.x < target.x ? 1 : -1;
    const yDirection = this.y < target.y ? 1 : -1;
    for (let i = 1; i < xDiff; i++) {
      const cell = this.board.getCell(this.x + i * xDirection, this.y + i * yDirection);
      if (!cell.isEmpty()) {
        return false;
      }
    }
    return true;
  }
  // метод нужен только для пешки
  // только пешка может атаковать клетки
  // на которые не ходит
  isEnemy(target: Cell): boolean {
    if (!target.piece) return false;
    return this.piece?.color !== target.piece?.color;
  }
}
