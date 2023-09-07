import "./App.css";
import BoardComponent from "./componets/BoardComponent";
import { Board } from "./models/Board/Board";
import { useEffect, useState } from "react";
import { BoardRenderer } from "./models/Board/BoardRenderer";
import GameInformation from "./componets/GameInformation";
import { GameStateCheck } from "./models/GameCheckers/GameStateCheck";
import { GameStateCheckMate } from "./models/GameCheckers/GameStateCheckMate";
import { Color } from "./models/Piece/Piece";
import { opposite } from "./helpers/getOppositeColor";
import { GameStateStaleMate } from "./models/GameCheckers/GameStateStaleMate";

function App() {
  const [board, setBoard] = useState(new Board());
  const [currentPlayer, setCurrentPlayer] = useState(Color.WHITE);
  const [helpers, setHelpers] = useState(true);
  const [colorInCheck, setColorInCheck] = useState<Color | null>(null);
  const [checkMateColor, setCheckMateColor] = useState<Color | null>(null);
  const [staleMateColor, setStaleMateColor] = useState<Color | null>(null);
  const [firstRender, setFirstRender] = useState(true);
  const boardRenderer = new BoardRenderer();
  const gameStateCheck = new GameStateCheck();
  const gameStateCheckMate = new GameStateCheckMate();
  const gameStateStaleMate = new GameStateStaleMate();

  function restart() {
    const newBoard = new Board();
    newBoard.constructBoard();
    newBoard.defaultPieceSetup();
    setBoard(newBoard);
    setCurrentPlayer(Color.WHITE);
    setColorInCheck(null);
    setCheckMateColor(null);
    setStaleMateColor(null);
  }
  useEffect(() => {
    restart();
  }, []);

  const passTurn = () => {
    setCurrentPlayer(opposite(currentPlayer));
  };
  const validateCheck = () => {
    setColorInCheck(gameStateCheck.getColorInCheck(board, currentPlayer, opposite(currentPlayer)));
  };
  const validateCheckMate = () => {
    setCheckMateColor(gameStateCheckMate.isCheckMate(board, currentPlayer, opposite(currentPlayer)));
  };
  const validateStaleMate = () => {
    setStaleMateColor(gameStateStaleMate.isStaleMate(board, currentPlayer));
  };
    
  useEffect(() => {
      if (!firstRender) {
        if (colorInCheck) validateCheckMate();
        else validateStaleMate();
      }
      setFirstRender(false);
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
        validateCheck={validateCheck}
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
        staleMateColor={staleMateColor}
      />
    </div>
  );
}

export default App;

// добавить шейк всех вигур перед игрой
// добавить возможность стартовать и FEN нотации
