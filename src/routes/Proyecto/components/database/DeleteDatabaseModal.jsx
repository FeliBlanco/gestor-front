import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, CircularProgress } from "@mui/material";
import { Delete } from '@mui/icons-material';
import { useState } from "react";
import useFetch from "../../../../hooks/useFetch";

export default function DeleteDatabaseModal({ open, onClose, onConfirm, databaseName, id }) {
    const { deleteFetch } = useFetch();
    const [isLoading, setLoading] = useState(false);

    const handleDelete = async () => {
        if(isLoading) return;
        setLoading(true);
        try {
            await deleteFetch(`${import.meta.env.VITE_APP_API_URL}/proyecto/database/${id}`);
            onConfirm();
            onClose();
        } catch(err) {
            console.error("Error deleting database:", err);
            alert("Error al eliminar la base de datos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => !isLoading && onClose()}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle sx={{ 
                borderBottom: '1px solid #e0e0e0',
                color: 'error.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                <Delete fontSize="small" />
                Eliminar base de datos
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
                <Typography>
                    ¿Estás seguro que deseas eliminar la base de datos <strong>{databaseName}</strong>?
                </Typography>
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    Esta acción no se puede deshacer.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
                <Button 
                    onClick={onClose}
                    variant="outlined"
                    disabled={isLoading}
                >
                    Cancelar
                </Button>
                <Button 
                    onClick={handleDelete}
                    variant="contained"
                    color="error"
                    disabled={isLoading}
                    startIcon={isLoading ? 
                        <CircularProgress size={20} color="inherit" /> : 
                        <Delete />
                    }
                >
                    {isLoading ? 'Eliminando...' : 'Eliminar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
