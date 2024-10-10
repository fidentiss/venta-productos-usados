import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Badge, Box } from '@mui/material';

function ProductCard({ product, onViewMore }) {
  // Formatear el precio con separadores de miles
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(product.price);

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Badge 
        badgeContent={product.images.length} 
        color="primary"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={product.images[0]}
          alt={`Imagen de ${product.name}`}
        />
      </Badge>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="h6" color="text.primary">
          {formattedPrice}
        </Typography>
      </CardContent>
      <Box sx={{ padding: 2 }}>
        <Button 
          size="small" 
          variant="outlined" 
          fullWidth 
          onClick={() => onViewMore(product)}
        >
          Ver más
        </Button>
      </Box>
    </Card>
  );
}

export default ProductCard;
