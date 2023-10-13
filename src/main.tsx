import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import GameProvider from './context/game.tsx';

import Home from './components/Home';
import Game from './components/Game';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:gameId",
    element: <Game />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>
  </React.StrictMode>,
)
