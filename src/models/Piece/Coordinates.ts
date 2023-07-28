export enum FileCoords {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  H = "H",
}

export class Coordinates {
  public readonly xCoords: FileCoords;
  public readonly yCoords: number;

  constructor(xCoords: FileCoords, yCoords: number) {
    this.xCoords = xCoords;
    this.yCoords = yCoords;
  }
  public equals(other: Coordinates): boolean {
    return this.xCoords === other.xCoords && this.yCoords === other.yCoords;
  }
}
