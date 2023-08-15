import { Cell } from "../Cell/Cell";
import { Bishop } from "../Piece/Bishop";
import { King } from "../Piece/King";
import { Knight } from "../Piece/Knight";
import { Pawn } from "../Piece/Pawn";
import { Color, Piece, PieceNames } from "../Piece/Piece";

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

    if (diffX <= 1 && diffY <= 1 && (!currentCell.piece || currentCell.piece instanceof King))
      this.cellsAroundKing.push(currentCell);
  }
  public cancelKingMove(currentColor: Color): void {
    for (let cell of this.cellsAroundKing) {
      for (let piece of this.enemyPieces) {
        if (piece instanceof Pawn && cell.piece?.name !== PieceNames.KING) {
          cell.piece = new Knight(currentColor, cell);
          cell.piece.fakeCreated = true;
        }
        // можно попробовать добавить проверку прямо сюда
        // что piece.canMove(cell) + ofset y|x
        // исходя из позиции короля
        // тогда можно будет вернуть проверку на короля в базовом классе фигуры
        // и избавиться от половины кода в getCellBehindKing
        if (piece.canMove(cell)) {
          cell.availableToAttack = true;
          cell.availableToMove = false;

          const cellBehind = this.getCellBehindKing(piece);
          if (cellBehind) {
            cellBehind.availableToAttack = true;
            cellBehind.availableToMove = false;
          }
        }
        if (cell.piece?.fakeCreated) cell.piece = null;
      }
    }
  }
  public getCellBehindKing(attackerPiece: Piece): Cell | void {
    const kingCell = this.kingCell;

    if (!kingCell) return;

    const isRook = attackerPiece.name === PieceNames.ROOK;
    const isBishop = attackerPiece.name === PieceNames.BISHOP;
    const isQueen = attackerPiece.name === PieceNames.QUEEN;

    if (isRook || isBishop || isQueen) {
      const pieceCell = attackerPiece.cell;

      const kingX = kingCell.x;
      const kingY = kingCell.y;
      const pieceX = pieceCell.x;
      const pieceY = pieceCell.y;

      const xDiff = kingX - pieceX;
      const yDiff = kingY - pieceY;

      let behindKingX: number;
      let behindKingY: number;
      const diffYCheck = yDiff < 0 ? -1 : 1;
      const diffXCheck = xDiff < 0 ? -1 : 1;

      if ((isQueen || isRook) && xDiff === 0) {
        behindKingX = kingX;
        behindKingY = kingY + diffYCheck;
      } else if ((isQueen || isRook) && yDiff === 0) {
        behindKingX = kingX + diffXCheck;
        behindKingY = kingY;
      } else if ((isQueen || isBishop) && Math.abs(xDiff) === Math.abs(yDiff)) {
        behindKingX = kingX + diffXCheck;
        behindKingY = kingY + diffYCheck;
      } else {
        return;
      }

      return kingCell.board.getCell(behindKingX, behindKingY);
    }
  }
}
