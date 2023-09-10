import { FC } from "react";
import { ICastlingUtils } from "../App";
import { Board } from "../models/Board/Board";
import { Cell } from "../models/Cell/Cell";
import { Color } from "../models/Piece/Piece";
import "./../assets/GameInformation.css";

interface GameInformationProps {
  currentPlayer: Color;
  setHelpers: (helpers: boolean) => void;
  restart: () => void;
  helpers: boolean;
  colorInCheck: Color | null;
  checkMateColor: Color | null;
  staleMateColor: Color | null;
  board: Board;
  passTurn: () => void;
  castlingUtils: ICastlingUtils;
  castlingBtn: boolean;
  makeCastling: (islong: boolean, rook: Cell | null, king: Cell | null) => void;
  checkCastling: () => void;
}

const GameInformation: FC<GameInformationProps> = ({
  currentPlayer,
  setHelpers,
  helpers,
  restart,
  colorInCheck,
  checkMateColor,
  staleMateColor,
  castlingUtils,
  castlingBtn,
  makeCastling,
  checkCastling,
}) => {
  return (
    <div style={{ position: "absolute", top: "25px", right: "25px" }}>
      <label
        // style={{ cursor: "pointer", position: "absolute", top: "25px", left: "25px" }}
        htmlFor="helpers"
      >
        Enable help
        <input
          onChange={() => setHelpers(!helpers)}
          style={{ marginLeft: "5px" }}
          checked={helpers}
          id="helpers"
          type="checkbox"
        ></input>
      </label>
      <div
        // style={{ position: "absolute", top: "50px", left: "25px" }}
        className="player-color"
      >
        {currentPlayer === Color.WHITE ? "White turn" : "Black turn"}
      </div>
      <button onClick={() => restart()}>RESET GAME</button>
      <button hidden={!castlingBtn} onClick={() => checkCastling()}>
        CASTLING
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

      {colorInCheck === Color.WHITE && !checkMateColor && <div>White In Check</div>}
      {colorInCheck === Color.BLACK && !checkMateColor && <div>Black In Check</div>}
      {checkMateColor === Color.WHITE && <div>White Lose</div>}
      {checkMateColor === Color.BLACK && <div>Black Lose</div>}
      {staleMateColor === Color.WHITE && <div>Stalemate to White</div>}
      {staleMateColor === Color.BLACK && <div>Stalemate to Black</div>}
    </div>
  );
};

export default GameInformation;

