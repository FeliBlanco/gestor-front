import { Box, Button, Card, Typography } from "@mui/material";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

    const [getProyectos, setProyectos] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/proyecto`)
                console.log(response.data)
                setProyectos(response.data)
            }
            catch(err) {
                console.log(err)
            }
        })()
    }, [])

    const actualizarSistema = async id => {
        try {
            setProyectos(i => {
                const findIn = i.findIndex(j => j.id == id);
                if(findIn != -1) {
                    i[findIn].actualizando = 1;
                }
                return [...i]
            })
            const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/actualizar?sistema=${id}`, {
                timeout: 1000 * 60 * 2
            })
            setProyectos(i => {
                const findIn = i.findIndex(j => j.id == id);
                if(findIn != -1) {
                    i[findIn].actualizando = 0;
                }
                return [...i]
            })
        }
        catch(err) {
            console.log(err)
            alert("Error al reiniciar sistema")
            setProyectos(i => {
                const findIn = i.findIndex(j => j.id == id);
                if(findIn != -1) {
                    i[findIn].actualizando = 0;
                }
                return [...i]
            })
        }
    }
    return (
        <Box>
            <Menu />
            <Box sx={{width:'100%', display:'flex', justifyContent:'center'}}>
                <Box sx={{width:{md:'70%', xs:'100%'}}}>
                <Box sx={{display:'flex', justifyContent:'space-between', margin:'20px'}}>
                    <Typography fontSize="30px">Tus proyectos</Typography>
                    <Button variant="contained" onClick={() => window.location.href = "/agregar"}>Agregar</Button>
                </Box>
                    <Box sx={{display:'flex', flexDirection:'column', gap:'20px'}}>
                        {getProyectos.map((value, index) => {
                            return (
                                <Card sx={{padding:'20px'}} key={`pro-${index}`}>
                                    <Box sx={{display:'flex', gap:'10px'}}>
                                        <Typography fontSize="20px">{value.nombre}</Typography>
                                        <Box>
                                            <Box sx={{background: value.type == "front" ? 'red' : 'green', color:'#fff', borderRadius:'10px', padding:'2px 4px', cursor:'pointer', userSelect:'none'}}>
                                                <Typography sx={{textTransform:'uppercase'}} fontWeight={'bold'} fontSize="14px">{value.type}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Typography fontSize="18px">Repositorio: {value.repositorio}</Typography>
                                    <Typography fontSize="18px">Rama: {value.rama}</Typography>
                                    <Typography fontSize="18px">Directorio build: {value.ruta_final}</Typography>
                                    <Typography fontSize="18px">Nombre directorio de build: {value.directorio_copiar}</Typography>
                                    {
                                        value.actualizando == 0 ? <Button variant="contained" onClick={() => actualizarSistema(value.id)}>Actualizar</Button> : <Typography>Actualizandose...</Typography>
                                    }
                                </Card>
                            )
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}