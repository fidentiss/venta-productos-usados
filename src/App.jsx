import React, { useState } from 'react';
import { Container, Typography, CssBaseline } from '@mui/material';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import Header from './components/Header';

// Datos de ejemplo
const products = [
  { 
    id: 1, 
    name: "MacBook Air M1 2020", 
    price: "2.500.000", 
    description: "Potente laptop para profesionales y creativos.",
    images: [
      "/assets/images/macbook-air-1.jpg",
      "/assets/images/macbook-air-2.jpg",
      "/assets/images/macbook-air-3.jpg",
      "/assets/images/macbook-air-4.jpg",
      "/assets/images/macbook-air-5.jpg",
      "/assets/images/macbook-air-6.jpg",
      "/assets/images/macbook-air-7.jpg",
      "/assets/images/macbook-air-8.jpg",
      "/assets/images/macbook-air-9.jpg",
      "/assets/images/macbook-air-10.jpg",
      "/assets/images/macbook-air-11.jpg",
      "/assets/images/macbook-air-12.jpg",
      "/assets/images/macbook-air-13.jpg",
    ],
    video: "/assets/videos/macbook-pro.mp4"
  },
  { 
    id: 2, 
    name: "Case Macbook Pro 14''", 
    price: "60.000", 
    description: "Case en caja y sellada para macbook pro de 14 pulgadas",
    images: [
      "/assets/images/case-pro-14-1.jpg",
      "/assets/images/case-pro-14-2.jpg",
    ],
    video: "/assets/videos/macbook-pro.mp4"
  },
  { 
    id: 3, 
    name: "Longboard con trucks y llantas", 
    price: "130.000", 
    description: "Potente laptop para profesionales y creativos.",
    images: [
      "/assets/images/longboard-completa-1.jpg",
      "/assets/images/longboard-completa-2.jpg",
      "/assets/images/longboard-completa-3.jpg",
      "/assets/images/longboard-completa-4.jpg",
      "/assets/images/longboard-completa-5.jpg",
    ],
    video: "/assets/videos/macbook-pro.mp4"
  },
];

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewMore = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleBuy = (product) => {
    // Aquí puedes implementar la lógica para comprar, por ejemplo, abrir WhatsApp
    const message = `Hola, estoy interesado en comprar ${product.name} por $${product.price}`;
    const whatsappUrl = `https://wa.me/573156374365?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Typography variant="h2" component="h1" gutterBottom sx={{ my: 4, textAlign: 'center' }}>
          Venta de Usados
        </Typography>
        <ProductGrid products={products} onViewMore={handleViewMore} />
        <ProductModal 
          product={selectedProduct} 
          open={!!selectedProduct} 
          onClose={handleCloseModal}
          onBuy={handleBuy}
        />
      </Container>
    </>
  );
}

export default App;