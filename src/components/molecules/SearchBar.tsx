import { useState, useCallback } from "react";
import { TextField, InputAdornment, Box, IconButton } from "@mui/material";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({
  onSearch,
  placeholder = "Buscar productos...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      onSearch(value);
    },
    [onSearch],
  );

  const handleClear = useCallback(() => {
    setQuery("");
    onSearch("");
  }, [onSearch]);

  return (
    <Box sx={{ marginBottom: "24px" }}>
      <TextField
        fullWidth
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: query && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  edge="end"
                  sx={{ marginRight: -1 }}
                >
                  ✕
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}
