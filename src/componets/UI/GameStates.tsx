import { FC } from "react";
import useGameStore from "../../store/game";
import Message from "./Message";
import usePlayerStore from "../../store/player";
import useMainStore from "../../store/main";

const GameStates: FC = () => {
  const { colorInCheck, colorInCheckMate, colorInStaleMate } = useGameStore();
  const { currentPlayer } = usePlayerStore();
  const { gameCondition } = useMainStore();
  return (
    <>
      {!colorInCheckMate && (
        <>
          {<Message text={`${currentPlayer} turn`}></Message>}
          {(colorInCheck || gameCondition) && <Message text={gameCondition}></Message>}
          {colorInCheck && <Message text={`${colorInCheck} In Check`} />}
        </>
      )}
      {colorInCheckMate && <Message text={`${colorInCheckMate} Lose`} />}
      {colorInStaleMate && <Message text={`Stalemate to ${colorInStaleMate}`} />}
    </>
  );
};

export default GameStates;
