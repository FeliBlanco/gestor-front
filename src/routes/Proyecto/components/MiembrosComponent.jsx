import { Avatar, Box, Button, Checkbox, IconButton, ListItem, Menu, MenuItem, Modal, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useUser from "../../../hooks/useUser";

export default function MiembrosComponent({proyecto_id}) {

    const { getUserData } = useUser()
    const { getFetch, deleteFetch } = useFetch()
    const [getMiembros, setMiembros] = useState([])
    const [isModalOpenAddMember, setModalOpenAddMember] = useState(false)

    useEffect(() => {
        (async() => {
            try {
                const response = await getFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/miembros/${proyecto_id}`)
                setMiembros(response.data)
            }
            catch(err) {

            }
        })()
    }, [])


    const sacarMiembro = async miembro_id => {
        try {
            await deleteFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/miembro/${proyecto_id}/${miembro_id}`)
            setMiembros(i => {
                i = i.filter(j => j.id != miembro_id)
                return [...i]
            })
        }
        catch(err) {
            alert("error")
        }
    }

    const onAddMembers = new_members => {
        setMiembros(i => {
            return [...i, ...new_members]
        })
    }
    return (
        <Box>
            <Typography textTransform={"uppercase"}>Miembros</Typography>
            <Typography sx={{fontSize:'14px', color:'text.secondary'}}>Los participantes de este proyecto se mostrarán acá</Typography>
            <Box sx={{margin:'20px 0'}}>
                <Box sx={{width:{xs:'90%', md:'300px'}}}>
                    {
                        getMiembros.map((value, index) => <MemberItem key={`user-${index}`} value={value} onDelete={() => sacarMiembro(value.id)} isAdmin={getUserData.admin == 1}/>)
                    }
                </Box>
                {
                    getMiembros.length == 0 &&
                    <Box>
                        <Typography>No hay miembros asignados a este proyecto.</Typography>
                    </Box>
                }
                {getUserData.admin ==1 && <Button sx={{margin:'20px 0'}} variant="contained" fullW startIcon={<AddIcon />} onClick={() => setModalOpenAddMember(true)}>Agregar miembro</Button>}
            </Box>
            {isModalOpenAddMember == true && <ModalAgregarMiembro onAddMembers={onAddMembers} onClose={() => setModalOpenAddMember(false)} members={getMiembros.map(value => value.id)} proyecto_id={proyecto_id}/>}
        </Box>
    )
}

const MemberItem = ({value, onDelete, isAdmin}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const fecha = new Date();
    fecha.setTime(value.fecha)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <ListItem sx={{display:'flex', justifyContent:'space-between', cursor:'pointer', userSelect:'none'}}>
            <Box sx={{display:'flex', alignItems:'center', gap:'10px'}}>
                <Avatar sx={{ width: 24, height: 24 }}/>
                <Box>
                    <Typography>{value.username}</Typography>
                    <Typography sx={{fontSize:'12px', color:'text.secondary'}}>Agregado el {fecha.toLocaleDateString()}</Typography>
                </Box>
            </Box>
            {
                isAdmin == true &&
                <>
                    <IconButton onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={() => onDelete()}>Eliminar miembro</MenuItem>
                    </Menu>
                </>
            }
        </ListItem>
    )
}


const ModalAgregarMiembro = ({onClose, members = [], proyecto_id, onAddMembers}) => {

    const { getFetch, postFetch } = useFetch()

    const [getBuscador, setBuscador] = useState('')
    const [getResult, setResult] = useState(null)
    const [getSelects, setSelects] = useState([])

    useEffect(() => {
        (async() => {
            try {
                const response = await getFetch(`${import.meta.env.VITE_APP_API_URL}/user/search?query=${getBuscador}`)
                setResult(response.data)
            }
            catch(err) {

            }
        })()
    }, [getBuscador])


    const onSelect = (id) => {
        setSelects(i => {
            if(i.includes(id)) {
                i = i.filter(j => j != id)
            } else {
                i.push(id)
            }
            return [...i]
        })
    }

    const agregarUsuarios = async () => {
        if(getSelects.length == 0) return;
        try {
            const response = await postFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/asignar_usuario/${proyecto_id}`, {
                usuarios: getSelects
            })
            onClose()
            onAddMembers(response.data)
        }
        catch(err) {
            alert("error")
        }
    }
    return (
            <Modal open={true} sx={{display:'flex', alignItems:'center', justifyContent:'center'}} onClose={() => onClose()}>
                <Paper sx={{width:{xs:'90%', md:'450px'}, padding:'20px'}}>
                    <Typography sx={{fontSize:'18px'}}>Agregar miembro</Typography>
                    <Box sx={{margin:'10px 0'}}>
                        <TextField value={getBuscador} onChange={e => setBuscador(i => e.target.value)} sx={{margin:'5px 0'}} size="small" fullWidth placeholder="Buscar usuario..."/>
                        {
                            getResult && getResult.map((value, index) => {
                                const selected = getSelects.includes(value.id)
                                const is_member = members.includes(value.id)

                                return <MenuItem key={`dd-${index}`} onClick={() => onSelect(value.id)} disabled={is_member}>
                                    {
                                        getSelects.length > 0 && <Checkbox sx={{height:'10px'}} checked={selected}/>
                                    }
                                    <Typography>{value.username}</Typography>
                                </MenuItem>
                            })
                        }
                        {getResult?.length == 0 && <Typography sx={{fontSize:'14px', margin:'10px 0'}}>No se encontraron resultados para la búsqueda.</Typography>}
                    </Box>
                    <Button fullWidth variant="contained" disabled={!getSelects.length > 0} onClick={() => agregarUsuarios()}>Agregar</Button>
                </Paper>
            </Modal>
    )
}