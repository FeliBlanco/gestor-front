import { useContext } from "react";
import { SocketContext } from "../contexts/socket";

export default function useSocket() {
    const getSocket = useContext(SocketContext)


    return getSocket
}