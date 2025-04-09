import { Box, Button, Card, TextField, Typography } from "@mui/material";
import Menu from "../../components/Menu";

import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PolylineIcon from '@mui/icons-material/Polyline';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmptyList from "../../components/EmptyList";
import { useTheme } from "@emotion/react";
import getStatusColorDocker from "../../utils/getStatusColorDocker";
import useFetch from "../../hooks/useFetch";

export default function Grupo() {

    const { grupo } = useParams()
    const { getFetch, deleteFetch } = useFetch()

    const theme = useTheme()

    const [getBuscador, setBuscador] = useState('')
    const [getProyectos, setProyectos] = useState([])

    useEffect(() => {
        (async() => {
            try {
                const result = await getFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/${grupo}`)
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

    const eliminarGrupo = async () => {
        try {
            await deleteFetch(`${import.meta.env.VITE_APP_API_URL}/grupo/${grupo}`)
            window.location.href = "/"
        }
        catch(err) {
            console.log(err)
            alert("error")
        }
    }

    return (
        <Box>
            <Menu/>
            <Box sx={{width:'100%', display:'flex', justifyContent:'center', background:'background.default'}}>
                <Box sx={{width:{md:'90%', xs:'100%'}}}>
                    <Box sx={{display:'flex', flexDirection:'column', gap:'20px'}}>
                        <Box sx={{display:'flex', justifyContent:'space-between', gap:'10px', margin:'20px 0'}}>
                            <TextField onChange={e => setBuscador(e.target.value)} value={getBuscador} InputProps={{startAdornment: <SearchIcon style={{marginRight:'10px', color:'#949494'}}/>}} size="small" fullWidth placeholder="Buscar proyectos..."/>
                            <Button variant="contained" sx={{textTransform:'capitalize', background: theme.palette.custom.button_inverse, color:theme.palette.custom.button_inverse_text, textWrap:'nowrap'}} onClick={() => window.location.href = `/${grupo}/new-project`}>Crear nuevo</Button>
                        </Box>
                    </Box>
                    {
                        getProyectos.length == 0 ?
                        <Box>
                            <Button onClick={() => eliminarGrupo()}>Eliminar proyecto</Button>
                            <EmptyList message="No hay proyectos para mostrar" />
                        </Box>
                            :
                            <Box sx={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'20px'}}>
                                    {getProyectos.filter(buscadorProyectos).map((value, index) => {
                                        return (
                                            <Card sx={{padding:'20px', cursor:'pointer'}} key={`pro-${index}`} onClick={() => window.location.href = `/${grupo}/${value.usuario}`}>
                                                <Typography fontSize="16px" fontWeight={"bold"}>{value.nombre}</Typography>                               
                                                <Typography fontSize="16px" sx={{color:'text.secondary'}}>{value.usuario}</Typography>
                                                <Typography sx={{color:'text.secondary', display:'flex', alignItems:'center'}}><PolylineIcon sx={{fontSize:'18px'}}/> {value.rama}</Typography>
                                                <Typography sx={{color:'text.secondary', display:'flex', alignItems:'center'}} fontSize="14px"><GitHubIcon /> {value.repositorio.replace('https://github.com/', '')}</Typography>
                                                {
                                                    value.framework_tipo == "back" &&
                                                    <Box>
                                                        <Box sx={{display:'flex', alignItems:'center', gap:'10px'}}>
                                                            <Box sx={{width:'10px', height:'10px', background:getStatusColorDocker(value?.status), borderRadius:'100%'}}></Box>
                                                            <Typography sx={{fontSize:'15px', color:'text.secondary'}} fontWeight={"bold"}>{value?.status}</Typography>
                                                        </Box>
                                                    </Box>
                                                }
                                                <Typography href={`https://${value.dominio}`} sx={{fontSize:'14px', margin:'10px 0'}}>https://{value.dominio}</Typography>
                                                <Typography>Creado por: <a style={{color:'#949494'}}>Feli Blanco</a></Typography>
                                            </Card>
                                        )
                                    })}
                            </Box>
                    }
                </Box>
            </Box>
        </Box>
    )
}