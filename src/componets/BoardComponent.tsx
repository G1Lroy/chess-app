import React, { FC, useEffect, useState } from "react";
import { Cell } from "../models/Cell/Cell";
import CellComponent from "./CellComponent";
import { Board } from "../models/Board/Board";
import { rankCoordinates } from "../coordinatesNames/rankCoordinates";
import { BoardRenderer } from "../models/Board/BoardRenderer";
import { Color, PieceNames } from "../models/Piece/Piece";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  boardRenderer: BoardRenderer;
  passTurn: () => void;
  currentPlayer: number;
  helpers: boolean;
  checkGameCondition: () => any;
  check: Color | null;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  boardRenderer,
  passTurn,
  currentPlayer,
  helpers,
  checkGameCondition,
  check,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const clickHandler = (cell: Cell) => {
    if (cell.piece && currentPlayer === cell?.piece?.color) {
      if (check !== null && cell.piece?.name === PieceNames.KING) setSelectedCell(cell);
      else if (check === null) setSelectedCell(cell);
    }

    if (cell.availableToMove && selectedCell !== cell) {
      if (cell.piece?.name === PieceNames.KING) return;
      selectedCell?.movePiece(cell);
      setSelectedCell(null);
      checkGameCondition();
      passTurn();
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
              check={check}
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
