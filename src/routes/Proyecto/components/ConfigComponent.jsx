import { Backdrop, Box, Button, CircularProgress, Divider, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import useFetch from "../../../hooks/useFetch";
import useUser from "../../../hooks/useUser";


export default function ConfigComponent({proyecto_id}) {
    const { getUserData } = useUser()
    const { getFetch, deleteFetch, putFetch } = useFetch()
    const [getConfig, setConfig] = useState(null)
    const [getData, setData] = useState(null)
    const [getFrameworks, setFrameworks] = useState(null)
    const [isLoading, setLoading] = useState(false)
    
    
    useEffect(() => {
        (async () => {
            try {
                const result = await getFetch(`${import.meta.env.VITE_APP_API_URL}/framework/`)
                setFrameworks(result.data)
            }
            catch(err) {}
        })();
        (async () => {
            try {
                const result = await getFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/config/${proyecto_id}`)
                console.log(result.data)
                setData(result.data)
            }
            catch(err) {}
        })()
    }, [])
    
    const isEnableButton = !(JSON.stringify(getData) === JSON.stringify(getConfig))

    useEffect(() => {
        if(getData) {
            setConfig(i => structuredClone(getData))
        }
    }, [getData])


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
    
    const eliminarProyecto = async () => {
        if(isLoading) return;
        if(confirm("¿Estás seguro que quieres eliminar el proyecto?")) {
            setLoading(true)
            try {
                await deleteFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/${proyecto_id}`)
                alert("Eliminado!")
                window.location.href = "/"
            }
            catch(err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }
    }

    const addEnviromentVariable = () => {
        setConfig(i => {
            i.env_vars.push({key:'', value:''})
            return {...i}
        })
    }

    const deleteEnviromentVariable = index => {
        setConfig(i => {
            i.env_vars.splice(index, 1)
            return {...i}
        })
    }

    const changeEnviromentVariableKey = (index, value) => {
        setConfig(i => {
            if(i.env_vars[index].key.length == 0 && value.length > 3 && value.indexOf('=') != -1) {
                const partes = value.split('=')
                i.env_vars[index].key = partes[0];
                if(partes[1]) {
                    i.env_vars[index].value = partes[1];
                }
            } else {
                i.env_vars[index].key = value;
            }
            return {...i}
        })
    }

    const changeEnviromentVariableValue = (index, value) => {
        setConfig(i => {
            i.env_vars[index].value = value;
            return {...i}
        })
    }

    const restablecerTodo = () => {
        setConfig(i => structuredClone(getData))
    }

    const saveData = async () => {
        setLoading(true)
        try {
            console.log(proyecto_id)
            await putFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/${proyecto_id}`, {
                ...getConfig
            })
            setData(i => ({...getConfig}))
        }
        catch(err) {
            alert("Error al guardar")
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <Box>
            {
                getConfig == null ?
                <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', flex:1}}>
                    <CircularProgress />
                </Box>
                :
                <>

                    <Paper sx={{padding:'20px'}}>
                        <Typography fontWeight={"bold"} textTransform={"uppercase"} color="text.secondary">Configuraciones</Typography>
                        <Box display="flex" gap="20px" alignItems={"center"}>
                            <TextField sx={{flex:1}} margin="normal" label="Repositorio" size="small" value={getConfig.repositorio} disabled/>
                            <TextField size="small" margin="normal" label="Rama" value={getConfig.rama} onChange={(e) => setConfig(i => ({...i, rama: e.target.value}))}/>
                        </Box>
                        <TextField margin="normal" label="Commit" fullWidth size="small" value={getConfig.build_commit} onChange={(e) => setConfig(i => ({...i, build_commit: e.target.value}))}/>
                        <TextField margin="normal" label="Install Command" fullWidth size="small" value={getConfig.install_command} onChange={(e) => setConfig(i => ({...i, install_command: e.target.value}))}/>
                        <TextField margin="normal" label="Build Command" fullWidth size="small" value={getConfig.build_command} onChange={(e) => setConfig(i => ({...i, build_command: e.target.value}))}/>
                        <TextField margin="normal" label="Output Directory" fullWidth size="small" value={getConfig.output_directory} onChange={(e) => setConfig(i => ({...i, output_directory: e.target.value}))}/>
                        <TextField margin="normal" label="Start Command" fullWidth size="small" value={getConfig.start_command} onChange={(e) => setConfig(i => ({...i, start_command: e.target.value}))}/>
                        <TextField margin="normal" label="PORT" fullWidth size="small" value={getConfig.system_port} onChange={(e) => setConfig(i => ({...i, system_port: e.target.value}))}/>
                        <Typography>Framework</Typography>
                        <Select disabled onChange={(e) => setConfig(i => ({...i, framework: e.target.value}))} value={getConfig.framework_id} size="small" fullWidth>
                            {getFrameworks?.map((value, index) => <MenuItem value={value.id} key={`f-${index}`}>{value.nombre}</MenuItem>)}
                        </Select>
                        <TextField margin="normal" label="Docker System" fullWidth size="small" value={getConfig.sistema_docker} onChange={(e) => setConfig(i => ({...i, sistema_docker: e.target.value}))}/>
                        <Divider sx={{margin:'10px 0'}}/>
                        <Typography fontWeight={"bold"} textTransform={"uppercase"} color="text.secondary">Variables de entorno</Typography>
                        <Box>
                            <table>
                                <tr>
                                    <td style={{flex:1}}><Typography fontSize="14px">Key</Typography></td>
                                    <td style={{flex:1}}><Typography fontSize="14px">Value</Typography></td>
                                    <td></td>
                                </tr>
                                {
                                    getConfig.env_vars.map((value, index) => {
                                        return (
                                            <tr key={`rd-${index}`}>
                                                <td style={{flex:1}}>
                                                    <TextField value={value.key} onChange={(e) => changeEnviromentVariableKey(index, e.target.value)} size="small" placeholder="EXAMPLE_NAME"/>
                                                </td>
                                                <td style={{flex:1}}>
                                                    <TextField value={value.value} onChange={(e) => changeEnviromentVariableValue(index, e.target.value)} size="small" placeholder="RKDOiOINsloDShXCJIM7"/>
                                                </td>
                                                <td>
                                                    <Button variant="outlined" sx={{borderColor:'#e1e1e1'}} onClick={() => deleteEnviromentVariable(index)}><RemoveIcon sx={{color:'text.primary'}}/></Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                            <Box sx={{margin:'20px 0'}}>
                                <Button size="small" color="texts.primary" variant="outlined" sx={{textTransform:'capitalize', fontWeight:'bold'}} startIcon={<AddIcon />} onClick={() => addEnviromentVariable()}>Add More</Button>
                            </Box>
                        </Box>
                        <Box sx={{margin:'20px 0'}} display="flex" justifyContent={"space-between"}>
                            <Button variant="contained" onClick={() => restablecerTodo()} disabled={!isEnableButton}>Restablecer</Button>
                            <Button variant="contained" disabled={!isEnableButton} onClick={() => saveData()}>Guardar</Button>
                        </Box>
                    </Paper>
                    {
                        getUserData.admin == 1 &&
                        <Paper sx={{ padding: "24px", margin: "20px 0", textAlign: "center" }}>
                            <Stack spacing={2} alignItems="center">
                                <Typography component="h1" variant="h5" fontWeight="bold">
                                ¿Eliminar {getConfig.nombre || "proyecto_name"}?
                                </Typography>
                                <Typography color="error">
                                Una vez que elimines el proyecto, no puedes recuperarlo. Toda la información de la instancia se perderá.
                                </Typography>
                                <Button variant="contained" color="error" onClick={() => eliminarProyecto()}>
                                Eliminar proyecto
                                </Button>
                            </Stack>
                        </Paper>
                    }
                </>
            }
            <Backdrop open={isLoading}>
                <CircularProgress sx={{color:'#fff'}}/>
            </Backdrop>
        </Box>
    )
}