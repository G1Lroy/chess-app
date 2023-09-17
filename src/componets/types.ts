import { Dispatch, SetStateAction } from "react";
import { Cell } from "../models/Cell/Cell";

// Game info
export interface ICastlingUtils {
  king: Cell | null;
  leftRook: Cell | null;
  rightRook: Cell | null;
  longCastling: boolean;
  shortCastling: boolean;
  kingFirstStep: boolean;
}
// Cell component
export interface CellProps {
  clickHandler: (cell: Cell) => void;
  cell: Cell;
  selected: boolean | undefined;
}
//Board component
export interface IPawnTransformUtils {
  visible: boolean;
  targetCell: null | Cell;
}
// Pawn Transform
export interface PawnTransformProps {
  pawntransformUtils: IPawnTransformUtils;
  initialState: IPawnTransformUtils;
  setPawnTransformUtils: Dispatch<SetStateAction<IPawnTransformUtils>>;
}
