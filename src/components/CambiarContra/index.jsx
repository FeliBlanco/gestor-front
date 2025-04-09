import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Menu from "../Menu";
import { useState } from "react";
import axios from "axios";
import useUser from "../../hooks/useUser";
import useFetch from "../../hooks/useFetch";

export default function CambiarContra() {

    const { postFetch } = useFetch()
    const { setUserData } = useUser()

    const [getData, setData] = useState({
        password: '',
        password2: ''
    })

    const [getErrores, setErrores] = useState({
        password:'',
        password2:''
    })

    const submitLogin = async () => {
        if(getData.password.length < 2 || getData.password.length > 80) return setErrores(i => ({...i, password: "Ingresa una contraseña válida."}))
        if(getData.password != getData.password2) return setErrores(i => ({...i, password2: "La contraseña no coinciden."}))
        try {
            await postFetch(`${import.meta.env.VITE_APP_API_URL}/user/change_password`, {
                password: getData.password
            })
            setUserData(i => ({...i, cambio_contra: 1}))
        }
        catch(err) {

        }
    }
    return (
        <Box sx={{height:'100vh', display:'flex', flexDirection:'column'}}>
            <Menu/>
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', flex:1}}>
                <Paper elevation={3} sx={{padding:4, width:{xs:'90%', md:'450px'}}}>
                    <Typography variant="h5" align="center" gutterBottom>Cambiar contraseña</Typography>
                    <Typography align="center" gutterBottom fontSize="12px">Por seguridad, debes cambiar la contraseña. Ingresa una nueva clave.</Typography>
                    <TextField type="password" helperText={getErrores.password} error={getErrores.password.length > 0} value={getData.password} onChange={(e) => setData(i => ({...i, password: e.target.value}))} variant="outlined" margin="normal" fullWidth size="small" placeholder="Nueva contraseña"/>
                    <TextField type="password" helperText={getErrores.password2} error={getErrores.password2.length > 0} value={getData.password2} onChange={(e) => setData(i => ({...i, password2: e.target.value}))} variant="outlined" margin="normal" fullWidth size="small" placeholder="Confirma la contraseña"/>
                    <Button onClick={() => submitLogin()} sx={{ mt: 2 }} color="primary" fullWidth variant="contained">Cambiar contraseña</Button>
                </Paper>
            </Box>
        </Box>
    )
}