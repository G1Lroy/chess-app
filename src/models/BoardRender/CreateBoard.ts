import { Board } from "../Board/Board";
import { Coordinates, FileCoords } from "../Piece/Coordinates";
import { Piece } from "../Piece/Piece";

export class CreateBoard {
  public constructBoard(board: Board): { content: Piece | undefined; color: string }[][] {
    const boardArray: { content: Piece | undefined; color: string }[][] = [];
    for (let x = 8; x >= 1; x--) {
      const row: { content: Piece | undefined; color: string }[] = [];
      for (const y of Object.values(FileCoords)) {
        const coordinates = new Coordinates(y, x);
        const pieceOnBoard = board.getPieceByCoordinates(coordinates);
        const cellColor = this.colorizeCell(board.isCellDark(coordinates));
        row.push({ content: pieceOnBoard || undefined, color: cellColor });
      }
      boardArray.push(row);
    }
    return boardArray;
  }
  private colorizeCell(isCellDark: boolean) {
    return isCellDark ? "dark" : "light";
  }
}
