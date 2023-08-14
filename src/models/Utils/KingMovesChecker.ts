import { Cell } from "../Cell/Cell";
import { Bishop } from "../Piece/Bishop";
import { Knight } from "../Piece/Knight";
import { Pawn } from "../Piece/Pawn";
import { Color, Piece, PieceNames } from "../Piece/Piece";
import { LongRangePieceMath } from "./LongRangePieceMath";

export class KingMovesChecker {
  enemyPieces: Piece[] = [];
  cellsAroundKing: Cell[] = [];
  kingCell: Cell | null = null;

  public getEnemyPieces(currentCell: Cell, selectedCell: Cell): void {
    if (currentCell.piece && currentCell.piece?.color !== selectedCell.piece?.color) {
      this.enemyPieces.push(currentCell.piece);
    }
  }
  public getCellAroundKing(currentCell: Cell, selectedCell: Cell): void {
    this.kingCell = selectedCell;
    const diffX = Math.abs(currentCell.x - selectedCell.x);
    const diffY = Math.abs(currentCell.y - selectedCell.y);

    if (diffX <= 1 && diffY <= 1 && !currentCell.piece) this.cellsAroundKing.push(currentCell);
  }
  public cancelKingMove(currentColor: Color): void {
    for (let cell of this.cellsAroundKing) {
      for (let piece of this.enemyPieces) {
        if (piece instanceof Pawn) {
          cell.piece = new Knight(currentColor, cell);
          cell.piece.fakeCreated = true;
        }
        if (piece.canMove(cell)) {
          cell.availableToAttack = true;
          cell.availableToMove = false;
          if (
            piece.name !== PieceNames.PAWN &&
            piece.name !== PieceNames.KING &&
            piece.name !== PieceNames.KNIGHT &&
            this.getCellBehindKing(piece)
          ) {
            const cellBehind = this.getCellBehindKing(piece) as Cell;
            cellBehind.availableToAttack = true;
            cellBehind.availableToMove = false;
          }
        }
        if (cell.piece?.fakeCreated) cell.piece = null;
      }
    }
    console.log(this.cellsAroundKing);
  }
  public getCellBehindKing(attackerPiece: Piece): Cell | void {
    const kingCell = this.kingCell;
    if (!kingCell) return;

    const pieceCell = attackerPiece.cell;

    const kingX = kingCell.x;
    const kingY = kingCell.y;
    const pieceX = pieceCell.x;
    const pieceY = pieceCell.y;

    const xDiff = kingX - pieceX;
    const yDiff = kingY - pieceY;

    let cellBehindKingX: number, cellBehindKingY: number;

    if (xDiff === 0) {
      cellBehindKingX = kingX;
      cellBehindKingY = kingY + (yDiff < 0 ? -1 : 1);
    } else if (yDiff === 0) {
      cellBehindKingX = kingX + (xDiff < 0 ? -1 : 1);
      cellBehindKingY = kingY;
    } else if (Math.abs(xDiff) === Math.abs(yDiff)) {
      cellBehindKingX = kingX + (xDiff < 0 ? -1 : 1);
      cellBehindKingY = kingY + (yDiff < 0 ? -1 : 1);
    } else {
      return;
    }

    return kingCell.board.getCell(cellBehindKingX, cellBehindKingY);
  }
}
