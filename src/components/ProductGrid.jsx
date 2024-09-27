import React from 'react';
import { Grid, Box, useTheme, useMediaQuery } from '@mui/material';
import ProductCard from './ProductCard';

function ProductGrid({ products, onViewMore }) {
  const theme = useTheme();
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  const getGridColumns = () => {
    if (isExtraSmall) return 12;
    if (isSmall) return 6;
    if (isMedium) return 4;
    return 3; // Para pantallas grandes
  };

  return (
    <Box sx={{ flexGrow: 1, padding: theme.spacing(2) }}>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        {products.map((product) => (
          <Grid item xs={getGridColumns()} key={product.id}>
            <ProductCard product={product} onViewMore={onViewMore} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductGrid;