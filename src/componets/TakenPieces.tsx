import { FC } from "react";
import { Color } from "../models/Piece/types";
import useMainStore from "../store/main";
import { Piece } from "../models/Piece/Piece";

interface TakenPiecesProps {
  color: Color;
}

const TakenPieces: FC<TakenPiecesProps> = ({ color }) => {
  const { takenPieces } = useMainStore();
  const colorStyle = color === Color.WHITE ? "white" : "black";
  return (
    <div style={{ background: "#ebccae" }}>
      {color} pieces:
      {takenPieces.map((p: Piece) => {
        if (p?.color === color) {
          return (
            <div key={p.id} style={{ color: colorStyle }}>
              {p.icon}
            </div>
          );
        }
      })}
    </div>
  );
};

export default TakenPieces;
