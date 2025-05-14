import { Button, InputAdornment, MenuItem, Modal, Paper, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function CreateDatabaseModal({ open, onClose, onCreate, prefixName, initialData }) {
    const [nombre, setNombre] = useState('');

    const handleCreate = () => {
        if(nombre.length < 3) {
            alert("Ingresa un nombre válido");
            return;
        }
        onCreate(nombre);
        setNombre('');
    };

    return (
        <Modal 
            open={open} 
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}} 
            onClose={onClose}
        >
            <Paper sx={{padding:'20px', width:{xs:'90%', md:'500px'}}}>
                <Typography variant="h5">Crear Base de Datos</Typography>
                <TextField
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    margin="normal"
                    fullWidth
                    size="small"
                    label="Nombre"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {prefixName}
                            </InputAdornment>
                        )
                    }}
                />
                <Select 
                    margin="normal" 
                    value={"postgresql"} 
                    disabled 
                    fullWidth 
                    size="small"
                >
                    <MenuItem value="postgresql">PostgreSQL</MenuItem>
                </Select>
                <Button 
                    sx={{margin:'20px 0'}} 
                    variant="contained" 
                    fullWidth 
                    onClick={handleCreate}
                >
                    Crear base de datos
                </Button>
            </Paper>
        </Modal>
    );
}
