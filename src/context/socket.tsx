import React, { createContext, useContext } from 'react';
import { io } from 'socket.io-client';


const socket = io();

const SocketConext = createContext(socket);

export function useSocket() {
    return useContext(SocketConext);
}

export default function SocketProvider({ children }:{ children: React.ReactNode }) {
    return (
        <SocketConext.Provider value={socket}>
        {children}
        </SocketConext.Provider>
    );
}