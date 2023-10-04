import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { io } from "socket.io-client";


interface AppState {
    username: string,
    player: string,
    time: number,
};

interface ContextType {
    state: AppState,
    startGame: (data: AppState) => void
};

const initialState: AppState = {
    username: '',
    player: '',
    time: 0
};

const initialContext: ContextType = {
    state: initialState,
    startGame: () => {}
};

const GameContext = createContext<ContextType>(initialContext);

export function useGame() {
    return useContext(GameContext);
}

export default function GameProvider({ children }:{ children: React.ReactNode }) {
    const [state, setState] = useState<AppState>(initialState);

    const socket = io();

    useEffect(() => {
        socket.on('connect_error', () => console.log('error'));
    }, []);

    useEffect(() => {
        const state = JSON.parse(localStorage.getItem('state') as string);
        if(!state) return;
        setState(state);
    }, []);

    const startGame = useCallback((data: AppState) => {
        setState(data);
        localStorage.setItem('state', JSON.stringify(data));
    }, []);

    const value: ContextType = { state, startGame };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
}
