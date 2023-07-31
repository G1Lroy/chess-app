import { ConstructBoard } from "./models/BoardConstruct/ConstructBoard";
import "./App.css";
import { Board } from "./models/Board/Board";
import { Coordinates, fileCoords } from "./models/Piece/Coordinates";
import { Color, Piece } from "./models/Piece/Piece";
import { useEffect, useState } from "react";
import { Knight } from "./models/Piece/Knight";

function App() {
  const [boardControl, setBoardControl] = useState(new Board());

  const boardArray = new ConstructBoard().constructBoard(boardControl);
  const [board, setBoard] = useState(boardArray);

  const [selectedPiece, setSelectedPiece] = useState({} as Piece | undefined | null);
  const [availableCells, setAvailableCells] = useState([] as Coordinates[] | undefined | null);

  const handleClick = (piece: Piece | undefined, cell: Coordinates): void => {
    if (piece) {
      setSelectedPiece(piece);
      setAvailableCells(piece.getAvailableCell(boardControl));
    } else if (availableCells && selectedPiece) {
      for (const cellCorrd of availableCells) {
        if (cell.equals(cellCorrd)) {
          boardControl.movePiece(selectedPiece.coordinates, cell);
          setSelectedPiece(null);
          setAvailableCells(null);
        }
      }
    }
    return;
  };

  useEffect(() => {
    setBoard(boardArray);
  }, [selectedPiece]);

  return (
    <div
      className="App"
      onContextMenu={(e) => {
        e.preventDefault();
        setSelectedPiece(null);
        setAvailableCells(null);
      }}
    >
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            <span className="files">{8 - rowIndex}</span>
            {row.map((cell, cellIndex) => (
              <div
                onClick={() => handleClick(cell.piece, cell.coordinates)}
                key={cellIndex}
                className={`cell ${cell.color === "dark" ? "dark" : "light"}
              ${availableCells?.some((item) => item.equals(cell?.coordinates)) ? "highlight" : ""}
              `}
              >
                <div
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
// через useEffect board и boardControl обновляеться с корректными координатами
