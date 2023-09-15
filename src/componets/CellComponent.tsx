import React, { FC } from "react";
import { Color, PieceNames } from "../models/Piece/types";
import useBoardStore from "../store/board";
import useGameStore from "../store/game";
import useMainStore from "../store/main";
import { CellProps } from "./types";

const CellComponent: FC<CellProps> = ({ clickHandler, cell, selected }) => {
  const { selectedCell } = useBoardStore();
  const { colorInCheck } = useGameStore();
  const { helpers } = useMainStore();
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
