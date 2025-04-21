import { Box, Breadcrumbs, Button, Link, Tab, Tabs, Typography } from "@mui/material";
import Menu from "../../components/Menu";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ProjectData from "./components/ProjectData";
import BuildComponent from "./components/BuildComponent";
import DominiosComponent from "./components/DominiosComponent";
import ConfigComponent from "./components/ConfigComponent";
import LogsComponent from "./components/LogsComponent";
import useSocket from "../../hooks/useSocket";
import DatabaseComponent from "./components/DatabaseComponent";
import useFetch from "../../hooks/useFetch";
import MiembrosComponent from "./components/MiembrosComponent";


export default function Proyecto() {

    const { grupo, proyecto } = useParams()
    const { getFetch } = useFetch()
    const getSocket = useSocket()

    const [getData, setData] = useState(null)
    
    const [getIndexTab, setIndexTab] = useState(0)
    const [getLoaded, setLoaded] = useState(false)


    useEffect(() => {
        if(getSocket && getData && getLoaded == false) {
            getSocket.emit('join-project', getData.id)
            setLoaded(true)
        }
        if(getSocket && getData) {
            getSocket.on('change_status', (status) => {
                setData(i => ({...i, status}))
            })
        }
        return () => {
            getSocket?.off('change_status')
        }
    }, [getSocket, getData])


    useEffect(() => {
        (async() => {
            if(proyecto && grupo) {
                try {
                    const result = await getFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/${grupo}/${proyecto}`, {
                        timeout: 60000
                    })
                    setData(result.data)
                }
                catch(err) {

                }
            }
        })()
    }, [proyecto, grupo])



    const handleChangeTabIndex = (event, newValue) => {
        setIndexTab(newValue);
      };
    return (
        <Box>
            <Menu />
            <Box sx={{padding:'20px'}}>
                <Breadcrumbs>
                    <Link underline="hover" color="inherit" href="/">Inicio</Link>
                    <Link underline="hover" color="inherit" href={`/${grupo}`}>{grupo}</Link>
                    <Typography sx={{ color: 'text.primary' }}>{getData?.nombre}</Typography>
                </Breadcrumbs>
                <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Box>
                        <Typography fontSize="2rem" lineHeight={"2.5rem"} fontWeight={600} >{getData?.nombre}</Typography>
                    </Box>
                </Box>
                <Box sx={{ overflowX: 'auto', width: '100%' }}>
                    <Tabs value={getIndexTab} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile onChange={handleChangeTabIndex} sx={{borderRadius:'10px 10px 0 0'}}>
                        <Tab label="Proyecto" />
                        <Tab label="Build" />
                        <Tab label="Dominios" />
                        <Tab label="Terminal" />
                        <Tab label="Base de datos" />
                        <Tab label="Configuraciones" />
                        <Tab label="Miembros" />
                    </Tabs>
                    <CustomTabPanel value={getIndexTab} index={0}>
                        <ProjectData data={getData} grupo={grupo} proyecto={proyecto} onChangeData={setData}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={getIndexTab} index={1}>
                        <BuildComponent data={getData} grupo={grupo} proyecto={proyecto} onChangeData={setData}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={getIndexTab} index={2}>
                        <DominiosComponent proyecto_id={getData?.id}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={getIndexTab} index={3}>
                        <LogsComponent proyecto_id={getData?.id}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={getIndexTab} index={4}>
                        <DatabaseComponent proyecto_id={getData?.id} proyecto_usuario={getData?.usuario}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={getIndexTab} index={5}>
                        <ConfigComponent proyecto_id={getData?.id}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={getIndexTab} index={6}>
                        <MiembrosComponent proyecto_id={getData?.id}/>
                    </CustomTabPanel>
            
                </Box>
            </Box>
        </Box>
    )
}

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }