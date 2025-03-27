import { Box, Card, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import PolylineIcon from '@mui/icons-material/Polyline';
import CommitIcon from '@mui/icons-material/Commit';


const getColoresStatus = (status) => {
    if(status == "error") return 'red'
    if(status == "success") return 'green'
    return 'white'
}

const getStatusName = status => {
    if(status == "error") return 'Error'
    if(status == "success") return 'Ready'
    return '-'    
}
export default function BuildComponent({data}) {

    const [getBuilds, setBuilds] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get(`${import.meta.env.VITE_APP_API_URL}/build/${data.id}`)
                console.log(result.data)
                setBuilds(result.data)
            }
            catch(err) {}
        })()
    }, [])
    return (
        <Box>
            <Card sx={{padding:'20px'}}>
                {
                    getBuilds.map((value, index) => {
                        return (
                            <Box key={`lid-${index}`} sx={{display:'flex', justifyContent:'space-between'}}>
                                <Box flex={1}>
                                    <Typography>{value.fecha}</Typography>
                                </Box>
                                <Box flex={1} display="flex" justifyContent={"center"}>
                                    <Box flex={1}>
                                        <Typography sx={{display:'flex'}}><CommitIcon />{value.commit}</Typography>
                                        <Typography sx={{display:'flex'}}><PolylineIcon />{value.rama}</Typography>
                                    </Box>
                                    <Box flex={1}>
                                        <Typography sx={{display:'flex', alignItems:'center', gap:'5px'}}><Box sx={{width:'12px', height:'12px', background:getColoresStatus(value.status), borderRadius:'100%'}}></Box>{getStatusName(value.status)}</Typography>
                                        <Typography>{value.time || '0'}s</Typography>
                                    </Box>
                                </Box>
                                <Box flex={1} display="flex" justifyContent={"flex-end"}>
                                    <Typography>Feli Blanco</Typography>
                                </Box>
                            </Box>
                        )
                    })
                }
            </Card>
        </Box>
    )
}