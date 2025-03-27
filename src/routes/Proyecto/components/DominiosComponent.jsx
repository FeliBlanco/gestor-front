import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DominiosComponent({proyecto_id}) {
    const [getAddData, setAddData] = useState(null)
    const [getDominios, setDominios] = useState([])
    const [getAlert, setAlert] = useState(false)


    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/proyecto/dominios/${proyecto_id}`)
                setDominios(response.data)
                console.log(response.data)
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
            await axios.post(`${import.meta.env.VITE_APP_API_URL}/proyecto/dominio`, {
                ...getAddData,
                proyecto_id
            })
            setAddData(null)
            setAlert(true)
        }
        catch(err) {

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
                    <Button onClick={() => submitAgDominio()} fullWidth variant="contained">Agregar dominio</Button>
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
                <Box display="grid" gridTemplateColumns={"repeat(3, 1fr)"} gap="20px">
                    {
                        getDominios.map((value, index) => {
                            return (
                                <Paper key={`dsd-${index}`} sx={{padding:'20px'}}>
                                    <TextField margin="normal" size="small" fullWidth value={value.dominio} multiline disabled/>
                                    <TextField size="small" fullWidth value={value.configuracion} multiline disabled/>
                                </Paper>
                            )
                        })
                    }
                </Box>
            }
        </div>
    )
}