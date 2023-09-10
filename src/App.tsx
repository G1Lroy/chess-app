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
import { GameStateStaleMate } from "./models/Game/GameStateStaleMate";
import { useCellContext } from "./context";
import { Castling } from "./models/Game/Castling";
import { Cell } from "./models/Cell/Cell";
import { PiecesUtils } from "./models/Utils/PiecesUtils";

export interface ICastlingUtils {
  king: Cell | null;
  leftRook: Cell | null;
  rightRook: Cell | null;
  longCastling: boolean;
  shortCastling: boolean;
  kingFirstStep: boolean;
}

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
  const { setSelectedCell } = useCellContext();
  const initialState = {
    king: null,
    leftRook: null,
    rightRook: null,
    longCastling: false,
    shortCastling: false,
    kingFirstStep: true,
  };
  const casltling = new Castling();
  const [castlingUtils, setCastlingUtils] = useState<ICastlingUtils>(initialState);
  const [castlingBtn, setCastlingBtn] = useState(true);

  function restart() {
    const newBoard = new Board();
    newBoard.constructBoard();
    newBoard.defaultPieceSetup();
    setBoard(newBoard);
    setCurrentPlayer(Color.WHITE);
    setColorInCheck(null);
    setCheckMateColor(null);
    setStaleMateColor(null);
    setSelectedCell(null);
    setCastlingUtils(initialState);
    setCastlingBtn(true)
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
  const checkCastling = () => {
    const king = PiecesUtils.findKing(board, currentPlayer);
    const rooks = casltling.findRooks(board, currentPlayer);
    const leftRook = rooks.find((r) => r.x === 0) || null;
    const rightRook = rooks.find((r) => r.x === 7) || null;
    const longCastling = casltling.isEmptyOrAttacedBetween(board, currentPlayer, true);
    const shortCastling = casltling.isEmptyOrAttacedBetween(board, currentPlayer, false);

    if (
      king?.piece?.isFirstStep &&
      !checkMateColor &&
      ((leftRook && longCastling) || (rightRook && shortCastling))
    ) {
      setCastlingBtn(false);
      setCastlingUtils({ ...castlingUtils, king, leftRook, rightRook, longCastling, shortCastling });
      setSelectedCell(king);
    } else {
      console.log("castling unavailable");
    }
  };
  const makeCastling = (islong: boolean, rook: Cell | null, king: Cell | null) => {
    casltling.makeCastlingMoves(board, king!, rook!, islong);
    passTurn();
    setSelectedCell(null);
  };

  useEffect(() => {
    setCastlingBtn(true);
    setCastlingUtils(initialState);
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
        board={board}
        restart={restart}
        setHelpers={setHelpers}
        helpers={helpers}
        currentPlayer={currentPlayer}
        colorInCheck={colorInCheck}
        checkMateColor={checkMateColor}
        staleMateColor={staleMateColor}
        passTurn={passTurn}
        castlingBtn={castlingBtn}
        castlingUtils={castlingUtils}
        makeCastling={makeCastling}
        checkCastling={checkCastling}
      />
    </div>
  );
}

export default App;

// добавить шейк всех вигур перед игрой
// добавить возможность стартовать и FEN нотации
