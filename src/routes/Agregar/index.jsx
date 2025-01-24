import { Backdrop, Box, Breadcrumbs, Button, Card, CircularProgress, Link, MenuItem, Select, TextField, Typography } from "@mui/material";
import Menu from "../../components/Menu";
import { useState } from "react";
import axios from "axios";


export default function Agregar() {

    const [isCreando, setCreando] = useState(false)
    const [getData, setData] = useState({
        nombre: '',
        git_repo: '',
        framework:'-',
        rama:'',
        url_build: '',
        directorio_build: '',
        tipo:'front'
    })

    const crearProyecto = async () => {
        try {
            setCreando(true)
            await axios.post(`${import.meta.env.VITE_APP_API_URL}/proyecto`, {
                nombre: getData.nombre,
                repositorio: getData.git_repo,
                rama: getData.rama,
                ruta_final: getData.url_build,
                directorio_copiar: getData.directorio_build,
                type: getData.tipo
            })
            setCreando(false)
            window.location.href = "/"
        }
        catch(err) {
            console.log(err)
            alert("Error al crear")
            setCreando(false)
        }
    }
    return (
        <Box sx={{width:'100%'}}>
            <Menu />
            <Box sx={{padding:'20px'}}>
                <Breadcrumbs>
                    <Link underline="hover" color="inherit" href="/">Inicio</Link>
                    <Typography sx={{ color: 'text.primary' }}>Crear nuevo proyecto</Typography>
                </Breadcrumbs>
                <Box sx={{margin:'0 20px', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Card sx={{padding:'20px', width:{xs:'100%', md:'550px'}}}>
                        <Typography fontSize="24px">Crear nuevo proyecto</Typography>
                        <TextField value={getData.nombre} onChange={(e) => setData(i => ({...i, nombre: e.target.value}))} sx={{margin:'10px 0'}} fullWidth size="small" placeholder="Nombre del proyecto"/>
                        <Select value={getData.tipo} size="small" fullWidth onChange={(e) => setData(i => ({...i, tipo: e.target.value}))}>
                            <MenuItem value="front">Front</MenuItem>
                            <MenuItem value="back">Back</MenuItem>
                        </Select>
                        <TextField helperText="Ej: https://github.com/valentinCabrera/proyecto.git" value={getData.git_repo} onChange={(e) => setData(i => ({...i, git_repo: e.target.value}))} sx={{margin:'10px 0'}} fullWidth size="small" placeholder="Repositorio de GitHub"/>
                        <TextField helperText="Ej: main" value={getData.rama} onChange={(e) => setData(i => ({...i, rama: e.target.value}))} sx={{margin:'10px 0'}} fullWidth size="small" placeholder="Rama"/>
                        <TextField helperText="Ej: /home/proyectos/proyecto/front" value={getData.url_build} onChange={(e) => setData(i => ({...i, url_build: e.target.value}))} sx={{margin:'10px 0'}} fullWidth size="small" placeholder="Directorio build"/>
                        <TextField helperText="Ej: build" value={getData.directorio_build} onChange={(e) => setData(i => ({...i, directorio_build: e.target.value}))} sx={{margin:'10px 0'}} fullWidth size="small" placeholder="Directorio build"/>


                        <Box sx={{marginTop:'20px'}}>
                            <Button fullWidth variant="contained" onClick={() => crearProyecto()}>Crear</Button>
                        </Box>
                    </Card>
                </Box>
            </Box>
            <Backdrop open={isCreando}>
                <CircularProgress sx={{color:'#fff'}}/>
            </Backdrop>
        </Box>
    )
}