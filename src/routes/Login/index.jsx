import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Menu from "../../components/Menu";
import { useState } from "react";
import axios from "axios";
import useUser from "../../hooks/useUser";

const datas_default = {
    username: '',
    password: ''   
}

export default function Login() {

    const { userLogin } = useUser()

    const [getData, setData] = useState(datas_default)

    const [getErrores, setErrores] = useState(datas_default)

    const submitLogin = async () => {
        if(getData.username.length < 2) return setErrores(i => ({...datas_default, username: 'Ingresa un nombre de usuario válido.'}))
        if(getData.password.length < 2) return setErrores(i => ({...datas_default, password: 'Ingresa una contraseña válida.'}))
            setErrores(i => ({...datas_default}))
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/user/login`, {
                username: getData.username,
                password: getData.password
            })
            userLogin(response.data)
        }
        catch(err) {
            if(err.status == 403) {
                if(err.response.data == "user not found") {
                    setErrores(i => ({...datas_default, username: 'No se encontró ninguna cuenta con ese nombre de usuario.'}))
                    return;
                } else if(err.response.data == "incorrect password") {
                    setErrores(i => ({...datas_default, password: 'Contraseña incorrecta.'}))
                    return;
                }
            } else {
                alert("Ocurrió un error, intentalo más tarde")
                console.log(err)
            }
        }

    }
    return (
        <Box sx={{height:'100vh', display:'flex', flexDirection:'column'}}>
            <Menu />
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', flex:1}}>
                <Paper elevation={3} sx={{padding:4, width:{xs:'90%', md:'450px'}}}>
                <Typography variant="h5" align="center" gutterBottom>
                    Run Boolean
                    </Typography>
                    <TextField helperText={getErrores.username} error={getErrores.username.length > 0} value={getData.username} onChange={(e) => setData(i => ({...i, username: e.target.value}))} variant="outlined" margin="normal" fullWidth size="small" placeholder="Nombre de usuario"/>
                    <TextField type="password" helperText={getErrores.password} error={getErrores.password.length > 0} value={getData.password} onChange={(e) => setData(i => ({...i, password: e.target.value}))} variant="outlined" margin="normal" fullWidth size="small" placeholder="Contraseña"/>
                    <Button onClick={() => submitLogin()} sx={{ mt: 2 }} color="primary" fullWidth variant="contained">Iniciar sesión</Button>
                </Paper>
            </Box>
        </Box>
    )
}