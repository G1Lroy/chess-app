import { CreateBoard } from "./models/BoardRender/CreateBoard";
import "./App.css";
import { Board } from "./models/Board/Board";
import { FileCoords } from "./models/Piece/Coordinates";

function App() {
  const boardControl = new Board();
  const createBoard = new CreateBoard();
  const board = createBoard.constructBoard(boardControl);
  const fileNames = Object.values(FileCoords) as string[];


  return (
    <div className="App">
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            <span className="files">{8 - rowIndex}</span>
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`cell ${cell.color === "dark" ? "dark" : "light"}`}>
                <div className={`cell-content ${cell.content?.color ? "black-piece" : "light-piece"}`}>
                  {cell.content?.icon}
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="ranks">
          {fileNames.map((file, idx) => (
            <span key={idx}>{file}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
