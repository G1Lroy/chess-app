import { CoordinatesShift } from "./CoordinatesShift";

export type FileCoords = string;

export const fileCoords: FileCoords[] = ["A", "B", "C", "D", "E", "F", "G", "H"];

export class Coordinates {
  public readonly xCoords: FileCoords;
  public readonly yCoords: number;

  constructor(xCoords: FileCoords, yCoords: number) {
    this.xCoords = xCoords;
    this.yCoords = yCoords;
  }

  public shift(shift: CoordinatesShift): Coordinates {
    const currentXIndex = fileCoords.indexOf(this.xCoords);
    return new Coordinates(fileCoords[currentXIndex + shift.xShift], this.yCoords + shift.yShift);
  }
  public canShift(shift: CoordinatesShift): boolean {
    const x = fileCoords.indexOf(this.xCoords) + shift.xShift;
    const y = this.yCoords + shift.yShift;
    if (x < 0 || x > 7) return false;
    if (y < 1 || y > 8) return false;
    return true;
  }
  public equals(other: Coordinates): boolean {
    return this.xCoords === other.xCoords && this.yCoords === other.yCoords;
  }
}
