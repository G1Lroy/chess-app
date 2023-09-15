import "./App.css";
import BoardComponent from "./componets/BoardComponent";
import { useEffect } from "react";
import GameInformation from "./componets/GameInformation";
import useBoardStore from "./store/board";
import useMainStore from "./store/main";

function App() {
  const { restart } = useMainStore();

  useEffect(() => {
    restart();
  }, []);

  return (
    <div className="App">
      <BoardComponent />
      <GameInformation />
    </div>
  );
}

export default App;

// добавить шейк всех вигур перед игрой
// добавить возможность стартовать и FEN нотации
