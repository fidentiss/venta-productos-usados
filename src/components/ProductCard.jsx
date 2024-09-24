import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';

function ProductCard({ product, onViewMore }) {
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
          alt={product.name}
        />
      </Badge>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onViewMore(product)}>Ver más</Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;