import { Box, Button, CircularProgress, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";

export default function Webhooks() {

    const [getConfig, setConfig] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/webhook/config`)
                setConfig(response.data)
            }
            catch(err) {

            }
        })()
    }, [])

    const agregarURL = () => {
        setConfig(i => {
            i.urls.push("")
            return {...i}
        })
    }

    const guardarCambios = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_APP_API_URL}/webhook/config`, getConfig)
        }
        catch(err) {

        }
    }
    return (
        <Box sx={{width:'100%'}}>
            <Menu />
            <Paper sx={{padding:'20px', margin:'20px'}}>
                {
                    getConfig != null ?
                    <Box>
                        <Typography>URL ORIGEN: https://webhook_0.boolean.com.ar</Typography>
                        <Typography>Destinos:</Typography>
                        <Box sx={{display:'flex', flexDirection:'column', gap:'10px', margin:'20px 0'}}>
                            {
                                getConfig.urls.map((value, index) => {
                                    return (
                                        <TextField key={`lfl${index}`} size="small" label={`Destino ${index + 1}`} value={value} onChange={e => setConfig(i => { i.urls[index] = e.target.value; return {...i} })}/>
                                    )
                                })
                            }
                        </Box>
                        {getConfig.urls.length == 0 && <Typography>No hay URLs de destino.</Typography>}
                        <Button variant="contained" onClick={() => agregarURL() }>Agregar URL destino</Button>
                        <Button variant="contained" onClick={() => guardarCambios() } fullWidth sx={{margin:'20px 0'}}>Guardar</Button>
                    </Box>
                    :
                    <Box sx={{display:'flex', justifyContent:'center'}}>
                        <CircularProgress />
                    </Box>
                }
            </Paper>
        </Box>
    )
}