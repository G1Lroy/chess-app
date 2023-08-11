import React, { FC } from "react";
import { Cell } from "../models/Cell/Cell";
import { PieceNames } from "../models/Piece/Piece";

interface CellProps {
  clickHandler: (cell: Cell) => void;
  cell: Cell;
  selected: boolean | undefined;
  selectedCell: Cell | null;
  enableHelpers: boolean;
}

const CellComponent: FC<CellProps> = ({ clickHandler, cell, selected, selectedCell, enableHelpers }) => {
  return (
    <div
      onClick={() => clickHandler(cell)}
      className={`cell 
                ${cell.color === 1 ? "dark" : "light"} 
                ${cell.piece?.color === 1 ? "black-piece" : "light-piece"} 
                ${selected ? "active" : ""}`}
    >
      {cell.availableToMove && cell.piece && <div hidden={!enableHelpers} className="highlight piece"></div>}
      {!cell.piece && cell.availableToMove && <div className="highlight empty"></div>}

      {selectedCell?.piece?.name === PieceNames.KING &&
        cell.availableToAttack &&
        selectedCell.piece?.canMove(cell) &&
        !cell.piece && (
          <div hidden={!enableHelpers} className="highlight underAttack">
            💥
          </div>
        )}
      {cell.piece?.icon}
    </div>
  );
};

export default CellComponent;
