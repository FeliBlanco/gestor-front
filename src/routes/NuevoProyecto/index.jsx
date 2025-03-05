import { Box, Breadcrumbs, Button, Card, Link, MenuItem, Select, TextField, Typography } from "@mui/material";
import Menu from "../../components/Menu";
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useState } from "react";

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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

export default function NuevoProyecto() {

    const [getData, setData] = useState({
        nombre: '',
        git_repo: '',
        framework:'-',
        build_settings: {
            build_command: 'npm run build',
            install_command: 'npm install',
            ouput_directory:'dist'
        },
        enviroment_variables: [
            {
                key: '',
                value: ''
            }
        ]
    })

    const [getFrameworks, setFrameworks] = useState([
        {
            nombre: 'Vite JS',
            type:'front'
        },
        {
            nombre: 'React JS',
            type:'front'
        },
        {
            nombre:'Express',
            type:'back'
        },
        {
            nombre:'Django',
            type:'back'
        }
    ])

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
            i.enviroment_variables[index].key = value;
            return {...i}
        })
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
                        <TextField value={getData.git_repo} onChange={(e) => setData(i => ({...i, git_repo: e.target.value}))} sx={{margin:'10px 0'}} fullWidth size="small" placeholder="Repositorio de GitHub"/>
                        <Select sx={{margin:'10px 0'}} size="small" fullWidth value={getData.framework} onChange={(e) => setData(i => ({...i, framework: e.target.value}))}>
                            <MenuItem value="-" disabled>Elegir Framework</MenuItem>
                            {
                                getFrameworks.map((value, index) => <MenuItem key={`dsd-${index}`} value={value.nombre}>{value.nombre}</MenuItem>)
                            }
                        </Select>
                        <Box>
                            <Accordion disableGutters elevation={0} square>
                                <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                    <Typography>Build and Output Settings</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField sx={{margin:'10px 0'}} value={getData.build_settings.build_command} onChange={(e) => setData(i => ({...i, build_command: e.target.value}))} size="small" fullWidth label="Build Command"/>
                                    <TextField sx={{margin:'10px 0'}} value={getData.build_settings.ouput_directory} onChange={(e) => setData(i => ({...i, ouput_directory: e.target.value}))} size="small" fullWidth label="Output directory"/>
                                    <TextField sx={{margin:'10px 0'}} value={getData.build_settings.install_command} onChange={(e) => setData(i => ({...i, install_command: e.target.value}))} size="small" fullWidth label="Install Command"/>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disableGutters elevation={0} square>
                                <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                    <Typography>Enviroment Variables</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
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
                            <Button fullWidth variant="contained">Crear</Button>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </Box>
    )
}