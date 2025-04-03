import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import LogoNegro from '/logo_negro.png'
import LogoBlanco from '/logotipo.png'
import ContrastIcon from '@mui/icons-material/Contrast';
import useUserTheme from "../../hooks/useUserTheme";
import { useTheme } from "@emotion/react";

export default function Menu() {

    const { changeTheme, getTheme } = useUserTheme()
    const theme = useTheme()

    return (
        <AppBar position="static">
            <Toolbar sx={{display:'flex', alignItems:'center', background: theme.palette.custom.header, justifyContent:'space-between'}}>
                <img src={getTheme == 'light' ? LogoNegro : LogoBlanco} style={{width:'120px', cursor:'pointer'}} onClick={() => window.location.href = "/"}/>
                <Box>
                    <IconButton>
                        <ContrastIcon onClick={() => changeTheme()}/>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}