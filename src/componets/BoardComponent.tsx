import { FC, useEffect, useState } from "react";
import { Cell } from "../models/Cell/Cell";
import CellComponent from "./CellComponent";
import { rankCoordinates } from "../mockObjects/rankCoordinates";
import { Color, PieceIcons, PieceNames } from "../models/Piece/types";
import { opposite } from "../helpers/getOppositeColor";
import { pieces } from "../mockObjects/pieceForTransform";
import "./../assets/styles/Board.css";
import useBoardStore from "../store/board";
import usePlayerStore from "../store/player";
import useGameStore from "../store/game";
import { IChosePieceState } from "./types";

const BoardComponent: FC = () => {
  const { boardRenderer, board, selectedCell, setSelectedCell } = useBoardStore();
  const { currentPlayer, passTurn } = usePlayerStore();
  const { pawnPassant, colorInCheck, check, pawnUtils, validateCheck, validateCheckMate, validateStaleMate } =
    useGameStore();

  const update = () => {
    boardRenderer.renderCells(selectedCell, board, currentPlayer);
    // setBoard(board.clone());
  };
  const [firstRender, setFirstRender] = useState(true);
  const initialState: IChosePieceState = { visible: false, targetCell: null };
  const [chosePiece, setChosePiece] = useState<IChosePieceState>(initialState);
  const [passantAvailable, setPassantAvailable] = useState(false);

  const clickHandler = (cell: Cell) => {
    // выбор фигуры
    if (currentPlayer === cell?.piece?.color) {
      setSelectedCell(cell);
      // Проверка взятия на проходе
      const canPassant = pawnPassant.canPassant(currentPlayer, cell, board);
      if (canPassant) {
        setPassantAvailable(true);
        pawnPassant.makePassantAvailable(board, currentPlayer);
      }
    }
    // ход фигуры
    if (cell.availableToMove && selectedCell !== cell) {
      // запрет брать короля
      if (cell.piece?.name === PieceNames.KING) return;
      // Реализация взятия на проходе
      if (cell.availableToPassant) pawnPassant.getPawnByPassant(cell, selectedCell!, board);
      // проверка для превращения пешки
      if (!colorInCheck && pawnUtils.isPawnOnLastLine(currentPlayer, selectedCell!, cell))
        setChosePiece({ ...chosePiece, visible: true, targetCell: cell });
      // проверка шаха
      else isCheck(cell);
      // обнуление клеток для взятия на проходе
      if (passantAvailable) pawnPassant.resetPassantCells(board);
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
    const isCheckOnClone = check.isCheckOnClone(
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
    if (!firstRender) {
      if (colorInCheck) validateCheckMate();
      else validateStaleMate();
    }
    setFirstRender(false);
  }, [currentPlayer]);

  useEffect(() => {
    update();
    setChosePiece(initialState);
  }, [selectedCell]);
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setSelectedCell(null);
        pawnPassant.resetPassantCells(board);
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
          {pieces.map((piece) => (
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
