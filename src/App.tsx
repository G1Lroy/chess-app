import "./App.css";
import BoardComponent from "./componets/BoardComponent";
import { useEffect } from "react";
import GameInformation from "./componets/UI/GameInformation";
import useMainStore from "./store/main";

function App() {
  const { restart } = useMainStore();

  useEffect(() => {
    restart();
  }, []);

  return (
    <div className="App">
      <GameInformation />
      <BoardComponent />
    </div>
  );
}

export default App;

