import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { ContentCopy, Visibility, VisibilityOff } from '@mui/icons-material';

export default function DatabaseField({ 
    label, 
    value, 
    isPassword, 
    showPassword, 
    onTogglePassword, 
    onCopy, 
    copied 
}) {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            p: 1.5,
            borderRadius: 1,
            backgroundColor: 'rgba(0,0,0,0.02)',
            '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)'
            }
        }}>
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
                <strong>{label}:</strong>{' '}
                {isPassword 
                    ? (showPassword ? value : '•'.repeat(value.length))
                    : value
                }
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
                {isPassword && (
                    <Tooltip title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                        <IconButton 
                            size="small"
                            onClick={onTogglePassword}
                            sx={{ color: showPassword ? 'primary.main' : 'text.secondary' }}
                        >
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                    </Tooltip>
                )}
                <Tooltip title={copied ? '¡Copiado!' : `Copiar ${label.toLowerCase()}`}>
                    <IconButton 
                        size="small"
                        onClick={() => onCopy(value, label)}
                        sx={{
                            color: copied ? 'success.main' : 'text.secondary',
                            transition: 'color 0.2s ease'
                        }}
                    >
                        <ContentCopy fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}
