import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export type SortOption = "newest" | "price_low" | "price_high" | "name";

interface FilterPanelProps {
  minPrice?: number;
  maxPrice?: number;
  onPriceChange: (min: number, max: number) => void;
  onSortChange: (sort: SortOption) => void;
  currentSort?: SortOption;
}

export function FilterPanel({
  minPrice = 0,
  maxPrice = 2000,
  onPriceChange,
  onSortChange,
  currentSort = "newest",
}: FilterPanelProps) {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [sort, setSort] = useState(currentSort);

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPriceRange(newValue);
      onPriceChange(newValue[0], newValue[1]);
    }
  };

  const handleSortChange = (e: SelectChangeEvent<SortOption>) => {
    const value = e.target.value as SortOption;
    setSort(value);
    onSortChange(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        marginBottom: "24px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {/* Ordenamiento */}
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Ordenar por</InputLabel>
        <Select value={sort} label="Ordenar por" onChange={handleSortChange}>
          <MenuItem value="newest">Más nuevo</MenuItem>
          <MenuItem value="price_low">Precio: Menor a Mayor</MenuItem>
          <MenuItem value="price_high">Precio: Mayor a Menor</MenuItem>
          <MenuItem value="name">Nombre (A-Z)</MenuItem>
        </Select>
      </FormControl>

      {/* Rango de precio */}
      <Box sx={{ minWidth: 250 }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}
        >
          Rango de precio: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <Slider
          getAriaLabel={() => "Price range"}
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={2000}
          step={10}
        />
      </Box>
    </Box>
  );
}
