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

const initialState: ICastlingUtils = {
  king: null,
  leftRook: null,
  rightRook: null,
  longCastling: false,
  shortCastling: false,
  kingFirstStep: true,
};

const CastlingComponent: FC = () => {
  const { board, setSelectedCell } = useBoardStore();
  const { passTurn, currentPlayer } = usePlayerStore();
  const { castling, colorInCheck } = useGameStore();
  const { setGameCondition, gameCondition } = useMainStore();
  const [castlingUtils, setCastlingUtils] = useState<ICastlingUtils>(initialState);
  const [castlingBtn, setCastlingBtn] = useState(true);

  const checkCastling = () => {
    if (gameCondition === "Castling unavailable") return;

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
      setCastlingUtils({ ...castlingUtils, king, leftRook, rightRook, longCastling, shortCastling });
      setSelectedCell(king);
    } else {
      setGameCondition("Castling unavailable");
    }
  };
  const makeCastling = (islong: boolean, rook: Cell | null, king: Cell | null) => {
    castling.makeCastlingMoves(board, king!, rook!, islong);
    passTurn();
    setSelectedCell(null);
    setCastlingUtils(initialState);
    setCastlingBtn(true);
  };

  const { leftRook, rightRook, shortCastling, longCastling } = castlingUtils;
  return (
    <>
      {castlingBtn && (
        <button title="Castling" onClick={() => checkCastling()}>
          <img style={{ width: 25 }} src={castlingIcon} alt="Castling" />
        </button>
      )}
      {longCastling && leftRook && (
        <button
          title="Long castlig"
          onClick={() => makeCastling(true, castlingUtils.leftRook, castlingUtils.king)}
        >
          <img style={{ width: 25 }} src={castlingIcon} alt="Castling" />
        </button>
      )}
      {shortCastling && rightRook && (
        <button
          title="Short castlig"
          onClick={() => makeCastling(false, castlingUtils.rightRook, castlingUtils.king)}
        >
          <img style={{ width: 25 }} src={castlingIcon} alt="Castling" />
        </button>
      )}
    </>
  );
};

export default CastlingComponent;
