import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";

export default function EmptyState({ onCreate }) {
    return (
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
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)'
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
    );
}
