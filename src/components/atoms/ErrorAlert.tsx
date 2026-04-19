import { Alert, Box } from "@mui/material";

interface ErrorAlertProps {
  message?: string;
}

export function ErrorAlert({
  message = "Ha ocurrido un error al cargar",
}: ErrorAlertProps) {
  return (
    <Box sx={{ padding: "20px" }}>
      <Alert severity="error">{message}</Alert>
    </Box>
  );
}
