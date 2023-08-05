import React, { FC, useEffect, useState } from "react";
import { Cell } from "../models/Cell/Cell";
import CellComponent from "./CellComponent";
import { Board } from "../models/Board/Board";
import { rankCoordinates } from "../helpers/rankCoordinates";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const clickHandler = (cell: Cell) => {
    if (cell.piece) {
      setSelectedCell(cell);
    }
    if (selectedCell && selectedCell !== cell && selectedCell.piece?.canMove(cell)) {
      selectedCell.movePiece(cell);
      setSelectedCell(null);
    }
  };

  useEffect(() => {
    update();
  }, [selectedCell]);

  const update = () => {
    board.highlightCells(selectedCell);
    setBoard(board.clone());
  };
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setSelectedCell(null);
      }}
      className="board"
    >
      {board.cells.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          <span className="files">{8 - rowIndex}</span>
          {row.map((cell, cellIndex) => (
            <CellComponent
              key={cellIndex}
              cell={cell}
              clickHandler={clickHandler}
              selected={selectedCell?.equals(cell.x, cell.y)}
            />
          ))}
        </div>
      ))}
      <div className="ranks">
        {rankCoordinates.map((rank) => (
          <span key={rank}>{rank}</span>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;
