import { Board } from "../Board/Board";
import { Cell } from "../Cell/Cell";
import { Bishop } from "../Piece/Bishop";
import { King } from "../Piece/King";
import { Knight } from "../Piece/Knight";
import { Pawn } from "../Piece/Pawn";
import { Color, Piece, PieceNames } from "../Piece/Piece";
import { Queen } from "../Piece/Queen";
import { Rook } from "../Piece/Rook";

export class KingMovesChecker {
  enemyPieces: Piece[] = [];
  cellsAroundKing: Cell[] = [];
  king: Cell | null = null;

  public getEnemyPieces(currentCell: Cell, selectedCell: Cell): void {
    if (currentCell.piece && currentCell.piece?.color !== selectedCell.piece?.color) {
      this.enemyPieces.push(currentCell.piece);
    }
  }
  public getCellAroundKing(currentCell: Cell, selectedCell: Cell): void {
    this.king = selectedCell;
    const diffX = Math.abs(currentCell.x - selectedCell.x);
    const diffY = Math.abs(currentCell.y - selectedCell.y);

    if (diffX <= 1 && diffY <= 1 && (!currentCell.piece || currentCell.piece instanceof King))
      this.cellsAroundKing.push(currentCell);
  }
  // логика проверок следующая:
  // если вражеская фигура может походить на клетку вокрух короля
  // тогда запрещаем королю на нее ходить
  /*если фражеская фигура пешка:
    тогда создается фейковая вигура на клетке на которую потенциально может
    походить пешка, после проверок и запрета королю ходить, фейковая фигура удаляется  */
  //  если король под боем дальнобойно финуры, то нужно запретить королю ходить по атакуемой оси
  //  для этого в метод getCellBehindKing передаем атакующую фигуру
  public cancelKingMove(currentColor: Color): void {
    for (let cell of this.cellsAroundKing) {
      for (let piece of this.enemyPieces) {
        
        if (piece instanceof Pawn && cell.piece?.name !== PieceNames.KING) {
          cell.piece = new Knight(currentColor, cell);
          cell.piece.fakeCreated = true;
        }

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

    const king = this.king;
    if (!king) return;

    const isRook = attackerPiece instanceof Rook;
    const isBishop = attackerPiece instanceof Bishop;
    const isQueen = attackerPiece instanceof Queen;
    if (!(isRook || isBishop || isQueen)) return;

    const coordsBehind = this.getCoordinatesBehindMath(
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
    isBishop: boolean,
    isQueen: boolean,
    isRook: boolean,
    kingX: number,
    kingY: number,
    pieceCoords: Cell
  ): { x: number; y: number } | null {
    let x;
    let y;

    const pieceX = pieceCoords.x;
    const pieceY = pieceCoords.y;
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
      if (this.isKingNext(pieceX, pieceY + diffYCheck)) {
        // єта проверка расчитана на кейс когда королева впритык к королю
        // в таком случае нужно запретить королю движение по атакуемой оси
        x = kingX;
        y = kingY + diffYCheck;
      }
      if (this.isEmptyNext(kingX, kingY - diffYCheck)) {
        // в этой проверку получаем клетку "за" королем, только в  том случае если
        // королеву никто не блокирует
        x = kingX;
        y = kingY + diffYCheck;
      }
    } else if (isQueen && yDiff === 0) {
      if (this.isKingNext(pieceX + diffXCheck, pieceY)) {
        x = kingX + diffXCheck;
        y = kingY;
      }
      if (this.isEmptyNext(kingX - diffXCheck, kingY)) {
        x = kingX + diffXCheck;
        y = kingY;
      }
    }

    const result = this.isCellOnBoard(x as number, y as number);

    return result && x && y ? { x, y } : null;
  }
  private isCellOnBoard(x: number, y: number): boolean {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
  }
  private isKingNext(x: number, y: number) {
    return this.king!.board.getCell(x, y).piece instanceof King;
  }
  private isEmptyNext(x: number, y: number) {
    return this.king!.board.getCell(x, y).isEmpty();
  }
}
