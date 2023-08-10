import React, { FC } from "react";
import { Cell } from "../models/Cell/Cell";
import { Piece } from "../models/Piece/Piece";

interface CellProps {
  clickHandler: (cell: Cell) => void;
  cell: Cell;
  selected: boolean | undefined;
}

const CellComponent: FC<CellProps> = ({ clickHandler, cell, selected }) => {
  return (
    <>
      <div
        onClick={() => clickHandler(cell)}
        className={`cell 
                ${cell.color === 1 ? "dark" : "light"} 
                ${cell.piece?.color === 1 ? "black-piece" : "light-piece"} 
                ${selected ? "active" : ""}
                `}
      >
        {
          <div
            className={`highlight 
                 ${!cell.piece && cell.availableToMove ? "empty" : ""}
                  ${cell.piece && cell.availableToMove ? "piece" : ""}
                  `}
          ></div>
        }
        {cell.piece?.icon}
      </div>
    </>
  );
};

export default CellComponent;
