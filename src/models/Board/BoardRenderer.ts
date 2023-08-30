import { Cell } from "../Cell/Cell";
import { Color, PieceNames } from "../Piece/Piece";
import { KingMovesChecker } from "../Utils/KingMovesChecker";
import { Board } from "./Board";

export class BoardRenderer {
  public renderCells(selectedCell: Cell | null, board: Board) {
    const isKing = selectedCell?.piece?.name === PieceNames.KING;
    const kingUtils = isKing ? new KingMovesChecker() : null;

    for (let i = 0; i < board.cellsGrid.length; i++) {
      const row = board.cellsGrid[i];

      for (let j = 0; j < row.length; j++) {
        const currentCell = row[j];

        if (isKing) {
          // ищем вражеские фигуры
          kingUtils!.getEnemyPieces(currentCell, selectedCell as Cell);
          // ищем клетки вокруг короля
          kingUtils!.getCellAroundKing(currentCell, selectedCell as Cell);
        }

        currentCell.availableToMove = !!selectedCell?.piece?.canMove(currentCell);

        currentCell.availableToAttack = false;
      }
    }
    // Запрещаем королю ходить на атакованые клетки
    if (isKing) kingUtils!.cancelKingMove(selectedCell?.piece?.color as Color);
  }
}
