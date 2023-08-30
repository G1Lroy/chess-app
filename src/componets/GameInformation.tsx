import React, { FC, useState } from "react";
import { Color } from "../models/Piece/Piece";

interface GameInformationProps {
  currentPlayer: Color;
  setHelpers: (helpers: boolean) => void;
  restart: () => void;
  helpers: boolean;
  check: Color | null;
}

const GameInformation: FC<GameInformationProps> = ({
  currentPlayer,
  setHelpers,
  helpers,
  restart,
  check,
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
      <div hidden={check === null}>{check === Color.WHITE ? "White check" : "Black check"} </div>
    </div>
  );
};

export default GameInformation;
