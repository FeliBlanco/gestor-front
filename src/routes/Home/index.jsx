import { Backdrop, Box, Button, Card, CircularProgress, MenuItem, Modal, Paper, Select, TextField, Typography } from "@mui/material";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';

import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from "@emotion/react";
import useFetch from "../../hooks/useFetch";

export default function Home() {
    const theme = useTheme()
    const { getFetch, putFetch, postFetch } = useFetch()

    const [getProyectos, setProyectos] = useState([]);

    const [getEdit, setEdit] = useState(null);
    const [getBuscador, setBuscador] = useState('')

    const [getAddGrupoData, setAddGrupoData] = useState(null)
    const [isCreatingProyecto, setCreatingProyecto] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const response = await getFetch(`${import.meta.env.VITE_APP_API_URL}/grupo`)
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
            const response = await getFetch(`${import.meta.env.VITE_APP_API_URL}/actualizar?sistema=${id}`, {
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
            await putFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/${getEdit.id}`, {
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

    const buscadorProyectos = (value) => {
        if(getBuscador.length > 0) {
            if(value.nombre.toLowerCase().indexOf(getBuscador.toLowerCase()) != -1) {
                return value;
            }
        }
        else return value
    }

    const abrirModalAddGrupo = () => {
        setAddGrupoData({
            nombre: ''
        })
    }

    const crearProyecto = async () => {
        try {
            if(isCreatingProyecto) return;
            setCreatingProyecto(true)
            await postFetch(`${import.meta.env.VITE_APP_API_URL}/grupo`, {
                ...getAddGrupoData
            })
            setAddGrupoData(null)
            location.location.reload()
        }
        catch(err) {
            alert("error")
        }
        finally {
            setCreatingProyecto(false)
        }
    }
    return (
        <Box>
            <Menu />
            <Box sx={{width:'100%', display:'flex', justifyContent:'center'}}>
                <Box sx={{width:{md:'90%', xs:'100%'}}}>
                    <Box sx={{display:'flex', flexDirection:'column', gap:'20px'}}>
                        <Box sx={{display:'flex', justifyContent:'space-between', gap:'10px', margin:'20px 0'}}>
                            <TextField onChange={e => setBuscador(e.target.value)} value={getBuscador} InputProps={{startAdornment: <SearchIcon style={{marginRight:'10px', color:'#949494'}}/>}} size="small" fullWidth placeholder="Buscar proyectos..."/>
                            <Button variant="contained" sx={{textTransform:'capitalize', background: theme.palette.custom.button_inverse, textWrap:'nowrap'}} onClick={() => abrirModalAddGrupo()}>Crear nuevo</Button>
                        </Box>
                        <Box sx={{display:'grid', gridTemplateColumns:{md:'repeat(3, 1fr)', xs:'repeat(2, 1fr)'}, gap:'20px'}}> 
                            {getProyectos.filter(buscadorProyectos).map((value, index) => {
                                return (
                                    <Card sx={{padding:'20px', cursor:'pointer'}} key={`pro-${index}`} onClick={() => window.location.href = "/"+value.usuario}>
                                        <Typography fontSize="16px" fontWeight={"bold"}>{value.nombre}</Typography>                               
                                        <Typography sx={{color:'text.secondary'}} fontSize="14px">{value.usuario}</Typography>
                                        <Typography>{value.cantidad_proyectos || 0} proyectos</Typography>
                                    </Card>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Modal open={getAddGrupoData != null} sx={{display:'flex', alignItems:'center', justifyContent:'center'}} onClose={() => setAddGrupoData(null)}>
                <Paper sx={{padding:'20px', width:{sx:'90%', md:'450px'}}}>
                    <Typography textAlign={"center"} fontSize="20px">Crear proyecto</Typography>
                    <Box sx={{margin:'10px 0'}}>
                        <TextField value={getAddGrupoData?.nombre} onChange={e => setAddGrupoData(i => ({...i, nombre: e.target.value}))} fullWidth size="small" label="Nombre del proyecto"/>
                    </Box>
                    <Button fullWidth variant="contained" onClick={() => crearProyecto()}>Crear proyecto</Button>
                </Paper>
            </Modal>
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
            <Backdrop open={isCreatingProyecto}>
                <CircularProgress />
            </Backdrop>
        </Box>
    )
}