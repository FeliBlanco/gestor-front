import { Box, Button, Card, TextField, Typography } from "@mui/material";
import Menu from "../../components/Menu";

import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import PolylineIcon from '@mui/icons-material/Polyline';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Grupo() {

    const { grupo } = useParams()

    const [getBuscador, setBuscador] = useState('')
    const [getProyectos, setProyectos] = useState([])

    useEffect(() => {
        (async() => {
            try {
                const result = await axios.get(`${import.meta.env.VITE_APP_API_URL}/proyecto/${grupo}`)
                console.log(result.data)
                setProyectos(result.data)
            }
            catch(err) {

            }
        })()
    }, [grupo])

    const buscadorProyectos = (value) => {
        if(getBuscador.length > 0) {
            if(value.nombre.toLowerCase().indexOf(getBuscador.toLowerCase()) != -1) {
                return value;
            }
        }
        else return value
    }

    return (
        <Box>
            <Menu/>
            <Box sx={{width:'100%', display:'flex', justifyContent:'center'}}>
                <Box sx={{width:{md:'90%', xs:'100%'}}}>
                    <Box sx={{display:'flex', flexDirection:'column', gap:'20px'}}>
                        <Box sx={{display:'flex', justifyContent:'space-between', gap:'10px', margin:'20px 0'}}>
                            <TextField onChange={e => setBuscador(e.target.value)} value={getBuscador} InputProps={{style:{background:'#fff'}, startAdornment: <SearchIcon style={{marginRight:'10px', color:'#949494'}}/>}} size="small" fullWidth placeholder="Buscar proyectos..."/>
                            <Button variant="contained" sx={{textTransform:'capitalize', textWrap:'nowrap'}} onClick={() => window.location.href = `/${grupo}/new-project`}>Crear nuevo</Button>
                        </Box>
                    </Box>
                    <Box sx={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'20px'}}>
                            {getProyectos.filter(buscadorProyectos).map((value, index) => {
                                return (
                                    <Card sx={{padding:'20px', cursor:'pointer'}} key={`pro-${index}`} onClick={() => window.location.href = `/${grupo}/${value.usuario}`}>
                                        <Typography fontSize="24px">{value.nombre}</Typography>                               
                                        
                                        <Typography>{value.usuario}</Typography>
                                        <Typography><PolylineIcon /> {value.rama}</Typography>
                                        <Typography sx={{}} fontSize="14px"><GitHubIcon /> {value.repositorio.replace('https://github.com/', '')}</Typography>
                                        <Typography>Creado por: <a style={{color:'#949494'}}>Feli Blanco</a></Typography>
                                    </Card>
                                )
                            })}
                        </Box>
                </Box>
            </Box>
        </Box>
    )
}