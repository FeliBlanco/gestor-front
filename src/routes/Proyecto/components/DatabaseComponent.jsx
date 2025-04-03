import { Box, Button, ListItem, MenuItem, Modal, Paper, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";

import AddIcon from "@mui/icons-material/AddCircleOutline";

export default function DatabaseComponent() {
    const [getDBs, setDBs] = useState([])
    const [getCreateDBData, setCreateDBData] = useState(null)

    const onCreate = () => {
        setCreateDBData({
            nombre: ''
        })
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
                    getDBs.map((value, index) => {
                        return (
                            <ListItem key={`ds-${index}`}>
                                <Typography>Telemed</Typography>
                            </ListItem>
                        )
                    })
            }
            <Modal open={getCreateDBData != null} sx={{display:'flex', justifyContent:'center', alignItems:'center'}} onClose={() => setCreateDBData(null)}>
                <Paper sx={{padding:'20px', width:{xs:'90%', md:'500px'}}}>
                    <Typography variant="h5">Crear Base de Datos</Typography>
                    <TextField margin="normal" fullWidth size="small" label="Nombre"/>
                    <Select margin="normal" value={"postgresql"} disabled fullWidth size="small">
                        <MenuItem value="postgresql">PostgreSQL</MenuItem>
                    </Select>
                    <Button sx={{margin:'20px 0'}} variant="contained" fullWidth>Crear base de datos</Button>
                </Paper>
            </Modal>
        </Box>
    )
}