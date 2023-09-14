import React, { FC } from "react";
import { Cell } from "../models/Cell/Cell";
import { Color, PieceNames } from "../models/Piece/Piece";
import useBoardStore from "../store/board";

interface CellProps {
  clickHandler: (cell: Cell) => void;
  cell: Cell;
  selected: boolean | undefined;
}

const CellComponent: FC<CellProps> = ({ clickHandler, cell, selected }) => {
  const { helpers, colorInCheck, selectedCell } = useBoardStore();
  return (
    <div
      onClick={() => clickHandler(cell)}
      className={`cell 
                ${cell.color === Color.BLACK ? "dark" : "light"} 
                ${cell.piece?.color === Color.BLACK ? "black-piece" : "light-piece"} 
                ${selected ? "active" : ""}`}
    >
      {cell.piece?.name === PieceNames.KING && cell.piece.color === colorInCheck && (
        <div hidden={!helpers} className="highlight king"></div>
      )}
      {cell.availableToMove && cell.piece && cell.piece?.name !== PieceNames.KING && (
        <div hidden={!helpers} className="highlight piece"></div>
      )}
      {!cell.piece && cell.availableToMove && <div className="highlight empty"></div>}
      {cell.availableToPassant && <div className="highlight passant"></div>}

      {selectedCell?.piece?.name === PieceNames.KING &&
        cell.availableToAttack &&
        selectedCell.piece?.canMove(cell) &&
        !cell.piece && (
          <div hidden={!helpers} className="highlight underAttack">
            💥
          </div>
        )}
      {cell.piece?.icon}
    </div>
  );
};

export default CellComponent;
