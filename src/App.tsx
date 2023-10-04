import './App.css'
import Board from './components/Board'
import Home from './components/Home'
import { useGame } from './context/game'

function App() {
  const { state } = useGame();

  return (
    <>
    { state.player ? <Board player={state.player} />: <Home />}
    </>
  )
};

export default App
