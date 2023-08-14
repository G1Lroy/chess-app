import React, { FC, useEffect, useState } from "react";
import { Cell } from "../models/Cell/Cell";
import CellComponent from "./CellComponent";
import { Board } from "../models/Board/Board";
import { rankCoordinates } from "../coordinatesNames/rankCoordinates";
import { BoardRenderer } from "../models/Board/BoardRenderer";
import { KingMovesChecker } from "../models/Utils/KingMovesChecker";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  boardRenderer: BoardRenderer;
  passTurn: () => void;
  currentPlayer: number;
  helpers: boolean;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  boardRenderer,
  passTurn,
  currentPlayer,
  helpers,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const clickHandler = (cell: Cell) => {
    // if (cell.piece && cell.piece.color === currentPlayer) {
    //   setSelectedCell(cell);
    // }
    if (cell.piece) {
      setSelectedCell(cell);
    }
    if (cell.availableToMove && selectedCell && selectedCell !== cell) {
      selectedCell.movePiece(cell);
      setSelectedCell(null);
      // passTurn();

    }
  };

  useEffect(() => {
    update();
  }, [selectedCell]);

  const update = () => {
    boardRenderer.renderCells(selectedCell, board);
    
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
      {board.cellsGrid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          <span className="files">{8 - rowIndex}</span>
          {row.map((cell, cellIndex) => (
            <CellComponent
              key={cellIndex}
              cell={cell}
              clickHandler={clickHandler}
              selected={selectedCell?.equals(cell.x, cell.y)}
              selectedCell={selectedCell}
              enableHelpers={helpers}
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
