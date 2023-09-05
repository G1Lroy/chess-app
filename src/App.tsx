import "./App.css";
import BoardComponent from "./componets/BoardComponent";
import { Board } from "./models/Board/Board";
import { useEffect, useState } from "react";
import { BoardRenderer } from "./models/Board/BoardRenderer";
import GameInformation from "./componets/GameInformation";
import { GameStateCheck } from "./models/Game/GameStateCheck";
import { GameStateCheckMate } from "./models/Game/GameStateCheckMate";
import { Color } from "./models/Piece/Piece";
import { opposite } from "./helpers/getOppositeColor";

function App() {
  const [board, setBoard] = useState(new Board());
  const [currentPlayer, setCurrentPlayer] = useState(Color.WHITE);
  const [helpers, setHelpers] = useState(true);
  const [colorInCheck, setColorInCheck] = useState<Color | null>(null);
  const [checkMateColor, setCheckMateColor] = useState<Color | null>(null);
  const boardRenderer = new BoardRenderer();
  const gameStateCheck = new GameStateCheck();
  const gameStateCheckMate = new GameStateCheckMate();

  function restart() {
    const newBoard = new Board();
    newBoard.constructBoard();
    newBoard.defaultPieceSetup();
    setBoard(newBoard);
    setCurrentPlayer(Color.WHITE);
    setColorInCheck(null);
    setCheckMateColor(null);
  }
  useEffect(() => {
    restart();
  }, []);

  const passTurn = () => {
    setCurrentPlayer(opposite(currentPlayer));
  };
  const checkGameCondition = () => {
    setColorInCheck(gameStateCheck.getColorInCheck(board, currentPlayer, opposite(currentPlayer)));
  };
  const validateCheckMate = () => {
    setCheckMateColor(gameStateCheckMate.isCheckMate(board, currentPlayer, opposite(currentPlayer)));
  };

  useEffect(() => {
    if (colorInCheck) {
      validateCheckMate();
    }
  }, [currentPlayer]);
  return (
    <div className="App">
      <BoardComponent
        currentPlayer={currentPlayer}
        passTurn={passTurn}
        board={board}
        setBoard={setBoard}
        boardRenderer={boardRenderer}
        helpers={helpers}
        checkGameCondition={checkGameCondition}
        colorInCheck={colorInCheck}
        gameStateCheck={gameStateCheck}
        validateCheckMate={validateCheckMate}
      />
      <GameInformation
        restart={restart}
        setHelpers={setHelpers}
        helpers={helpers}
        currentPlayer={currentPlayer}
        colorInCheck={colorInCheck}
        checkMateColor={checkMateColor}
      />
    </div>
  );
}

export default App;
// добавить метод найти короля
// добавить метод найти фигуры по цвету
// добавить шейк всех вигур перед игрой
// добавить возможность стартовать и FEN нотации
