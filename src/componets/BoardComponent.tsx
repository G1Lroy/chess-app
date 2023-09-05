import React, { FC, useEffect, useState } from "react";
import { Cell } from "../models/Cell/Cell";
import CellComponent from "./CellComponent";
import { Board } from "../models/Board/Board";
import { rankCoordinates } from "../coordinatesNames/rankCoordinates";
import { BoardRenderer } from "../models/Board/BoardRenderer";
import { Color, PieceNames } from "../models/Piece/Piece";
import { GameStateCheck } from "../models/Game/GameStateCheck";
import { GameStateCheckMate } from "../models/Game/GameStateCheckMate";
import { opposite } from "../helpers/getOppositeColor";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  boardRenderer: BoardRenderer;
  passTurn: () => void;
  currentPlayer: Color;
  helpers: boolean;
  checkGameCondition: () => void;
  colorInCheck: Color | null;
  gameStateCheck: GameStateCheck;
  validateCheckMate: () => void;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  boardRenderer,
  passTurn,
  currentPlayer,
  helpers,
  checkGameCondition,
  colorInCheck,
  gameStateCheck,
  validateCheckMate,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const clickHandler = (cell: Cell) => {
    if (currentPlayer === cell?.piece?.color) setSelectedCell(cell);
    if (cell.availableToMove && selectedCell !== cell) {
      if (cell.piece?.name === PieceNames.KING) return;
      validateCheck(cell);
    }
  };

  useEffect(() => {
    update();
  }, [selectedCell]);

  const update = () => {
    boardRenderer.renderCells(selectedCell, board, currentPlayer);
    setBoard(board.clone());
  };
  const validateCheck = (cell: Cell) => {
    const isCheckOnClone = gameStateCheck.isCheckOnClone(
      selectedCell as Cell,
      board,
      cell,
      currentPlayer,
      opposite(currentPlayer)
    );
    if (isCheckOnClone) {
      const message = colorInCheck ? "protect your king" : "invalid move, KING must be protected";
      console.log(message);
    } else {
      selectedCell?.movePiece(cell);
      checkGameCondition();
      passTurn();
      setSelectedCell(null);
    }
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
              colorInCheck={colorInCheck}
            />
          ))}
        </div>
      ))}
      <div className="ranks">
        {rankCoordinates.map((rank) => (
          <span key={rank}>{rank}</span>
        ))}
      </div>
      <div>{}</div>
    </div>
  );
};

export default BoardComponent;
