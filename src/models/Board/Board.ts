import { Cell } from "../Cell/Cell";
import { Bishop } from "../Piece/Bishop";
import { King } from "../Piece/King";
import { Knight } from "../Piece/Knight";
import { Pawn } from "../Piece/Pawn";
import { Color, Piece, PieceNames } from "../Piece/Piece";
import { Queen } from "../Piece/Queen";
import { Rook } from "../Piece/Rook";

export class Board {
  cells: Cell[][] = [];

  enemyPieces: Piece[] = [];
  cellsAroundKing: Cell[] = [];

  public constructBoard(): void {
    for (let x = 0; x < 8; x++) {
      const row: Cell[] = [];
      for (let y = 0; y < 8; y++) {
        if (this.isCellDark(x, y)) {
          row.push(new Cell(y, x, Color.BLACK, null, this));
        } else {
          row.push(new Cell(y, x, Color.WHITE, null, this));
        }
      }
      this.cells.push(row);
    }
  }
  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }
  public clone(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    return newBoard;
  }
  private cloneForKing(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.cellsAroundKing = this.cellsAroundKing;
    newBoard.enemyPieces = this.enemyPieces;
    return newBoard;
  }
  public highlightCells(selectedCell: Cell | null): void {
    const isKing = selectedCell?.piece?.name === PieceNames.KING;

    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];

      for (let j = 0; j < row.length; j++) {
        const currentCell = row[j];

        if (isKing) {
          // ищем вражеские фигуры
          this.getEnemyPieces(currentCell, selectedCell as Cell);
          // ищем клетки вокруг короля
          this.getCellAroundKing(currentCell, selectedCell as Cell);
        }

        currentCell.availableToMove = !!selectedCell?.piece?.canMove(currentCell);
      }
    }
    // Запрещаем королю ходить на атакованые клетки
    if (isKing) this.cancelKingMoveOnCellUnderAttack(selectedCell?.piece?.color as Color);
  }
  public defaultPieceSetup(): void {
    new Pawn(Color.BLACK, this.getCell(3, 3));
    new King(Color.WHITE, this.getCell(3, 5));
    // set pawns
    for (let x = 0; x < 8; x++) {
      new Pawn(Color.BLACK, this.getCell(x, 1));
      new Pawn(Color.WHITE, this.getCell(x, 6));
    }
    // set rooks
    new Rook(Color.BLACK, this.getCell(0, 0));
    new Rook(Color.BLACK, this.getCell(7, 0));
    new Rook(Color.WHITE, this.getCell(0, 7));
    new Rook(Color.WHITE, this.getCell(7, 7));

    // // set knight
    new Knight(Color.BLACK, this.getCell(1, 0));
    new Knight(Color.BLACK, this.getCell(6, 0));
    new Knight(Color.WHITE, this.getCell(1, 7));
    new Knight(Color.WHITE, this.getCell(6, 7));
    // //set bishops
    new Bishop(Color.BLACK, this.getCell(2, 0));
    new Bishop(Color.BLACK, this.getCell(5, 0));
    new Bishop(Color.WHITE, this.getCell(2, 7));
    new Bishop(Color.WHITE, this.getCell(5, 7));
    // //set queens
    new Queen(Color.BLACK, this.getCell(3, 0));
    new Queen(Color.WHITE, this.getCell(3, 7));
    // // set kings
    new King(Color.BLACK, this.getCell(4, 0));
    new King(Color.WHITE, this.getCell(4, 7));
  }
  private isCellDark(x: number, y: number): boolean {
    return (x + y) % 2 !== 0;
  }
  private getEnemyPieces(currentCell: Cell, selectedCell: Cell): void {
    if (currentCell.piece && currentCell.piece?.color !== selectedCell.piece?.color) {
      this.enemyPieces.push(currentCell.piece);
    }
  }
  private getCellAroundKing(currentCell: Cell, selectedCell: Cell) {
    if (!currentCell.piece) {
      const diffX = Math.abs(currentCell.x - selectedCell.x);
      const diffY = Math.abs(currentCell.y - selectedCell.y);

      if (diffX <= 1 && diffY <= 1) this.cellsAroundKing.push(currentCell);
    }
  }
  private cancelKingMoveOnCellUnderAttack(currentColor: Color) {
    
    const newBoard = this.cloneForKing();

    for (let cell of newBoard.cellsAroundKing) {
      for (let piece of newBoard.enemyPieces) {
        cell.piece = new Knight(currentColor, cell);
        if (piece instanceof Pawn && piece.canMove(cell)) cell.availableToMove = false;
        else if (piece.canMove(cell)) cell.availableToMove = false;
        cell.piece = null;
      }
    }
  }
}
//  получаем все вражеские фигуры
// получаем доступные ходы для каждой фигуры
// **для пешки проверяем на возможность атаки + хода
// в методе canMove проверяем что таргет(короля) не совпадает ни с одним значением из списка
