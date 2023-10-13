import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import GameProvider from './context/game.tsx';

import SocketProvider from './context/socket.tsx';
import App from './App.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </GameProvider>
  </React.StrictMode>,
)
