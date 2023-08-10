import "./App.css";
import BoardComponent from "./componets/BoardComponent";
import { Board } from "./models/Board/Board";
import { useEffect, useState } from "react";

function App() {
  const [board, setBoard] = useState(new Board());

  function restart() {
    const newBoard = new Board();
    newBoard.constructBoard();
    newBoard.defaultPieceSetup();
    setBoard(newBoard);
  }

  useEffect(() => {
    restart();
  }, []);

  return (
    <div className="App">
      <BoardComponent board={board} setBoard={setBoard} />
    </div>
  );
}

export default App;

// добавить шейк всех вигур перед игрой
// добавить возможность стартовать и FEN нотации 
