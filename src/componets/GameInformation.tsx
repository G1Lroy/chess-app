import { FC, useState } from "react";
import { Cell } from "../models/Cell/Cell";
import { Color } from "../models/Piece/types";
import "./../assets/styles/GameInformation.css";
//@ts-ignore
import castlingIcon from "./../assets/images/castling.svg";
import useBoardStore from "../store/board";
import { PiecesUtils } from "../models/Utils/PiecesUtils";
import useGameStore from "../store/game";
import useMainStore from "../store/main";
import usePlayerStore from "../store/player";
import { ICastlingUtils } from "./types";

const initialState: ICastlingUtils = {
  king: null,
  leftRook: null,
  rightRook: null,
  longCastling: false,
  shortCastling: false,
  kingFirstStep: true,
};

const GameInformation: FC = () => {
  const { board, setSelectedCell } = useBoardStore();
  const { passTurn, currentPlayer } = usePlayerStore();
  const { castling, colorInCheck, colorInCheckMate, colorInStaleMate } = useGameStore();
  const { helpers, toggleHelpers, restart } = useMainStore();

  const [castlingUtils, setCastlingUtils] = useState<ICastlingUtils>(initialState);
  const [castlingBtn, setCastlingBtn] = useState(true);

  const checkCastling = () => {
    const king = PiecesUtils.findKing(board, currentPlayer);
    const [leftRook, rightRook] = castling.findRooks(board, currentPlayer);
    const longCastling = castling.isCellsAvailableToCastling(board, currentPlayer, true, king!);
    const shortCastling = castling.isCellsAvailableToCastling(board, currentPlayer, false, king!);

    const canCastle =
      king?.piece?.isFirstStep &&
      !colorInCheckMate &&
      ((leftRook && longCastling) || (rightRook && shortCastling));

    if (canCastle) {
      setCastlingBtn(false);
      setCastlingUtils({ ...castlingUtils, king, leftRook, rightRook, longCastling, shortCastling });
      setSelectedCell(king);
    } else {
      console.log("castling unavailable");
    }
  };
  const makeCastling = (islong: boolean, rook: Cell | null, king: Cell | null) => {
    castling.makeCastlingMoves(board, king!, rook!, islong);
    passTurn();
    setSelectedCell(null);
    setCastlingUtils(initialState);
    setCastlingBtn(true);
  };
 
  return (
    <div style={{ position: "absolute", top: "25px", right: "25px" }}>
      <label htmlFor="helpers">
        Enable help
        <input
          onChange={() => toggleHelpers(!helpers)}
          style={{ marginLeft: "5px" }}
          checked={helpers}
          id="helpers"
          type="checkbox"
        ></input>
      </label>
      <div className="player-color">{currentPlayer === Color.WHITE ? "White turn" : "Black turn"}</div>
      <button onClick={() => restart()}>RESET GAME</button>
      <button title="Castling" hidden={!castlingBtn} onClick={() => checkCastling()}>
        <img style={{ width: 25 }} src={castlingIcon} alt="Castling" />
      </button>
      {castlingUtils.longCastling && castlingUtils.leftRook && (
        <button onClick={() => makeCastling(true, castlingUtils.leftRook, castlingUtils.king)}>
          long CASTLING
        </button>
      )}
      {castlingUtils.shortCastling && castlingUtils.rightRook && (
        <button onClick={() => makeCastling(false, castlingUtils.rightRook, castlingUtils.king)}>
          short CASTLING
        </button>
      )}

      {colorInCheck === Color.WHITE && !colorInCheckMate && <div>White In Check</div>}
      {colorInCheck === Color.BLACK && !colorInCheckMate && <div>Black In Check</div>}
      {colorInCheckMate === Color.WHITE && <div>White Lose</div>}
      {colorInCheckMate === Color.BLACK && <div>Black Lose</div>}
      {colorInStaleMate === Color.WHITE && <div>Stalemate to White</div>}
      {colorInStaleMate === Color.BLACK && <div>Stalemate to Black</div>}
    </div>
  );
};

export default GameInformation;
