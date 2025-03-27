import { Box, Button, CircularProgress, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ConfigComponent({proyecto_id}) {
    const [getConfig, setConfig] = useState(null)
    const [getFrameworks, setFrameworks] = useState(null)


    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get(`${import.meta.env.VITE_APP_API_URL}/framework/`)
                console.log(result.data)
                setFrameworks(result.data)
            }
            catch(err) {}
        })();
        (async () => {
            try {
                const result = await axios.get(`${import.meta.env.VITE_APP_API_URL}/proyecto/config/${proyecto_id}`)
                console.log(result.data)
                setConfig(result.data)
            }
            catch(err) {}
        })()
    }, [])


    useEffect(() => {
        try {
            const framework = getFrameworks.find(j => j.id == getConfig.framework);
            if(framework) {
                const decode_data = JSON.parse(framework.build_settings)
                setConfig(i => ({
                    ...i,
                    install_command: decode_data.install_command,
                    build_command: decode_data.build_command,
                    output_directory: decode_data.output_directory,
                    start_command: decode_data.start_command,
                }))
            }
        }
        catch(err) {
    
        }
    }, [getConfig?.framework])
    
    return (
        <Box>
            {
                getConfig == null ?
                <CircularProgress />
                :
                <Paper sx={{padding:'20px'}}>
                    <Typography fontWeight={"bold"} textTransform={"uppercase"} color="text.secondary">Configuraciones</Typography>
                    <Box display="flex" gap="20px" alignItems={"center"}>
                        <TextField sx={{flex:1}} margin="normal" label="Repositorio" size="small" value={getConfig.repositorio}/>
                        <TextField size="small" margin="normal" label="Rama" value={getConfig.rama}/>
                    </Box>
                    <TextField margin="normal" label="Install Command" fullWidth size="small" value={getConfig.install_command}/>
                    <TextField margin="normal" label="Build Command" fullWidth size="small" value={getConfig.build_command}/>
                    <TextField margin="normal" label="Output Directory" fullWidth size="small" value={getConfig.output_directory}/>
                    <TextField margin="normal" label="Start Command" fullWidth size="small" value={getConfig.start_command}/>
                    <Typography>Framework</Typography>
                    <Select onChange={(e) => setConfig(i => ({...i, framework: e.target.value}))} value={getConfig.framework_id} size="small" fullWidth>
                        {getFrameworks?.map((value, index) => <MenuItem value={value.id} key={`f-${index}`}>{value.nombre}</MenuItem>)}
                    </Select>
                    <Box sx={{margin:'20px 0'}} display="flex" justifyContent={"space-between"}>
                        <Button>Restablecer</Button>
                        <Button>Guardar</Button>
                    </Box>
                </Paper>
            }
        </Box>
    )
}