import { Box, Button, Typography } from "@mui/material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        padding: "20px",
        marginTop: "40px",
      }}
    >
      <Button
        variant="outlined"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Anterior
      </Button>

      <Typography sx={{ minWidth: "120px", textAlign: "center" }}>
        Página {currentPage} de {totalPages}
      </Typography>

      <Button
        variant="outlined"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Siguiente →
      </Button>
    </Box>
  );
}
