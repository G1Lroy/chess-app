import { FC, useState } from "react";
import useBoardStore from "../../store/board";
import useMainStore from "../../store/main";
//@ts-ignore
import validateFEN from "fen-validator";
import "./../../assets/styles/Fen.css";

const FenInput: FC = () => {
  const { startGameFromFen } = useBoardStore();
  const { setGameCondition } = useMainStore();
  const [fenText, setFentext] = useState("");

  const formSubmit = (e: any) => {
    e.preventDefault();
    if (validateFEN(fenText)) {
      startGameFromFen(fenText);
      setFentext("");
    } else {
      setGameCondition("invalid FEN char");
      setTimeout(() => setGameCondition(""), 3000);
    }
    // "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1";
  };
  return (
    <form className="fen-form" onSubmit={(e) => formSubmit(e)}>
      <input
        value={fenText}
        onChange={(e) => setFentext(e.target.value)}
        type="text"
        placeholder="set FEN notation"
      ></input>
      <button type="submit">Start</button>
      <button onClick={() => setFentext("")} type="button">
        X
      </button>
    </form>
  );
};

export default FenInput;
