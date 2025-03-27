import { Box, Typography } from "@mui/material";
import useSocket from "../../../hooks/useSocket";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LogsComponent({proyecto_id}) {
    const getSocket = useSocket()

    const [getLog, setLog] = useState([])

    useEffect(() => {
        (async() => {
            try {
                const result = await axios.get(`${import.meta.env.VITE_APP_API_URL}/proyecto/logs/${proyecto_id}`)
            }
            catch(err) {

            }
        })()
    }, [])
    useEffect(() => {
        if(getSocket) {
            getSocket.on('log-project', (data) => {
                setLog(i => [...i, data])
            })
        }

        return () => {
            getSocket.off('log-project')
            getSocket.emit('log-project-off')
        }
    }, [getSocket])
    return (
        <Box>
            <Typography>Logs</Typography>
            {
                getLog.map((value, index) => <Typography key={`ld${index}`}>{value}</Typography>)
            }
        </Box>
    )
}