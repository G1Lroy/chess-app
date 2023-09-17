import { FC } from "react";
import "./../assets/styles/GameInformation.css";
import useMainStore from "../store/main";
import GameStates from "./UI/GameStates";
import Helpers from "./UI/Helpers";
import CastlingComponent from "./CastlingComponent";

const GameInformation: FC = () => {
  const { restart } = useMainStore();

  return (
    <div style={{ position: "absolute", top: "25px", right: "25px" }}>
      <button onClick={() => restart()}>RESET GAME</button>
      <GameStates />
      <Helpers />
      <CastlingComponent />
    </div>
  );
};

export default GameInformation;
