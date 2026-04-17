import { CircularProgress, Alert, Button } from "@mui/material";

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({
  message = "Cargando...",
}: LoadingSpinnerProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        gap: "16px",
      }}
    >
      <CircularProgress />
      <p>{message}</p>
    </div>
  );
}

interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        minHeight: "400px",
      }}
    >
      <Alert severity="error">
        <strong>Error al cargar productos:</strong>
        <p>{error}</p>
      </Alert>
      {onRetry && (
        <Button variant="contained" color="primary" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </div>
  );
}

export function EmptyState() {
  return (
    <Alert severity="info">
      <strong>Sin productos</strong>
      <p>No hay productos disponibles en este momento.</p>
    </Alert>
  );
}
