import { FC, useEffect, useState } from "react";
import { Cell } from "../models/Cell/Cell";
import CellComponent from "./CellComponent";
import { rankCoordinates } from "../mockObjects/rankCoordinates";
import { opposite } from "../helpers/getOppositeColor";
import "./../assets/styles/Board.css";
import useBoardStore from "../store/board";
import usePlayerStore from "../store/player";
import useGameStore from "../store/game";

import PawnTransform from "./PawnTransform";
import useMainStore from "../store/main";
import { King } from "../models/Piece/King";
import { IPawnTransformUtils } from "./types";

const BoardComponent: FC = () => {
  const initialState: IPawnTransformUtils = { visible: false, targetCell: null };
  const { update, board, selectedCell, setSelectedCell } = useBoardStore();
  const { currentPlayer, passTurn } = usePlayerStore();
  const { pawnPassant, colorInCheck, check, pawnUtils, validateCheck, validateCheckMate, validateStaleMate } =
    useGameStore();
  const { setGameCondition } = useMainStore();

  const [pawnTransformUtils, setPawnTransformUtils] = useState<IPawnTransformUtils>(initialState);
  const [passantAvailable, setPassantAvailable] = useState<boolean>(false);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const clickHandler = (cell: Cell) => {
    // выбор фигуры
    if (currentPlayer === cell?.piece?.color) {
      setSelectedCell(cell);
      // Проверка взятия на проходе
      resetPassantCells();
      const canPassant = pawnPassant.canPassant(currentPlayer, cell, board);
      if (canPassant) {
        setPassantAvailable(true);
        pawnPassant.makePassantAvailable(board, currentPlayer, cell);
      }
    }
    // ход фигуры
    if (cell.availableToMove && selectedCell !== cell) {
      // запрет брать короля
      if (cell.piece instanceof King) return;
      // Реализация взятия на проходе
      if (cell.availableToPassant) pawnPassant.getPawnByPassant(cell, selectedCell!, board);
      // проверка для превращения пешки
      if (!colorInCheck && pawnUtils.isPawnOnLastLine(currentPlayer, selectedCell!, cell))
        setPawnTransformUtils({ ...pawnTransformUtils, visible: true, targetCell: cell });
      // проверка шаха
      else isCheck(cell);
      // обнуление клеток для взятия на проходе
      resetPassantCells();
    }
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
      const message = colorInCheck ? "protect your king" : "invalid move, king must be protected";
      setGameCondition(message);
    } else {
      selectedCell?.movePiece(cell);
      validateCheck();
      passTurn();
      setSelectedCell(null);
    }
  };
  const resetPassantCells = () => {
    if (passantAvailable) pawnPassant.resetPassantCells(board);
  };

  useEffect(() => {
    if (!firstRender) {
      if (colorInCheck) validateCheckMate();
      else validateStaleMate();
    }
    setGameCondition("");
    setFirstRender(false);
  }, [currentPlayer]);

  useEffect(() => {
    update();
    setPawnTransformUtils(initialState);
  }, [selectedCell]);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setSelectedCell(null);
        resetPassantCells();
      }}
      className="board"
    >
      <PawnTransform
        pawntransformUtils={pawnTransformUtils}
        initialState={initialState}
        setPawnTransformUtils={setPawnTransformUtils}
      />

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
