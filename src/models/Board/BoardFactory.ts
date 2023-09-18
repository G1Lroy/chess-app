import _ from "lodash";
import { Board } from "./Board";
import { PieceFactory } from "../Piece/PieceFactory";
import { Color } from "../Piece/types";

export class BoardFactory {
  board: Board;
  player: Color = Color.WHITE;
  constructor(board: Board) {
    this.board = board;
  }
  public fromFEN(fen: string): void {
    this.board.constructBoard();
    const pieceFactory = new PieceFactory();
    const parts = fen.split(" ");
    const piecePositions = parts[0];
    const fenRows = piecePositions.split("/");

    // set pieces
    for (let i = 0; i < fenRows.length; i++) {
      const row = fenRows[i];
      const y = i;
      let x = 0;

      for (let j = 0; j < row.length; j++) {
        const fenChar = row.charAt(j);

        if (/[1-8]/.test(fenChar)) {
          x += parseInt(fenChar, 10);
        } else {
          pieceFactory.fromFenChar(this.board, fenChar, x, y);
          x++;
        }
      }
    }
    // set player
    this.player = parts[1] === "w" ? Color.WHITE : Color.BLACK;
  }
  public cloneDeep(): Board {
    const newBoard = new Board();
    newBoard.cellsGrid = _.cloneDeep(this.board.cellsGrid);
    return newBoard;
  }
}
