import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface EmptyStateProps {
  title?: string;
  message?: string;
  showButton?: boolean;
}

export function EmptyState({
  title = "No hay productos",
  message = "No encontramos productos que coincidan con tu búsqueda",
  showButton = true,
}: EmptyStateProps) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        textAlign: "center",
        gap: 2,
      }}
    >
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      <Typography color="textSecondary">{message}</Typography>
      {showButton && (
        <Button variant="contained" onClick={() => navigate("/")}>
          Volver a inicio
        </Button>
      )}
    </Box>
  );
}
