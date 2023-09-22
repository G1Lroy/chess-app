import { Cell } from "../Cell/Cell";

export class LongRangePieceMath {
  public static isEmptyDiagonal(target: Cell, x: number, y: number):boolean {
    const xDiff = Math.abs(x - target.x);
    const yDiff = Math.abs(y - target.y);
    if (xDiff !== yDiff) return false;

    const xDirection = x < target.x ? 1 : -1;
    const yDirection = y < target.y ? 1 : -1;
    for (let i = 1; i < xDiff; i++) {
      const cell = target.board.getCell(x + i * xDirection, y + i * yDirection);
      if (!cell.isEmpty()) return false;
    }
    return true;
  }
  public static isEmptyVetrical(target: Cell, x: number, y: number):boolean {
    if (x !== target.x) return false;

    const minY = Math.min(y, target.y);
    const maxY = Math.max(y, target.y);

    for (let y = minY + 1; y < maxY; y++) {
      const cell = target.board.getCell(x, y);
      if (!cell.isEmpty()) return false;
    }

    return true;
  }
  public static isEmptyHorizontal(target: Cell, x: number, y: number):boolean {
    if (y !== target.y) return false;

    const minX = Math.min(x, target.x);
    const maxX = Math.max(x, target.x);

    for (let x = minX + 1; x < maxX; x++) {
      const cell = target.board.getCell(x, y);
      if (!cell.isEmpty()) return false;
    }

    return true;
  }
}
