import { Box, Button, Card, Link, Typography } from "@mui/material";

import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import PolylineIcon from '@mui/icons-material/Polyline';
import CommitIcon from '@mui/icons-material/Commit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useEffect, useRef, useState } from "react";
import useSocket from "../../../hooks/useSocket";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GitHubIcon from '@mui/icons-material/GitHub';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import getBackgroundColorStatus from "../../../utils/getBackgroundColorStatus";
import getColorStatus from "../../../utils/getColorStatus";
import getStatusColorDocker from "../../../utils/getStatusColorDocker";
import useFetch from "../../../hooks/useFetch";


export default function ProjectData({proyecto, grupo, data, onChangeData}) {

    const getSocket = useSocket()
    const scrollBuildLogRef = useRef()
    const { getFetch, postFetch } = useFetch()

    const [getBuildLog, setBuildLog] = useState([])
    const [getActionButtonStatus, setActionButtonStatus] = useState(null)


    useEffect(() => {

        if(getSocket) {
            getSocket.on('build-log', (data) => {
                setBuildLog(i => [...i, data])
            })
            getSocket.on('actualizando-state', (data) => {
                onChangeData(i => ({...i, actualizando: data.state}))
            })
        }

        return () => {
            getSocket?.off('build-log')
        }
    }, [getSocket])


    useEffect(() => {
        const div = scrollBuildLogRef.current;
        const threshold = 100;
        if(div.scrollTop + div.clientHeight >= div.scrollHeight - threshold) {
            div.scrollTop = div.scrollHeight;
        }
    }, [getBuildLog])

    const abrirRepo = () => {
        window.open(data?.repositorio)
    }

    const generarBuild = async () => {
        try {
            await getFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/build/${data.id}`)
        }
        catch(err) {
            //alert("Error al buildear")
        }
    }

    const turnOnSystem = async () => {
        if(getActionButtonStatus != null) return;
        setActionButtonStatus("Prendiendo...")
        try {
            await postFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/start/${data.id}`)
        }
        catch(err) {

        }
        finally {
            setActionButtonStatus(null) 
        }
    }

    const turnOffSystem = async () => {
        if(getActionButtonStatus != null) return;
        setActionButtonStatus("Apagando...")
        try {
            await postFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/stop/${data.id}`)
        }
        catch(err) {

        }
        finally {
            setActionButtonStatus(null) 
        }
    }

    const copiarDominio = () => {
        navigator.clipboard.writeText(data?.dominio)
        .then(() => alert("Dominio copiado!"))
        .catch(err => console.error("Error al copiar", err));
    }
    return (
        <Box>
            <Box sx={{display:'flex', gap:'10px', justifyContent:'flex-end'}}>
                <Button onClick={() => generarBuild()} sx={Boton} disableElevation variant="contained" startIcon={<BuildCircleIcon />} disabled={data?.actualizando == 1}>{data?.actualizando == 1 ? 'Building...' : 'Build'}</Button>
                {console.log(data)}
                {
                    (data?.framework_tipo == "back" && data?.status != "running" && data?.commit_build != null) &&
                    <Button onClick={() => turnOnSystem()} sx={{...Boton, background:'#78cc66', color:'#fff'}} disableElevation variant="contained" startIcon={<PlayArrowIcon />} disabled={getActionButtonStatus != null}>{getActionButtonStatus != null ? getActionButtonStatus : 'Prender'}</Button>
                }
                {
                    (data?.framework_tipo == "back" && data?.status == "running" && data?.commit_build != null) &&
                    <Button onClick={() => turnOffSystem()} sx={{...Boton, background:'#d60d1a', color:'#fff'}} disableElevation variant="contained" startIcon={<StopIcon />} disabled={getActionButtonStatus != null}>{getActionButtonStatus != null ? getActionButtonStatus : 'Apagar'}</Button>
                }
                <Button onClick={() => abrirRepo()} sx={Boton} disableElevation variant="contained" startIcon={<GitHubIcon />}>Repository</Button>
            </Box>
            <Card sx={{padding:'20px', margin:'20px 0'}}>
                <Typography textTransform={"uppercase"} fontSize={"14px"} fontWeight={"bold"}>Build logs</Typography>
                <Box sx={{border:'1px solid #e1e1e1', padding:'10px', maxHeight:'300px', overflowY:'auto'}} ref={scrollBuildLogRef}>
                    {
                        getBuildLog.map((value, index) => {
                            return <Typography sx={{background: getBackgroundColorStatus(value.type), color: getColorStatus(value.type)}} key={`lo-${index}`}>{value.text}</Typography>
                        })
                    }
                </Box>
            </Card>
            <Card sx={{padding:'20px', margin:'20px 0'}}>
                <Box>
                </Box>
                <Box>
                    <Typography sx={{fontSize:'15px'}} color="text.secondary">Domains</Typography>
                    <Link sx={{fontWeight:'bold', fontSize:'15px', color:'text.primary', cursor:'pointer'}} onClick={() => window.open('https://'+data?.dominio)} underline="hover" color="inherit">https://{data?.dominio}</Link><ContentCopyIcon onClick={copiarDominio} sx={{fontSize:'14px', cursor:'pointer', marginLeft:'7px'}}/>
                </Box>
                {
                    data?.framework_tipo == "back" && 
                    <Box sx={{marginTop:'14px'}}>
                        <Typography sx={{fontSize:'15px'}} color="text.secondary">Puerto</Typography>
                        <Typography sx={{fontWeight:'bold', fontSize:'15px', color:'text.primary'}}>{data?.puerto}</Typography>
                    </Box>
                }
                <Box sx={{marginTop:'14px', display:'flex', gap:'20px'}}>
                    {
                        data?.framework_tipo == "back" && 
                        <Box>
                            <Typography sx={{fontSize:'15px'}} color="text.secondary">Status</Typography>
                            <Box sx={{display:'flex', alignItems:'center', gap:'10px'}}>
                                <Box sx={{width:'10px', height:'10px', background:getStatusColorDocker(data?.status), borderRadius:'100%'}}></Box>
                                <Typography sx={{fontSize:'15px', color:'text.primary'}} fontWeight={"bold"}>{data?.status}</Typography>
                            </Box>
                        </Box>
                    }
                    <Box>
                        <Typography sx={{fontSize:'15px'}} color="text.secondary">Created</Typography>
                        <Typography sx={{fontSize:'15px', color:'text.primary'}} fontWeight={"bold"}>{data?.fecha_creacion || "-"} by Felipe Blanco</Typography>
                    </Box>
                </Box>
                <Box sx={{marginTop:'14px'}}>
                    <Typography sx={{fontSize:'15px'}} color="text.secondary">Source</Typography>
                    <Typography sx={{fontSize:'15px', display:'flex', alignItems:'center'}} color="text.primary"><PolylineIcon />{data?.rama}</Typography>
                </Box>
                <Box sx={{marginTop:'14px'}}>
                    <Typography sx={{fontSize:'15px'}} color="text.secondary">Commit</Typography>
                    <Typography sx={{fontSize:'15px', display:'flex', alignItems:'center'}} color="text.primary"><CommitIcon />{data?.commit_build || '-'}</Typography>
                </Box>
                <Box sx={{marginTop:'14px'}}>
                    <Typography sx={{fontSize:'15px'}} color="text.secondary">Last build</Typography>
                    <Typography sx={{fontSize:'15px', display:'flex', alignItems:'center'}} color="text.primary"><AccessTimeIcon sx={{fontSize:'20px'}} />{data?.fecha_build || '-'}</Typography>
                </Box>
            </Card>
        </Box>
    )
}

const Boton = {
    padding:'10px 20px',
    border:'1px solid #e1e1e1',
    fontSize:'12px',
    background:'#fff',
    color:'#000',
    textTransform:'capitalize'
}