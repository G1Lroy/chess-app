import "./App.css";
import { Board } from "./models/Board/Board";
import { Coordinates, fileCoords } from "./models/Piece/Coordinates";
import { Piece } from "./models/Piece/Piece";
import { useEffect, useState } from "react";

function App() {
  const [board, setBoard] = useState(new Board());

  const [boardArray, setBoardArray] = useState(board.constructBoard());

  const [selectedPiece, setSelectedPiece] = useState({} as Piece | undefined | null);
  const [availableCells, setAvailableCells] = useState([] as Coordinates[] | undefined | null);

  const handleClick = (piece: Piece | undefined, cell: Coordinates): void => {
    if (piece) {
      setSelectedPiece(piece);
      setAvailableCells(piece.getAvailableCell(board));
    } else if (availableCells && selectedPiece) {
      for (const cellCoord of availableCells) {
        if (cell.equals(cellCoord)) {
          board.movePiece(selectedPiece.coordinates, cellCoord);
          setSelectedPiece(null);
          setAvailableCells(null);
        }
      }
    }
    return;
  };

  const updateBoard = () => {
    const newBoard = board.clone();
    setBoard(newBoard);
    setBoardArray(newBoard.boardArray);
  };

  useEffect(() => {
    updateBoard();
  }, [selectedPiece]);

  useEffect(() => {
    board.defaultPieceSetup();
  }, []);

  return (
    <div className="App">
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          setSelectedPiece(null);
          setAvailableCells(null);
        }}
        className="board"
      >
        {boardArray.map((row, rowIndex) => (
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
// через useEffect board  не обновляеться с корректными координатами
