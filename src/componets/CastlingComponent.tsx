import { FC, useState } from "react";
import { Cell } from "../models/Cell/Cell";
import { PiecesUtils } from "../models/Utils/PiecesUtils";
import { ICastlingUtils } from "./types";
//@ts-ignore
import castlingIcon from "./../assets/images/castling.svg";

import useBoardStore from "../store/board";
import usePlayerStore from "../store/player";
import useGameStore from "../store/game";
import useMainStore from "../store/main";
import "./../assets/styles/Castling.css";

const CastlingComponent: FC = () => {
  const { board, setSelectedCell } = useBoardStore();
  const { passTurn, currentPlayer } = usePlayerStore();
  const { castling, colorInCheck, castlingUtils, setCastlingUtils, colorInCheckMate, colorInStaleMate } =
    useGameStore();
  const { setGameCondition, gameCondition, castlingBtn, setCastlingBtn } = useMainStore();

  const checkCastling = (): void => {
    if (gameCondition === "Castling unavailable" || colorInCheckMate || colorInStaleMate) return;

    const king = PiecesUtils.findKing(board, currentPlayer);
    const [leftRook, rightRook] = castling.findRooks(board, currentPlayer);
    const longCastling = castling.isCellsAvailableToCastling(board, currentPlayer, true, king!);
    const shortCastling = castling.isCellsAvailableToCastling(board, currentPlayer, false, king!);

    const canCastle =
      king?.piece?.isFirstStep &&
      !colorInCheck &&
      ((leftRook && longCastling) || (rightRook && shortCastling));

    if (canCastle) {
      setCastlingBtn(false);
      setCastlingUtils({ king, leftRook, rightRook, longCastling, shortCastling } as ICastlingUtils);
      setSelectedCell(king);
    } else {
      setGameCondition("Castling unavailable");
      setTimeout(() => setGameCondition(""), 3000);
    }
  };
  const makeCastling = (islong: boolean, rook: Cell | null, king: Cell | null): void => {
    castling.makeCastlingMoves(board, king!, rook!, islong);
    passTurn();
  };

  const { leftRook, rightRook, shortCastling, longCastling } = castlingUtils;
  return (
    <div className="castling">
      {castlingBtn && (
        <button title="Castling" onClick={() => checkCastling()}>
          <img src={castlingIcon} alt="Castling" />
        </button>
      )}
      {longCastling && leftRook && (
        <button
          title="Long castlig"
          onClick={() => makeCastling(true, castlingUtils.leftRook, castlingUtils.king)}
        >
          ⏪
          <img className="mirrored" src={castlingIcon} alt="Castling" />
        </button>
      )}
      {shortCastling && rightRook && (
        <button
          title="Short castlig"
          onClick={() => makeCastling(false, castlingUtils.rightRook, castlingUtils.king)}
        >
          <img src={castlingIcon} alt="Castling" />⏩
        </button>
      )}
    </div>
  );
};

export default CastlingComponent;
