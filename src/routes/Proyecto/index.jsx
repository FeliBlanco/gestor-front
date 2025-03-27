import { Box, Breadcrumbs, Button, Link, Tab, Tabs, Typography } from "@mui/material";
import Menu from "../../components/Menu";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ProjectData from "./components/ProjectData";
import BuildComponent from "./components/BuildComponent";
import DominiosComponent from "./components/DominiosComponent";
import ConfigComponent from "./components/ConfigComponent";
import LogsComponent from "./components/LogsComponent";


export default function Proyecto() {

    const { grupo, proyecto } = useParams()

    const [getData, setData] = useState(null)
    
    const [getIndexTab, setIndexTab] = useState(0)


    useEffect(() => {
        (async() => {
            if(proyecto && grupo) {
                try {
                    const result = await axios.get(`${import.meta.env.VITE_APP_API_URL}/proyecto/${grupo}/${proyecto}`, {
                        timeout: 60000
                    })
                    console.log(result.data)
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
                        <Typography fontSize="2rem" lineHeight={"2.5rem"} fontWeight={600} sx={{color:'#212121'}}>{getData?.nombre}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Tabs value={getIndexTab} onChange={handleChangeTabIndex} sx={{background:'#fff', borderRadius:'10px 10px 0 0'}}>
                        <Tab label="Proyecto" />
                        <Tab label="Build" />
                        <Tab label="Dominios" />
                        <Tab label="Logs" />
                        <Tab label="Configuraciones" />
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
                        <ConfigComponent proyecto_id={getData?.id}/>
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