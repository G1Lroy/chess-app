import _ from "lodash";
import { Cell } from "../Cell/Cell";
import { Color, PieceNames, PieceIcons } from "./types";

export abstract class Piece {
  public readonly color: Color;
  public cell: Cell;
  public name: PieceNames;
  public icon: string;
  public fakeCreated?: boolean;
  public isFirstStep?: boolean;
  public isPawnLongStep?: boolean;
  public readonly id: string;

  constructor(color: Color, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.piece = this;
    this.name = PieceNames.PIECE;
    this.icon = PieceIcons.PIECE;
    this.id = _.uniqueId("pieceID_");
  }

  public canMove(targetCell: Cell): boolean {
    if (this.color === targetCell.piece?.color) return false;
    return true;
  }
}
