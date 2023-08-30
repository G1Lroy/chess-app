import "./App.css";
import BoardComponent from "./componets/BoardComponent";
import { Board } from "./models/Board/Board";
import { useEffect, useState } from "react";
import { BoardRenderer } from "./models/Board/BoardRenderer";
import { Color } from "./models/Piece/Piece";
import GameInformation from "./componets/GameInformation";
import { GameStateCheck } from "./models/Game/GameStateCheck";

function App() {
  const [board, setBoard] = useState(new Board());
  const [currerntPlayer, setCurrentPlayer] = useState(Color.WHITE);
  const [helpers, setHelpers] = useState(true);
  const [check, setCheck] = useState<Color | null>(null);
  const boardRenderer = new BoardRenderer();
  const gameStateCheck = new GameStateCheck();

  function restart() {
    const newBoard = new Board();
    newBoard.constructBoard();
    newBoard.defaultPieceSetup();
    setBoard(newBoard);
    setCurrentPlayer(Color.WHITE);
    setCheck(null);
  }
  useEffect(() => {
    restart();
  }, []);

  const passTurn = () => setCurrentPlayer(currerntPlayer === Color.WHITE ? Color.BLACK : Color.WHITE);
  const checkGameCondition = () => setCheck(gameStateCheck.getColorInCheck(board, currerntPlayer));

  return (
    <div className="App">
      <BoardComponent
        currentPlayer={currerntPlayer}
        passTurn={passTurn}
        board={board}
        setBoard={setBoard}
        boardRenderer={boardRenderer}
        helpers={helpers}
        checkGameCondition={checkGameCondition}
        check={check}
        gameStateCheck={gameStateCheck}
      />
      <GameInformation
        restart={restart}
        setHelpers={setHelpers}
        helpers={helpers}
        currentPlayer={currerntPlayer}
        check={check}
      />
    </div>
  );
}

export default App;

// добавить шейк всех вигур перед игрой
// добавить возможность стартовать и FEN нотации
