import React, { FC } from "react";
import { Cell } from "../models/Cell/Cell";
import { Piece, PieceNames } from "../models/Piece/Piece";
import { King } from "../models/Piece/King";

interface CellProps {
  clickHandler: (cell: Cell) => void;
  cell: Cell;
  selected: boolean | undefined;
  selectedCell: Cell | null;
  enableHelpers: boolean;
}

const CellComponent: FC<CellProps> = ({ clickHandler, cell, selected, selectedCell, enableHelpers }) => {
  return (
    <>
      <div
        onClick={() => clickHandler(cell)}
        className={`cell 
                ${cell.color === 1 ? "dark" : "light"} 
                ${cell.piece?.color === 1 ? "black-piece" : "light-piece"} 
                ${selected ? "active" : null}
                `}
      >
        {enableHelpers && (
          <div
            className={`highlight 
                ${cell.piece && cell.availableToMove ? "piece" : null}
                ${
                  selectedCell?.piece?.name === PieceNames.KING &&
                  !cell.piece &&
                  selectedCell.piece.canMove(cell) &&
                  !cell.availableToMove
                    ? "underAttack"
                    : null
                } 
                  `}
          ></div>
        )}
        <div className={`highlight ${!cell.piece && cell.availableToMove ? "empty" : null}`}></div>
        {cell.piece?.icon}
      </div>
    </>
  );
};

// =================================добавить функцию вкл\выкл подсказки
export default CellComponent;
