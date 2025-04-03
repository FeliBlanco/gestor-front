import { Box, Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";

const EmptyList = ({ message = "No hay datos para mostrar" }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="200px"
      color="gray"
    >
      <InboxIcon sx={{ fontSize: 50, mb: 1 }} />
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
};

export default EmptyList;