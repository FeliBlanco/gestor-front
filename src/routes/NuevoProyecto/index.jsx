import { Backdrop, Box, Breadcrumbs, Button, Card, CircularProgress, Link, MenuItem, Select, TextField, Typography } from "@mui/material";
import Menu from "../../components/Menu";
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useEffect, useRef, useState } from "react";

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useParams } from "react-router-dom";
import axios from "axios";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&::before': {
            display: 'none',
        },
    }));
  
    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props}/>
        ))(({ theme }) => ({
            backgroundColor: 'rgba(0, 0, 0, .03)',
            flexDirection: 'row-reverse',
            [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
        {
            transform: 'rotate(90deg)',
        },
        [`& .${accordionSummaryClasses.content}`]: {
            marginLeft: theme.spacing(1),
        },
        ...theme.applyStyles('dark', {
            backgroundColor: 'rgba(255, 255, 255, .05)',
        }),
    }));
  
    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));

const frameworks = {
    node: {
    },
    django: {
        build_command: 'npm run build',
        install_command: 'npm install',
        output_directory:'dist',
        start_command: ''        
    }
}

export default function NuevoProyecto() {

    const { grupo } = useParams()

    const [getGrupoData, setGrupoData] = useState(null)
    const [isCreating, setCreating] = useState(false)

    const [getData, setData] = useState({
        nombre: '',
        git_repo: '',
        framework:'-',
        build_settings: {
            build_command: '',
            install_command: '',
            output_directory:'',
            start_command: ''
        },
        enviroment_variables: [
            {
                key: '',
                value: ''
            }
        ]
    })

    const [getFrameworks, setFrameworks] = useState()

    const refInputEnv = useRef()

    useEffect(() => {
        try {
            const framework = getFrameworks.find(j => j.id == getData.framework);
            if(framework) {
                const decode_data = JSON.parse(framework.build_settings)
                setData(i => ({
                    ...i,
                    build_settings: decode_data
                }))
            }
        }
        catch(err) {

        }
    }, [getData.framework])

    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get(`${import.meta.env.VITE_APP_API_URL}/grupo/${grupo}`)
                setGrupoData(result.data)
            }
            catch(err) {
                if(err.status == 404) {
                    alert("No se encontro el grupo")
                }
            }
        })();
        (async () => {
            try {
                const result = await axios.get(`${import.meta.env.VITE_APP_API_URL}/framework`)
                setFrameworks(result.data)
            }
            catch(err) {

            }
        })();
    }, [grupo])

    const addEnviromentVariable = () => {
        setData(i => {
            i.enviroment_variables.push({key:'', value:''})
            return {...i}
        })
    }

    const deleteEnviromentVariable = index => {
        setData(i => {
            i.enviroment_variables.splice(index, 1)
            return {...i}
        })        
    }

    const changeEnviromentVariableKey = (index, value) => {
        setData(i => {
            i.enviroment_variables[index].key = value;
            return {...i}
        })
    }

    const changeEnviromentVariableValue = (index, value) => {
        setData(i => {
            i.enviroment_variables[index].value = value;
            return {...i}
        })
    }

    const submitProyecto = async () => {
        if(isCreating) return;
        setCreating(true)
        try {
            const result = await axios.post(`${import.meta.env.VITE_APP_API_URL}/proyecto`, {
                ...getData,
                grupo: getGrupoData.id
            })
            window.location.href = `/${getGrupoData.usuario}/${result.data.usuario}`
        }
        catch(err) {
            alert("error al crear")
        }
        finally {
            setCreating(false)
        }
    }

    if(getGrupoData == null) return <CircularProgress />

    const changeLoadEnv = e => {
        const file = e.target.files[0];
        if(file && file.name.endsWith(".env")) {
            const reader = new FileReader()
            reader.onload = function (result) {
                const content = result.target.result;
                const lines = content.split(/\r?\n/);
                const envArray = [];
                lines.forEach(line => {
                    if(line.trim() && !line.startsWith("#")) {
                        const [key, value] = line.split("=");
                        envArray.push({ key: key.trim(), value: value ? value.trim() : "" });
                    }
                });
                if(envArray.length > 0) {
                    setData(i => {
                        i.enviroment_variables.push(...envArray)
                        return {...i}
                    })
                }
            };

            reader.readAsText(file);
        } else {
            e.target.value = "";
        }
    }
    return (
        <Box sx={{width:'100%'}}>
            <Menu />
            <Box sx={{padding:'20px'}}>
                <Breadcrumbs>
                    <Link underline="hover" color="inherit" href="/">Inicio</Link>
                    <Link underline="hover" color="inherit" href={`/${getGrupoData.usuario}`}>{getGrupoData.nombre}</Link>
                    <Typography sx={{ color: 'text.primary' }}>Crear nuevo proyecto</Typography>
                </Breadcrumbs>
                <Box sx={{margin:'0 20px', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Card sx={{padding:'20px', width:{xs:'100%', md:'550px'}}}>
                        <Typography fontSize="24px">Crear nuevo proyecto</Typography>
                        <TextField value={getData.nombre} onChange={(e) => setData(i => ({...i, nombre: e.target.value}))} sx={{margin:'10px 0'}} fullWidth size="small" placeholder="Nombre del proyecto"/>
                        <Box display="flex" gap="20px">
                            <TextField value={getData.git_repo} onChange={(e) => setData(i => ({...i, git_repo: e.target.value}))} sx={{margin:'10px 0'}} fullWidth size="small" placeholder="Repositorio de GitHub"/>
                            <TextField value={getData.rama} onChange={(e) => setData(i => ({...i, rama: e.target.value}))} sx={{margin:'10px 0', width:'30%'}} fullWidth size="small" placeholder="Rama"/>
                        </Box>
                        <Select sx={{margin:'10px 0'}} size="small" fullWidth value={getData.framework} onChange={(e) => setData(i => ({...i, framework: e.target.value}))}>
                            <MenuItem value="-" disabled>Elegir Framework</MenuItem>
                            {
                                getFrameworks?.map((value, index) => <MenuItem key={`dsd-${index}`} value={value.id}>{value.nombre}</MenuItem>)
                            }
                        </Select>
                        <Box>
                            <Accordion disableGutters elevation={0} square>
                                <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                    <Typography>Build and Output Settings</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField sx={{margin:'10px 0'}} value={getData.build_settings.install_command} onChange={(e) => setData(i => ({...i, build_settings: {...i.build_settings, install_command: e.target.value}}))} size="small" fullWidth label="Install Command"/>
                                    <TextField sx={{margin:'10px 0'}} value={getData.build_settings.build_command} onChange={(e) => setData(i => ({...i, build_settings: {...i.build_settings, build_command: e.target.value}}))} size="small" fullWidth label="Build Command"/>
                                    <TextField sx={{margin:'10px 0'}} value={getData.build_settings.output_directory} onChange={(e) => setData(i => ({...i, build_settings: {...i.build_settings, output_directory: e.target.value}}))} size="small" fullWidth label="Output directory"/>
                                    <TextField sx={{margin:'10px 0'}} value={getData.build_settings.start_command} onChange={(e) => setData(i => ({...i, build_settings: {...i.build_settings, start_command: e.target.value}}))} size="small" fullWidth label="Start Command"/>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disableGutters elevation={0} square>
                                <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                    <Typography>Enviroment Variables</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <input style={{display:'none'}} type="file" accept=".env" onChange={changeLoadEnv} ref={refInputEnv}/>
                                    <Button startIcon={<FileUploadIcon />} onClick={() => refInputEnv.current.click()}>Cargar .env</Button>
                                    {
                                        getData.enviroment_variables.length > 0 &&
                                        <table style={{width:'100%'}}>
                                            <tr>
                                                <td style={{flex:1}}><Typography fontSize="14px">Key</Typography></td>
                                                <td style={{flex:1}}><Typography fontSize="14px">Value</Typography></td>
                                                <td></td>
                                            </tr>
                                            {
                                                getData.enviroment_variables.map((value, index) => {
                                                    return (
                                                        <tr key={`rd-${index}`}>
                                                            <td style={{flex:1}}>
                                                                <TextField value={value.key} onChange={(e) => changeEnviromentVariableKey(index, e.target.value)} size="small" placeholder="EXAMPLE_NAME"/>
                                                            </td>
                                                            <td style={{flex:1}}>
                                                                <TextField value={value.value} onChange={(e) => changeEnviromentVariableValue(index, e.target.value)} size="small" placeholder="RKDOiOINsloDShXCJIM7"/>
                                                            </td>
                                                            <td>
                                                                <Button variant="outlined" sx={{borderColor:'#e1e1e1'}} onClick={() => deleteEnviromentVariable(index)}><RemoveIcon sx={{color:'#000'}}/></Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </table>
                                    }
                                    <Box sx={{margin:'20px 0'}}>
                                        <Button size="small" color="texts.primary" variant="outlined" sx={{textTransform:'capitalize', fontWeight:'bold'}} startIcon={<AddIcon />} onClick={() => addEnviromentVariable()}>Add More</Button>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                        <Box sx={{marginTop:'20px'}}>
                            <Button fullWidth variant="contained" onClick={() => submitProyecto()}>Crear</Button>
                        </Box>
                    </Card>
                </Box>
            </Box>
            <Backdrop open={isCreating}>
                <CircularProgress sx={{color:'#fff'}}/>
            </Backdrop>
        </Box>
    )
}