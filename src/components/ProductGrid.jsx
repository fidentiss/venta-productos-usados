import React from 'react';
import { Grid, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import ProductCard from './ProductCard';

function ProductGrid({ products, onViewMore }) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1, padding: theme.spacing(2) }}>
      {products.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ color: 'gray', marginTop: theme.spacing(2) }}>
          No hay productos disponibles en este momento.
        </Typography>
      ) : (
        <Grid
          container
          spacing={isSmall ? 2 : 3}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        >
          {products.map((product) => (
            <Grid 
              item 
              xs={12} sm={6} md={4} lg={3} 
              key={product.id}
            >
              <ProductCard product={product} onViewMore={onViewMore} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default React.memo(ProductGrid);
