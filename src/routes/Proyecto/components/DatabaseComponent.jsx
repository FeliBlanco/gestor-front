import { Box, Button, Card, CardActions, CardContent, Divider, IconButton, InputAdornment, ListItem, MenuItem, Modal, Paper, Select, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/AddCircleOutline";
import useFetch from "../../../hooks/useFetch";

import {
    ContentCopy,
    Delete,
    Edit,
    CloudDone,
    CloudOff,
    Visibility,
    VisibilityOff 
  } from '@mui/icons-material';

export default function DatabaseComponent({proyecto_usuario, proyecto_id}) {
    const { postFetch, getFetch } = useFetch()
    const [getDBs, setDBs] = useState([])
    const [getCreateDBData, setCreateDBData] = useState(null)

    const nuevo_usuario = proyecto_usuario.replaceAll('-', '_').replaceAll(' ', '') + '_'


    useEffect(() => {
        (async() => {
            try {
                const response = await getFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/databases/${proyecto_id}`)
                console.log("KK")
                console.log(response.data)
                setDBs(i => response.data)
            }
            catch(err) {

            }
        })()
    }, [])

    const onCreate = () => {
        setCreateDBData({
            nombre: ''
        })
    }

    const crearDB = async () => {
        try {
            if(getCreateDBData.nombre.length < 3) return alert("Ingresa un nombre valido")
            const nombre_db = `${nuevo_usuario}${getCreateDBData.nombre}`
            await postFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/create_database/${proyecto_id}`, {
                nombre: nombre_db
            })
        }
        catch(err) {

        }
    }
    return (
        <Box>
            {
                getDBs.length == 0 ?
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="250px"
                        p={3}
                        textAlign="center"
                        sx={{
                            borderRadius: 2,
                            boxShadow: 1,
                        }}
                        >
                        <AddIcon color="action" sx={{ fontSize: 60, mb: 2 }} />
                        <Typography variant="h6" color="textSecondary">
                            No hay bases de datos creadas
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                            Crea una nueva base de datos para comenzar a gestionar la información.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={onCreate}
                        >
                            Crear base de datos
                        </Button>
                    </Box>
                    :
                    <Box sx={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)'}}>
                        {getDBs.map((value, index) => {
                            return <DBCard
                                key={`ds-${index}`}
                                nombre={value.nombre}
                                usuario={value.database_name}
                                password={value.database_password}
                            />
                        })}
                    </Box>
            }
            <Modal open={getCreateDBData != null} sx={{display:'flex', justifyContent:'center', alignItems:'center'}} onClose={() => setCreateDBData(null)}>
                <Paper sx={{padding:'20px', width:{xs:'90%', md:'500px'}}}>
                    <Typography variant="h5">Crear Base de Datos</Typography>
                    <TextField
                        value={getCreateDBData?.nombre}
                        onChange={e => setCreateDBData(i => ({...i, nombre: e.target.value}))}
                        margin="normal"
                        fullWidth
                        size="small"
                        label="Nombre"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {nuevo_usuario}
                                </InputAdornment>
                            )
                        }}/>
                    <Select margin="normal" value={"postgresql"} disabled fullWidth size="small">
                        <MenuItem value="postgresql">PostgreSQL</MenuItem>
                    </Select>
                    <Button sx={{margin:'20px 0'}} variant="contained" fullWidth onClick={() => crearDB()}>Crear base de datos</Button>
                </Paper>
            </Modal>
        </Box>
    )
}

const DBCard = ({
    nombre,
    usuario,
    password,
    tipo,
    fecha,
    online,
    onDelete,
    onEdit,
    onTest
    }) => {
        const [showPassword, setShowPassword] = useState(false);

        const handleCopy = (text) => {
            navigator.clipboard.writeText(text);
        };
  
    return (
      <Card variant="outlined" sx={{width:'100%', margin: '1rem auto' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {nombre}
          </Typography>
  
          <Typography variant="body2">
            <strong>Usuario:</strong> {usuario}{' '}
            <Tooltip title="Copiar usuario">
              <IconButton size="small" onClick={() => handleCopy(usuario)}>
                <ContentCopy fontSize="small" />
              </IconButton>
            </Tooltip>
          </Typography>
  
          <Typography variant="body2">
            <strong>Contraseña:</strong>{' '}
            {showPassword ? password : '•'.repeat(password.length)}{' '}
            <Tooltip title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                <IconButton size="small" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
            </Tooltip>
            <Tooltip title="Copiar contraseña">
                <IconButton size="small" onClick={() => handleCopy(password)}>
                <ContentCopy fontSize="small" />
                </IconButton>
            </Tooltip>
        </Typography>

        <Typography variant="body2">
            <strong>Base de datos:</strong> {nombre}{' '}
            <Tooltip title="Copiar nombre de base de datos">
              <IconButton size="small" onClick={() => handleCopy(nombre)}>
                <ContentCopy fontSize="small" />
              </IconButton>
            </Tooltip>
          </Typography>
  
          {tipo && (
            <Typography variant="body2">
              <strong>Tipo:</strong> {tipo}
            </Typography>
          )}
  
          {fecha && (
            <Typography variant="caption" color="text.secondary">
              Creado el {fecha}
            </Typography>
          )}
  
          <Divider sx={{ my: 1 }} />
  
          <Typography
            variant="body2"
            color={online ? 'green' : 'red'}
            display="flex"
            alignItems="center"
            gap={1}
          >
            {online ? <CloudDone fontSize="small" /> : <CloudOff fontSize="small" />}
            {online ? 'Online' : 'Offline'}
          </Typography>
        </CardContent>
  
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Button size="small" onClick={onTest}>Probar</Button>
          <div>
            <Tooltip title="Editar">
              <IconButton onClick={onEdit}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton color="error" onClick={onDelete}>
                <Delete />
              </IconButton>
            </Tooltip>
          </div>
        </CardActions>
      </Card>
    );
  };