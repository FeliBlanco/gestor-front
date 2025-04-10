import { Alert, Backdrop, Box, Button, CircularProgress, IconButton, Modal, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import EditIcon from '@mui/icons-material/Edit';
import useFetch from "../../../hooks/useFetch";
import useUser from "../../../hooks/useUser";

export default function DominiosComponent({proyecto_id}) {

    const { getUserData } = useUser()

    const { getFetch, putFetch, postFetch } = useFetch()
    const [getAddData, setAddData] = useState(null)
    const [getDominios, setDominios] = useState([])
    const [getAlert, setAlert] = useState(false)
    const [getEditDominio, setEditDominio] = useState(null)
    const [isLoading, setLoading] = useState(false)


    useEffect(() => {
        (async () => {
            try {
                const response = await getFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/dominios/${proyecto_id}`)
                setDominios(response.data)
            }
            catch(err) {

            }
        })()
    }, [])

    const agregarDominio = () => {
        setAddData({
            dominio: '',
            configuraciones: `server {\n\tlisten 80;\n\tserver_name [dominio];\n\tlocation / {\n\n\t}\n}
            `
        })
    }

    const submitAgDominio = async () => {
        if(getAddData.dominio.length < 2) return alert("Agrega un dominio")
        try {
            await postFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/dominio`, {
                ...getAddData,
                proyecto_id
            })
            setAddData(null)
            setAlert(true)
        }
        catch(err) {

        }
    }

    const guardarConfig = async () => {
        setLoading(true)
        try {
            await putFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/dominios/${getEditDominio.id}`, {
                configuracion: getEditDominio.configuracion,
            })
            setLoading(false)
            setEditDominio(null)
        }
        catch(err) {

        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <Box display="flex" justifyContent={"space-between"}>
                <Box></Box>
                <Button onClick={() => agregarDominio()} variant="contained">Agregar dominio</Button>
            </Box>
            {
                getAddData != null &&
                <Paper sx={{padding:'14px', margin:'20px 0'}}>
                    <Typography fontSize="20px">Agregar nuevo dominio</Typography>
                    <TextField value={getAddData.dominio} onChange={(e) => setAddData(i => ({...i, dominio: e.target.value}))} margin="normal" fullWidth size="small" placeholder="Dominio, ej: telemed.boolean.com.ar"/>
                    <TextField value={getAddData.configuraciones} onChange={(e) => setAddData(i => ({...i, configuraciones:e.target.value}))} margin="normal" fullWidth size="small" placeholder="Configuración" multiline rows={10}/>
                    {getUserData.admin == 1 && <Button onClick={() => submitAgDominio()} fullWidth variant="contained">Agregar dominio</Button>}
                </Paper>
            }
            {getAlert == true && <Alert severity="success" sx={{margin:'20px 0'}}>
                Agregaste un dominio
            </Alert>}
            {
                getDominios.length == 0 ?
                <Box>
                    <Typography>No hay dominios para mostrar.</Typography>
                </Box>
                :
                <Box display="grid" sx={{gridTemplateColumns: {md: "repeat(3, 1fr)", xs: "repeat(2, 1fr)"}}} gap="20px">
                    {
                        getDominios.map((value, index) => {
                            return (
                                <Paper key={`dsd-${index}`} sx={{padding:'20px'}}>
                                    {
                                        getUserData.admin == 1 &&
                                        <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                                            <IconButton onClick={() => setEditDominio(value)}><EditIcon /></IconButton>
                                        </Box>
                                    }
                                    <TextField margin="normal" size="small" fullWidth value={value.dominio} multiline disabled/>
                                    <TextField size="small" fullWidth value={value.configuracion} multiline disabled/>
                                </Paper>
                            )
                        })
                    }
                </Box>
            }
            <Backdrop open={isLoading}>
                <CircularProgress sx={{color:'#fff'}}/>
            </Backdrop>
            <Modal onClose={() => setEditDominio(null)} open={getEditDominio != null} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Paper sx={{padding:'20px', width:{xs:'90%', md:'450px'}, maxHeight:'460px', overflowY:'auto'}}>
                    <Typography fontSize="18px" textAlign={"center"}>
                        {getEditDominio?.dominio}
                    </Typography>
                    <TextField onChange={(e) => setEditDominio(i => ({...i, configuracion: e.target.value}))} fullWidth value={getEditDominio?.configuracion} multiline/>
                    <Button sx={{margin:'10px 0'}} fullWidth variant="contained" onClick={() => guardarConfig()}>Guardar</Button>
                    <Button sx={{margin:'5px 0'}} fullWidth variant="outlined" onClick={() => setEditDominio(null)}>Cancelar</Button>
                </Paper>
            </Modal>
        </div>
    )
}