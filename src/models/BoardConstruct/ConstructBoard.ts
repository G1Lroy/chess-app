import { Board } from "../Board/Board";
import { Coordinates, fileCoords } from "../Piece/Coordinates";
import { Piece } from "../Piece/Piece";

export class ConstructBoard {
  public constructBoard(
    board: Board
  ): { piece: Piece | undefined; color: string; coordinates: Coordinates }[][] {
    const boardArray: { piece: Piece | undefined; color: string; coordinates: Coordinates }[][] = [];
    for (let x = 8; x >= 1; x--) {
      const row: { piece: Piece | undefined; color: string; coordinates: Coordinates }[] = [];
      for (const y of fileCoords) {
        const coordinates = new Coordinates(y, x);
        const piece = board.getPieceByCoordinates(coordinates);
        const color = board.colorizeCell(board.isCellDark(coordinates));
        row.push({ piece: piece || undefined, color, coordinates });
      }
      boardArray.push(row);
    }
    return boardArray;
  }
}
