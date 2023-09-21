import { FC } from "react";
import usePlayerStore from "../store/player";
import { Color, PieceIcons, PieceNames } from "../models/Piece/types";
import { pieces } from "../mockObjects/pieceForTransform";
import { PawnTransformProps } from "./types";
import useGameStore from "../store/game";
import useBoardStore from "../store/board";
import useMainStore from "../store/main";
import "./../assets/styles/PawnTransform.css";

const PawnTransform: FC<PawnTransformProps> = ({
  pawntransformUtils,
  setPawnTransformUtils,
  initialState,
}) => {
  const { currentPlayer, passTurn } = usePlayerStore();
  const { pawnUtils, validateCheck } = useGameStore();
  const { selectedCell, update } = useBoardStore();
  const { setTakenPieces } = useMainStore();

  const pawnTransform = (piece: { name: PieceNames; icon: PieceIcons }) => {
    setTakenPieces(pawntransformUtils!.targetCell!.piece!);
    pawnUtils.transform(selectedCell!, pawntransformUtils.targetCell!, piece.name, currentPlayer);
    update();
    validateCheck();
    passTurn();
    setPawnTransformUtils(initialState);
  };

  if (!pawntransformUtils.visible) return null;

  return (
    <div
      className="chose-piece-container"
      style={{
        top: currentPlayer === Color.WHITE ? 20 : "auto",
        bottom: currentPlayer === Color.BLACK ? 20 : "auto",
      }}
    >
      {pieces.map((piece) => (
        <div key={piece.name} onClick={() => pawnTransform(piece)}>
          {piece.icon}
        </div>
      ))}
    </div>
  );
};

export default PawnTransform;
