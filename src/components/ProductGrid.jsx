import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';

function ProductGrid({ products, onViewMore }) {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductCard product={product} onViewMore={onViewMore} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductGrid;