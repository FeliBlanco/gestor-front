import { Box, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PolylineIcon from '@mui/icons-material/Polyline';
import CommitIcon from '@mui/icons-material/Commit';
import useFetch from "../../../hooks/useFetch";


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

    const { getFetch } = useFetch()
    const [getBuilds, setBuilds] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const result = await getFetch(`${import.meta.env.VITE_APP_API_URL}/build/${data.id}`)
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
                            <Box key={`lid-${index}`} sx={{display:'flex', justifyContent:'space-between', margin:'14px 0'}}>
                                <Box flex={1} display="flex" flexDirection={"row"} alignItems={"center"}>
                                    <Typography>{value.fecha}</Typography>
                                </Box>
                                <Box flex={1} display="flex" justifyContent={"center"}>
                                    <Box flex={1}>
                                        <Typography sx={{display:'flex', fontSize:'14px'}}><CommitIcon sx={{fontSize:'18px'}}/>{value.commit}</Typography>
                                        <Typography sx={{display:'flex', fontSize:'14px'}}><PolylineIcon sx={{fontSize:'18px'}}/>{value.rama}</Typography>
                                    </Box>
                                    <Box flex={1} display="flex" flexDirection={"column"} alignItems={"center"}>
                                        <Typography sx={{display:'flex', alignItems:'center', gap:'5px'}}><Box sx={{width:'12px', height:'12px', background:getColoresStatus(value.status), borderRadius:'100%'}}></Box>{getStatusName(value.status)}</Typography>
                                        <Typography sx={{fontSize:'14px'}}>{Math.floor(value.time / 1000) || '0'}s</Typography>
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