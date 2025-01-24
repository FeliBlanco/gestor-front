import { Box, Button, Card, MenuItem, Modal, Paper, Select, TextField, Typography } from "@mui/material";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';

export default function Home() {

    const [getProyectos, setProyectos] = useState([]);
    const [getEdit, setEdit] = useState(null);

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

    const saveBtn = async () => {
        if(getEdit == null) return;
        try {
            await axios.put(`${import.meta.env.VITE_APP_API_URL}/proyecto/${getEdit.id}`, {
                ...getEdit
            })
            setProyectos(i => {
                const findIn = i.findIndex(j => j.id == getEdit.id);
                if(findIn != -1) {
                    i[findIn] = getEdit;
                }
                return [...i]
            })
            setEdit(null)
        }
        catch(err) {
            alert("ERROR")
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
                                    <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                        <Box sx={{display:'flex', gap:'10px'}}>
                                            <Typography fontSize="20px">{value.nombre}</Typography>
                                            <Box>
                                                <Box sx={{background: value.type == "front" ? 'red' : 'green', color:'#fff', borderRadius:'10px', padding:'2px 4px', cursor:'pointer', userSelect:'none'}}>
                                                    <Typography sx={{textTransform:'uppercase'}} fontWeight={'bold'} fontSize="14px">{value.type}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Button onClick={() => setEdit(value)}><EditIcon /></Button>
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
            <Modal open={getEdit != null} sx={{display:'flex', justifyContent:'center', alignItems:'center'}} onClose={() => setEdit(null)}>
                <Paper sx={{padding:'20px', width:{xs:'90%', md:'450px'}}}>
                    <TextField margin="normal" label="Nombre" size="small" fullWidth value={getEdit?.nombre} onChange={(e) => setEdit(i => ({...i, nombre: e.target.value}))}/>
                    <Select size="small" fullWidth value={getEdit?.type} onChange={(e) => setEdit(i => ({...i, type: e.target.value}))}>
                        <MenuItem value="front">Front</MenuItem>
                        <MenuItem value="back">Back</MenuItem>
                    </Select>
                    <TextField margin="normal" label="Repositorio" size="small" fullWidth value={getEdit?.repositorio} onChange={(e) => setEdit(i => ({...i, repositorio: e.target.value}))}/>
                    <TextField margin="normal" label="Rama" size="small" fullWidth value={getEdit?.rama} onChange={(e) => setEdit(i => ({...i, rama: e.target.value}))}/>
                    <TextField margin="normal" label="Directorio build" size="small" fullWidth value={getEdit?.ruta_final} onChange={(e) => setEdit(i => ({...i, ruta_final: e.target.value}))}/>
                    <TextField margin="normal" label="Nombre del directorio de build" size="small" fullWidth value={getEdit?.directorio_copiar} onChange={(e) => setEdit(i => ({...i, directorio_copiar: e.target.value}))}/>
                    <Button sx={{margin:'5px 0'}} fullWidth variant="contained" onClick={() => saveBtn()}>Guardar</Button>
                    <Button sx={{margin:'5px 0'}} fullWidth variant="outlined" onClick={() => setEdit(null)}>Cancelar</Button>
                </Paper>
            </Modal>
        </Box>
    )
}