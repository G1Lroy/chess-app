import { FC, useState } from "react";
import "./../assets/styles/GameInformation.css";
import useMainStore from "../store/main";
import GameStates from "./UI/GameStates";
import Helpers from "./UI/Helpers";
import CastlingComponent from "./CastlingComponent";
import { Color } from "../models/Piece/types";
import TakenPieces from "./TakenPieces";
import useBoardStore from "../store/board";
//@ts-ignore
import validateFEN from "fen-validator";

const GameInformation: FC = () => {
  const { restart } = useMainStore();
  const { startGameFromFen } = useBoardStore();
  const [fenText, setFentext] = useState("");

  const formSubmit = (e: any) => {
    e.preventDefault();
    if (validateFEN(fenText)) {
      startGameFromFen(fenText);
      setFentext("");
    } else {
      console.log("invalid FEN");
    }
    // "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1";
  };

  return (
    <div style={{ position: "absolute", top: "25px", right: "25px" }}>
      <button onClick={() => restart()}>RESET GAME</button>
      <GameStates />
      <Helpers />
      <CastlingComponent />
      <TakenPieces color={Color.WHITE} />
      <TakenPieces color={Color.BLACK} />
      <form onSubmit={(e) => formSubmit(e)}>
        <input
          value={fenText}
          onChange={(e) => setFentext(e.target.value)}
          type="text"
          placeholder="set FEN notation"
        ></input>
        <button onClick={() => setFentext("")} type="button">
          X
        </button>
        <button type="submit">START FROM FEN</button>
      </form>
    </div>
  );
};

export default GameInformation;
