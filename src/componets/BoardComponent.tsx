import React, { FC, useContext, useEffect, useState } from "react";
import { Cell } from "../models/Cell/Cell";
import CellComponent from "./CellComponent";
import { Board } from "../models/Board/Board";
import { rankCoordinates } from "../mockObjects/rankCoordinates";
import { BoardRenderer } from "../models/Board/BoardRenderer";
import { Color, Piece, PieceIcons, PieceNames } from "../models/Piece/Piece";
import { GameStateCheck } from "../models/Game/GameStateCheck";
import { opposite } from "../helpers/getOppositeColor";
import { useCellContext } from "../context";
import { PawnTransform } from "../models/Game/PawnTransform";
import { Queen } from "../models/Piece/Queen";
import { pieces } from "../mockObjects/pieceForTransform";
import "./../assets/styles/Board.css";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  boardRenderer: BoardRenderer;
  passTurn: () => void;
  currentPlayer: Color;
  helpers: boolean;
  validateCheck: () => void;
  colorInCheck: Color | null;
  gameStateCheck: GameStateCheck;
  validateCheckMate: () => void;
}
interface IState {
  visible: boolean;
  targetCell: null | Cell;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  boardRenderer,
  passTurn,
  currentPlayer,
  helpers,
  validateCheck,
  colorInCheck,
  gameStateCheck,
}) => {
  const update = () => {
    boardRenderer.renderCells(selectedCell, board, currentPlayer);
    setBoard(board.clone());
  };
  const initialState = { visible: false, targetCell: null };
  const piecesForTransform = pieces;
  const [chosePiece, setChosePiece] = useState<IState>(initialState);
  const { selectedCell, setSelectedCell } = useCellContext();
  const pawnUtils = new PawnTransform();

  const clickHandler = (cell: Cell) => {
    if (currentPlayer === cell?.piece?.color) setSelectedCell(cell);
    if (cell.availableToMove && selectedCell !== cell) {
      if (cell.piece?.name === PieceNames.KING) return;
      if (!colorInCheck && pawnUtils.isPawnOnLastLine(currentPlayer, selectedCell!, cell)) {
        setChosePiece({ ...chosePiece, visible: true, targetCell: cell });
      } else isCheck(cell);
    }
  };
  const pawnTransform = (piece: { name: PieceNames; icon: PieceIcons }) => {
    pawnUtils.transform(selectedCell!, chosePiece.targetCell!, piece.name, currentPlayer);
    update();
    validateCheck();
    passTurn();
    setChosePiece(initialState);
  };
  const isCheck = (cell: Cell) => {
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
      validateCheck();
      passTurn();
      setSelectedCell(null);
    }
  };
  useEffect(() => {
    update();
    setChosePiece(initialState);
  }, [selectedCell]);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setSelectedCell(null);
      }}
      className="board"
    >
      {chosePiece.visible && (
        <div
          className="chose-piece-container"
          style={{
            top: currentPlayer === Color.WHITE ? 20 : "auto",
            bottom: currentPlayer === Color.BLACK ? 20 : "auto",
          }}
        >
          {piecesForTransform.map((piece) => (
            <div key={piece.name} onClick={() => pawnTransform(piece)}>
              {piece.icon}
            </div>
          ))}
        </div>
      )}
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
    </div>
  );
};

export default BoardComponent;
