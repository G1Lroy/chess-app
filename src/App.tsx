import { ConstructBoard } from "./models/BoardConstruct/ConstructBoard";
import "./App.css";
import { Board } from "./models/Board/Board";
import { Coordinates, fileCoords } from "./models/Piece/Coordinates";
import { Piece } from "./models/Piece/Piece";
import { useEffect, useState } from "react";

function App() {
  const [initBoard, setInitBoard] = useState(new Board());
  const [board, seBoard] = useState(new ConstructBoard().constructBoard(initBoard));
  const [selectedPiece, setSelectedPiece] = useState({} as Piece | undefined | null);
  const [availableCells, setAvailableCells] = useState([] as Coordinates[] | undefined | null);

  const handleClick = (piece: Piece | undefined): void => {
    setSelectedPiece(piece);
    setAvailableCells(piece?.getAvailableCell(initBoard));
  };

  return (
    <div
      className="App"
      onContextMenu={(e) => {
        e.preventDefault();
        setSelectedPiece(null);
        setAvailableCells(null );
      }}
    >
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            <span className="files">{8 - rowIndex}</span>
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`cell ${cell.color === "dark" ? "dark" : "light"}
              ${availableCells?.some((item) => item.equals(cell?.coordinates)) ? "highlight" : ""}
              `}
              >
                <div
                  onClick={() => handleClick(cell.piece)}
                  className={`cell-content ${cell.piece?.color ? "black-piece" : "light-piece"} ${
                    cell.piece && selectedPiece && selectedPiece.coordinates?.equals(cell.piece.coordinates)
                      ? "active"
                      : ""
                  }`}
                >
                  {cell.piece?.icon}
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="ranks">
          {fileCoords.map((file, idx) => (
            <span key={idx}>{file}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

// добавить шейк всех вигур перед игрой
