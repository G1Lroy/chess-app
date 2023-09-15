import { Board } from "../Board/Board";
import { Cell } from "../Cell/Cell";
import { Bishop } from "../Piece/Bishop";
import { King } from "../Piece/King";
import { Knight } from "../Piece/Knight";
import { Pawn } from "../Piece/Pawn";
import { Piece } from "../Piece/Piece";
import { Color, PieceNames } from "../Piece/types";
import { Queen } from "../Piece/Queen";
import { Rook } from "../Piece/Rook";
import { PiecesUtils } from "./PiecesUtils";

export class KingMovesChecker {
  public cancelKingMove(board: Board, opposite: Color, currentColor: Color, king: Cell): void {
    const cellsAroundKing = PiecesUtils.findKingMoves(board, king, false);
    const enemyPieces = PiecesUtils.findPiecesByColor(board, opposite, true);

    // логика проверок следующая:
    // если вражеская фигура может походить на клетку вокруг короля
    // тогда запрещаем королю на нее ходить
    /*если вражеская фигура пешка:
    тогда создается фейковая фигура на клетке на которую потенциально может
    походить пешка, после проверок и запрета королю ходить, фейковая фигура удаляется  */
    //  если король под боем дальнобойно фингуры, то нужно запретить королю ходить по атакуемой оси
    //  для этого в метод getCellBehindKing передаем атакующую фигуру
    for (let cell of cellsAroundKing) {
      for (let piece of enemyPieces) {
        if (piece instanceof Pawn && cell.piece?.name !== PieceNames.KING) {
          cell.piece = new Knight(currentColor, cell);
          cell.piece.fakeCreated = true;
        }

        if (piece.canMove(cell)) {
          cell.availableToAttack = true;
          cell.availableToMove = false;

          const cellBehind = this.getCellBehindKing(king, piece);

          if (cellBehind) {
            cellBehind.availableToAttack = true;
            cellBehind.availableToMove = false;
          }
        }
        if (cell.piece?.fakeCreated) cell.piece = null;
      }
    }
  }
  private getCellBehindKing(king: Cell, attackerPiece: Piece): Cell | void {
    const isRook = attackerPiece instanceof Rook;
    const isBishop = attackerPiece instanceof Bishop;
    const isQueen = attackerPiece instanceof Queen;
    if (!(isRook || isBishop || isQueen)) return;

    const coordsBehind = this.getCoordinatesBehindMath(
      king.board,
      isBishop,
      isQueen,
      isRook,
      king.x,
      king.y,
      attackerPiece.cell
    );

    return coordsBehind ? king.board.getCell(coordsBehind.x, coordsBehind.y) : undefined;
  }
  private getCoordinatesBehindMath(
    board: Board,
    isBishop: boolean,
    isQueen: boolean,
    isRook: boolean,
    kingX: number,
    kingY: number,
    pieceCell: Cell
  ): { x: number; y: number } | null {
    let x;
    let y;

    const pieceX = pieceCell.x;
    const pieceY = pieceCell.y;
    // разница по осям фигуры с королем
    const xDiff = kingX - pieceX;
    const yDiff = kingY - pieceY;
    //  эта проверка нужна для определения где находиться
    //  атакующая фигура относительно короля
    //  ниже/выше/левей/правей
    const diffYCheck = yDiff < 0 ? -1 : 1;
    const diffXCheck = xDiff < 0 ? -1 : 1;

    // определяем клетку сзади короля
    if ((isBishop || isQueen) && Math.abs(xDiff) === Math.abs(yDiff)) {
      x = kingX + diffXCheck;
      y = kingY + diffYCheck;
    } else if (isRook && xDiff === 0) {
      x = kingX;
      y = kingY + diffYCheck;
    } else if (isRook && yDiff === 0) {
      x = kingX + diffXCheck;
      y = kingY;
    } else if (isQueen && xDiff === 0) {
      // для королевы нужно добавить еще одну проверку
      //  как она может бить по диагонали и находитья на той же оси по x или y
      if (this.isKingNext(pieceX, pieceY + diffYCheck, board)) {
        // єта проверка расчитана на кейс когда королева впритык к королю
        // в таком случае нужно запретить королю движение по атакуемой оси
        x = kingX;
        y = kingY + diffYCheck;
      }
      if (this.isEmptyNext(kingX, kingY - diffYCheck, board)) {
        // в этой проверку получаем клетку "за" королем, только в  том случае если
        // королеву никто не блокирует
        x = kingX;
        y = kingY + diffYCheck;
      }
    } else if (isQueen && yDiff === 0) {
      if (this.isKingNext(pieceX + diffXCheck, pieceY, board)) {
        x = kingX + diffXCheck;
        y = kingY;
      }
      if (this.isEmptyNext(kingX - diffXCheck, kingY, board)) {
        x = kingX + diffXCheck;
        y = kingY;
      }
    }

    const result = pieceCell.isCellOnBoard(x as number, y as number);

    return result && x !== undefined && y !== undefined ? { x, y } : null;
  }
  private isKingNext(x: number, y: number, board: Board): boolean {
    return board.getCell(x, y).piece instanceof King;
  }
  private isEmptyNext(x: number, y: number, board: Board): boolean {
    return board.getCell(x, y).isEmpty();
  }
}
