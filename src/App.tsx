import { useState } from 'react';
import './App.css'
import Home from './components/Home';
import CreateGame from './components/Create';
import JoinGame from './components/Join';
import Game from './components/Game';

export enum Display {
  home,
  joinGame,
  createGame,
  playGame
};

function App() {
  const [display, setDisplay] = useState<Display>(Display.home);

  return (
    <div>
      {display === Display.home && <Home setDisplay={setDisplay}/>}
      {display === Display.createGame && <CreateGame setDisplay={setDisplay} />}
      {display === Display.joinGame && <JoinGame setDisplay={setDisplay} /> }
      {display === Display.playGame && <Game /> }
    </div>
  )
};

export default App
