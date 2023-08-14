import "./App.css";
import BoardComponent from "./componets/BoardComponent";
import { Board } from "./models/Board/Board";
import { useEffect, useState } from "react";
import { BoardRenderer } from "./models/Board/BoardRenderer";
import { Color } from "./models/Piece/Piece";
import GameInformation from "./componets/GameInformation";

function App() {
  const [board, setBoard] = useState(new Board());
  const [currerntPlayer, setCurrentPlayer] = useState(Color.WHITE);
  const [helpers, setHelpers] = useState(true);
  const boardRenderer = new BoardRenderer();

  function restart() {
    const newBoard = new Board();
    newBoard.constructBoard();
    newBoard.defaultPieceSetup();
    setBoard(newBoard);
    setCurrentPlayer(Color.WHITE);
  }
  useEffect(() => {
    restart();
  }, []);

  const passTurn = () => {
    setCurrentPlayer(currerntPlayer === Color.WHITE ? Color.BLACK : Color.WHITE);
  };

  return (
    <div className="App">
      <BoardComponent
        currentPlayer={currerntPlayer}
        passTurn={passTurn}
        board={board}
        setBoard={setBoard}
        boardRenderer={boardRenderer}
        helpers={helpers}
      />
      <GameInformation
        restart={restart}
        setHelpers={setHelpers}
        helpers={helpers}
        currentPlayer={currerntPlayer}
      />
    </div>
  );
}

export default App;

// добавить шейк всех вигур перед игрой
// добавить возможность стартовать и FEN нотации
