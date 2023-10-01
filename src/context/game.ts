import { createContext, useContext } from 'react';


interface Game {};

const GameContext = createContext(null);

export function useGame() {
    return useContext(GameContext);
}

export default function GameProvider() {
    return (
        <GameContext
    );
}