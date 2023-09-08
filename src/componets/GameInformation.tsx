import React, { FC, useState } from "react";
import { Color, PieceNames } from "../models/Piece/Piece";
import { useCellContext } from "../context";
import { Board } from "../models/Board/Board";
import { PiecesUtils } from "../models/Utils/PiecesUtils";
import { King } from "../models/Piece/King";

interface GameInformationProps {
  currentPlayer: Color;
  setHelpers: (helpers: boolean) => void;
  restart: () => void;
  helpers: boolean;
  colorInCheck: Color | null;
  checkMateColor: Color | null;
  staleMateColor: Color | null;
  board: Board;
}

const GameInformation: FC<GameInformationProps> = ({
  currentPlayer,
  setHelpers,
  helpers,
  restart,
  colorInCheck,
  checkMateColor,
  staleMateColor,
  board,
}) => {
  const { selectedCell, setSelectedCell } = useCellContext();
  const makeCastling = () => {
    const king = PiecesUtils.findKing(board, currentPlayer);
    const rook = PiecesUtils.findPiece(board, currentPlayer, PieceNames.ROOK);

    console.log(rook);
    console.log(king);

    if (king?.piece?.isFirstStep) {
      // setSelectedCell(king);
    } else {
      console.log("King alredy moves");
    }
  };
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
      <button onClick={() => makeCastling()}>CASTLING</button>
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
//
