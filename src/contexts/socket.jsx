import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";

export const SocketContext = createContext()

export default function SocketContextProvider() {

    const [getSocket, setSocket] = useState(null)

    useEffect(() => {
        const socket = io(import.meta.env.VITE_APP_API_URL);
        setSocket(socket)
    }, [])

    return (
        <SocketContext.Provider value={getSocket}><Outlet /></SocketContext.Provider>
    )
}