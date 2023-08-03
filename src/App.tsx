import "./App.css";
import { Board } from "./models/Board/Board";
import { Cell } from "./models/Cell/Cell";
import { Color, Piece } from "./models/Piece/Piece";
import { useEffect, useState } from "react";

function App() {
  const [board, setBoard] = useState(new Board());
  const [selectedCell, setSelectedCell] = useState<Cell | null>();

  const updateBoard = () => {
    const newBoard = board.clone();
    setBoard(newBoard);
  };

  function restart() {
    const newBoard = new Board();
    newBoard.constructBoard();
    newBoard.defaultPieceSetup();
    setBoard(newBoard);
  }

  useEffect(() => {
    restart();
  }, []);

  function highlightCells() {
    board.highlightCells(selectedCell as Cell);
    updateBoard();
  }
  useEffect(() => {
    if (selectedCell) highlightCells();
  }, [selectedCell]);

  const clickHandler = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell.piece?.isCellavilableToMove(cell)) {
      selectedCell.movePiece(cell);
      setSelectedCell(null);
    } else {
      setSelectedCell(cell);
    }
  };

  return (
    <div className="App">
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          setSelectedCell(null);
        }}
        className="board"
      >
        {board.cells.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            <span className="files">{8 - rowIndex}</span>
            {row.map((cell, cellIndex) => (
              <div
                onClick={() => clickHandler(cell)}
                key={cellIndex}
                className={`cell 
                ${cell.color === 0 ? "dark" : "light"} 
                ${cell.piece?.color === 0 ? "black-piece" : "light-piece"} 
                ${selectedCell && cell.piece && cell.equals(selectedCell?.x, selectedCell?.y) ? "active" : ""}
                `}
              >
                {selectedCell && (
                  <div
                    className={`highlight 
                  ${!cell.piece && cell.availableToMove ? "empty" : ""}
                  ${cell.piece && cell.availableToMove ? "piece" : ""}
                  `}
                  ></div>
                )}
                {cell.piece?.icon}
              </div>
            ))}
          </div>
        ))}
        {/* <div className="ranks">
          {fileCoords.map((file, idx) => (
            <span key={idx}>{file}</span>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default App;

// добавить шейк всех вигур перед игрой
