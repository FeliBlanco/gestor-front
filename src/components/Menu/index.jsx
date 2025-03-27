import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Menu() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography onClick={() => window.location.href = "/"}>Boolean Proyects</Typography>
            </Toolbar>
        </AppBar>
    )
}