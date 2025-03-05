import { Box, Button, Card, Link, Typography } from "@mui/material";
import Menu from "../../components/Menu";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


import GitHubIcon from '@mui/icons-material/GitHub';
import styled from "@emotion/styled";
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import PolylineIcon from '@mui/icons-material/Polyline';


export default function Proyecto() {

    const { id } = useParams()

    const [getData, setData] = useState(null)

    useEffect(() => {
        (async() => {
            if(id) {
                try {
                    const result = await axios.get(`${import.meta.env.VITE_APP_API_URL}/proyecto/${id}`)
                    console.log(result.data)
                    setData(result.data)
                }
                catch(err) {

                }
            }
        })()
    }, [id])

    const abrirRepo = () => {
        window.open(getData?.repositorio)
    }
    return (
        <Box>
            <Menu />
            <Box sx={{padding:'20px'}}>
                <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Box>
                        <Typography fontSize="2rem" lineHeight={"2.5rem"} fontWeight={600} sx={{color:'#212121'}}>{getData?.nombre}</Typography>
                    </Box>
                    <Box>
                        <Button onClick={() => abrirRepo()} sx={Boton} disableElevation variant="contained" startIcon={<GitHubIcon />}>Repository</Button>
                    </Box>
                </Box>
                <Card sx={{padding:'20px', margin:'20px 0'}}>
                    <Box>

                    </Box>
                    <Box>
                        <Typography sx={{fontSize:'15px'}} color="text.secondary">Domains</Typography>
                        <Link sx={{fontWeight:'bold', fontSize:'15px', color:'#424242', cursor:'pointer'}} onClick={() => window.open('https://cabrera.ar')} underline="hover" color="inherit">https://cabrera.ar <OpenInNewRoundedIcon sx={{fontSize:'14px'}}/></Link>
                    </Box>
                    <Box sx={{marginTop:'14px', display:'flex', gap:'20px'}}>
                        <Box>
                            <Typography sx={{fontSize:'15px'}} color="text.secondary">Status</Typography>
                            <Box sx={{display:'flex', alignItems:'center', gap:'10px'}}>
                                <Box sx={{width:'10px', height:'10px', background:'green', borderRadius:'100%'}}></Box>
                                <Typography sx={{fontSize:'15px', color:'#424242'}} fontWeight={"bold"}>Ready</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{fontSize:'15px'}} color="text.secondary">Created</Typography>
                            <Typography sx={{fontSize:'15px', color:'#424242'}} fontWeight={"bold"}>{getData?.fecha_creacion || "-"} by Felipe Blanco</Typography>
                        </Box>
                    </Box>
                    <Box sx={{marginTop:'14px'}}>
                        <Typography sx={{fontSize:'15px'}} color="text.secondary">Source</Typography>
                        <Typography sx={{fontSize:'15px', display:'flex', alignItems:'center'}} color="text.secondary"><PolylineIcon />{getData?.rama}</Typography>
                    </Box>
                </Card>
            </Box>
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