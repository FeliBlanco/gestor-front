import { AppBar, Box, Button, IconButton, MenuItem, Toolbar, Menu as MenuMUI, Typography } from "@mui/material";
import LogoNegro from '/logo_negro.png'
import LogoBlanco from '/logotipo.png'
import ContrastIcon from '@mui/icons-material/Contrast';
import useUserTheme from "../../hooks/useUserTheme";
import { useTheme } from "@emotion/react";
import useUser from "../../hooks/useUser";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import styled from "@emotion/styled";

export default function Menu() {

    const { changeTheme, getTheme } = useUserTheme()
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null);

    const { getUserData, isLogged } = useUser()

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    return (
        <AppBar position="static">
            <Toolbar sx={{display:'flex', alignItems:'center', background: theme.palette.custom.header, justifyContent:'space-between'}}>
                <img src={getTheme == 'light' ? LogoNegro : LogoBlanco} style={{width:'120px', cursor:'pointer'}} onClick={() => window.location.href = "/"}/>
                <Box display="flex" alignItems={"center"} gap="20px">
                    <IconButton>
                        <ContrastIcon onClick={() => changeTheme()}/>
                    </IconButton>
                    {
                        isLogged == true && 
                        <Box>
                            <Button
                            color="inherit"
                            onClick={handleMenuOpen}
                            endIcon={<ArrowDropDownIcon />}
                        >
                            {getUserData.username}
                        </Button>
                        <CustomMenu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                        >
                            <Box sx={{width:'240px', padding:1}}>
                                <Box sx={{padding:'12px'}}>
                                    <Typography fontWeight={"bold"} fontSize={12}>{getUserData.username}</Typography>
                                </Box>
                                <CustomMenuItem onClick={() => {}}>
                                    <Typography color="text.secondary" fontSize={14}>Tema</Typography>
                                </CustomMenuItem>
                                <CustomMenuItem onClick={() => {}}>
                                    <Typography color="text.secondary" fontSize={14}>Cerrar sesión</Typography>
                                </CustomMenuItem>
                            </Box>
                        </CustomMenu>
                        </Box>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
    "&:hover": {

    },
    padding:'10px 8px',
    borderRadius:'6px'
  }));

const CustomMenu = styled(MenuMUI)(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: '12px',
      minWidth: 160,
      boxShadow: theme.shadows[5],
      border:'1px solid #a8a8a8',
      background:'hsla(0,0%,4%,1)'
    },
  }));