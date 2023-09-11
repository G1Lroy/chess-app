import { Cell } from "../Cell/Cell";
import { Bishop } from "../Piece/Bishop";
import { Knight } from "../Piece/Knight";
import { Color, Piece, PieceNames } from "../Piece/Piece";
import { Queen } from "../Piece/Queen";
import { Rook } from "../Piece/Rook";

export class PawnTransform {
  public isPawnOnLastLine(color: Color, selectedCell: Cell, target: Cell) {
    const lastLine = color === Color.WHITE ? 0 : 7;
    return selectedCell?.piece?.name === PieceNames.PAWN && target.y === lastLine;
  }
  public transform(selectedCell: Cell, target: Cell, chosenPiece: PieceNames, color: Color): Piece | void {
    selectedCell.piece = null;
    switch (chosenPiece) {
      case PieceNames.QUEEN:
        target.piece = new Queen(color, target);
        return;
      case PieceNames.ROOK:
        target.piece = new Rook(color, target);
        return;
      case PieceNames.BISHOP:
        target.piece = new Bishop(color, target);
        return;
      case PieceNames.KNIGHT:
        target.piece = new Knight(color, target);
        return;
      default:
        return;
    }
  }
}
