import { Box, Button, Card, Link, Typography } from "@mui/material";

import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import PolylineIcon from '@mui/icons-material/Polyline';
import CommitIcon from '@mui/icons-material/Commit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useEffect, useRef, useState } from "react";
import useSocket from "../../../hooks/useSocket";

import GitHubIcon from '@mui/icons-material/GitHub';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import axios from "axios";

const getBackgroundColorStatus = (status) => {
    if(status == "warning") return '#e3d8aa'
    if(status == "error") return '#e6aa97'
    if(status == "success") return '#c4e6ae'
    return '#fff';
}
const getColorStatus = (status) => {
    if(status == "warning") return '#8a8054'
    if(status == "error") return '#9c5d49'
    if(status == "success") return '#799468'
    return '#000';
}

const getStatusColorDocker = (status) => {
    if(status == "stopped") return 'red';
    if(status == "running") return 'green';
    return '#000'
}

export default function ProjectData({proyecto, grupo, data, onChangeData}) {

    const getSocket = useSocket()
    const scrollBuildLogRef = useRef()

    const [getBuildLog, setBuildLog] = useState([])


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
            await axios.get(`${import.meta.env.VITE_APP_API_URL}/proyecto/build/${data.id}`)
        }
        catch(err) {
            //alert("Error al buildear")
        }
    }

    return (
        <Box>
            <Box sx={{display:'flex', gap:'10px', justifyContent:'flex-end'}}>
                <Button onClick={() => generarBuild()} sx={Boton} disableElevation variant="contained" startIcon={<BuildCircleIcon />} disabled={data?.actualizando == 1}>{data?.actualizando == 1 ? 'Building...' : 'Build'}</Button>
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
                    <Link sx={{fontWeight:'bold', fontSize:'15px', color:'#424242', cursor:'pointer'}} onClick={() => window.open('https://'+data?.dominio)} underline="hover" color="inherit">{data?.dominio}<OpenInNewRoundedIcon sx={{fontSize:'14px'}}/></Link>
                </Box>
                <Box sx={{marginTop:'14px'}}>
                    <Typography sx={{fontSize:'15px'}} color="text.secondary">Puerto</Typography>
                    <Link sx={{fontWeight:'bold', fontSize:'15px', color:'#424242', cursor:'pointer'}} underline="hover" color="inherit">{data?.puerto}</Link>
                </Box>
                <Box sx={{marginTop:'14px', display:'flex', gap:'20px'}}>
                    <Box>
                        <Typography sx={{fontSize:'15px'}} color="text.secondary">Status</Typography>
                        <Box sx={{display:'flex', alignItems:'center', gap:'10px'}}>
                            <Box sx={{width:'10px', height:'10px', background:getStatusColorDocker(data?.status), borderRadius:'100%'}}></Box>
                            <Typography sx={{fontSize:'15px', color:'#424242'}} fontWeight={"bold"}>{data?.status}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{fontSize:'15px'}} color="text.secondary">Created</Typography>
                        <Typography sx={{fontSize:'15px', color:'#424242'}} fontWeight={"bold"}>{data?.fecha_creacion || "-"} by Felipe Blanco</Typography>
                    </Box>
                </Box>
                <Box sx={{marginTop:'14px'}}>
                    <Typography sx={{fontSize:'15px'}} color="text.secondary">Source</Typography>
                    <Typography sx={{fontSize:'15px', display:'flex', alignItems:'center'}} color="text.secondary"><PolylineIcon />{data?.rama}</Typography>
                </Box>
                <Box sx={{marginTop:'14px'}}>
                    <Typography sx={{fontSize:'15px'}} color="text.secondary">Commit</Typography>
                    <Typography sx={{fontSize:'15px', display:'flex', alignItems:'center'}} color="text.secondary"><CommitIcon />{data?.commit_build || '-'}</Typography>
                </Box>
                <Box sx={{marginTop:'14px'}}>
                    <Typography sx={{fontSize:'15px'}} color="text.secondary">Last build</Typography>
                    <Typography sx={{fontSize:'15px', display:'flex', alignItems:'center'}} color="text.secondary"><AccessTimeIcon sx={{fontSize:'20px'}} />{data?.fecha_build || '-'}</Typography>
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