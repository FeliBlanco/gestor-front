import { Box, Button, Card, CardActions, CardContent, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { ContentCopy, Delete, Edit, CloudDone, CloudOff, Visibility, VisibilityOff } from '@mui/icons-material';
import DeleteDatabaseModal from "./DeleteDatabaseModal";
import DatabaseField from "./DatabaseField";

export default function DBCard({
    id,
    nombre,
    usuario,
    password,
    tipo,
    fecha,
    online,
    onDelete,
    onEdit,
    onTest
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [getCopied, setCopied] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopied(field);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <>
            <Card variant="outlined" sx={{
                width: '100%',
                transition: 'all 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }
            }}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{
                        borderBottom: '2px solid #f0f0f0',
                        pb: 1,
                        mb: 2
                    }}>
                        {nombre}
                    </Typography>

                    <DatabaseField 
                        label="Usuario"
                        value={usuario}
                        onCopy={handleCopy}
                        copied={getCopied === 'Usuario'}
                    />
                    <DatabaseField 
                        label="Contraseña"
                        value={password}
                        isPassword
                        showPassword={showPassword}
                        onTogglePassword={() => setShowPassword(prev => !prev)}
                        onCopy={handleCopy}
                        copied={getCopied === 'Contraseña'}
                    />
                    <DatabaseField 
                        label="Base de datos"
                        value={nombre}
                        onCopy={handleCopy}
                        copied={getCopied === 'Base de datos'}
                    />

                    {/* ...rest of the card content... */}
                </CardContent>

                <CardActions sx={{ 
                    justifyContent: 'space-between',
                    p: 2,
                    backgroundColor: 'rgba(0,0,0,0.02)'
                }}>
                    <Button 
                        size="small" 
                        onClick={onTest}
                        variant="outlined"
                    >
                        Abrir
                    </Button>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Editar">
                            <IconButton size="small" onClick={onEdit}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => setShowDeleteModal(true)}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'error.light'
                                    }
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </CardActions>
            </Card>

            <DeleteDatabaseModal 
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => onDelete(id)}
                databaseName={nombre}
                id={id}
            />
        </>
    );
}
