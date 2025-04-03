import { Box, Paper, Typography } from "@mui/material";
import useSocket from "../../../hooks/useSocket";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function LogsComponent({proyecto_id}) {
    const getSocket = useSocket()

    const [getLog, setLog] = useState([])

    const scrollLogRef = useRef()

    useEffect(() => {
        let interval = null;
        if(getSocket) {
            getSocket.emit('log-project-join', proyecto_id)
            getSocket.on('log-project', (data) => {
                setLog(i => [...i, data])
            })

            getSocket.on('log-senal', (data) => {
                interval = setInterval(() => {
                    getSocket.emit('log-senal', data)
                }, 5000)
            })
        }
        return () => {
            getSocket.off('log-project')
            getSocket.off('log-senal')
            if(interval) clearInterval(interval)
        }
    }, [getSocket, proyecto_id])

    /*useEffect(() => {
        const div = scrollLogRef.current;
        const threshold = 100;
        if(div.scrollTop + div.clientHeight >= div.scrollHeight - threshold) {
            div.scrollTop = div.scrollHeight;
        }
    }, [getLog])*/
    return (
        <Box>
            <Paper sx={{padding:'20px'}}>
                <Typography>Logs</Typography>
                <Box sx={{display:"flex",flexDirection:"column", gap:"10px", maxHeight:'400px', overflowY:'auto', border:'1px solid #e1e1e1'}} ref={scrollLogRef}>
                    {
                        getLog.map((value, index) => <Typography fontSize="12px" key={`ld${index}`}>{value}</Typography>)
                    }
                </Box>
            </Paper>
        </Box>
    )
}