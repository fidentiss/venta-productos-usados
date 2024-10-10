import React, { useState } from 'react';
import { Container, Typography, CssBaseline } from '@mui/material';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import Header from './components/Header';

const products = [
  { 
    id: 1, 
    name: "MacBook Air M1 2020 de 256Gb", 
    price: 2500000, 
    description: "Este MacBook Air M1 está en excelente estado (estéticamente un 4/5) y es una máquina súper potente para trabajar, estudiar o crear. La batería tiene 397 ciclos, así que aún tiene vida para rato. Además, viene con su caja original en perfecto estado. Perfecto para quienes necesitan portabilidad y rendimiento.",
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
    price: 60000, 
    description: "Case para MacBook Pro de 14 pulgadas, completamente nuevo y sellado. Protege tu equipo con estilo y mantén tu Mac como recién salida de la tienda.",
    images: [
      "/assets/images/case-pro-14-1.jpg",
      "/assets/images/case-pro-14-2.jpg",
    ],
    video: "/assets/videos/macbook-pro.mp4"
  },
  { 
    id: 3, 
    name: "Longboard con trucks y llantas", 
    price: 180000, 
    description: "Este longboard está en muy buen estado, solo necesita una buena limpieza para quedar como nuevo. La tabla está en un 4/5, los trucks también en un 4/5, y las llantas, que están un poco más usadas, en un 3/5. Perfecto para paseos tranquilos o un buen cruising.",
    images: [
      "/assets/images/longboard-completa-1.jpg",
      "/assets/images/longboard-completa-2.jpg",
      "/assets/images/longboard-completa-3.jpg",
      "/assets/images/longboard-completa-4.jpg",
      "/assets/images/longboard-completa-5.jpg",
    ],
    video: "/assets/videos/macbook-pro.mp4"
  },
  { 
    id: 4, 
    name: "Mini Skate de Plástico", 
    price: 30000, 
    description: "Mini skate de plástico en buen estado (3.5/5). Solo necesita una limpiadita y quedará listo para rodar. Perfecto para transportarse rápido y con estilo por la ciudad.",
    images: [
      "/assets/images/mini-skate-1.jpeg",
      "/assets/images/mini-skate-2.jpeg",
    ],
    video: "/assets/videos/macbook-pro.mp4"
  },
  { 
    id: 5, 
    name: "iPad Air M2 + Pencil Pro (le quedan 10 meses AppleCare)", 
    price: 3100000, 
    description: "Este iPad Air M2 está prácticamente nuevo, lo compré hace solo 2 meses y no lo he vuelto a usar. Le quedan 10 meses de AppleCare y viene con un protector de cuero. Incluye su caja original en perfecto estado. Ideal para quienes necesitan un equipo ligero y poderoso, ¡en estado 10/10!",
    images: [
      "/assets/images/ipad-air-2-1.jpg",
      "/assets/images/ipad-air-2-2.jpg",
      "/assets/images/ipad-air-2-3.jpg",
    ],
    video: "/assets/videos/macbook-pro.mp4"
  },
  { 
    id: 7, 
    name: "Tabla Longboard Bustin Boards", 
    price: 100000, 
    description: "Tabla longboard Bustin Boards en estado 4/5. Necesita una pequeña limpieza, pero está lista para salir a rodar con todo. Ideal para quienes disfrutan del carving y el freeride.",
    images: [
      "/assets/images/longboard-table-1.jpeg",
      "/assets/images/longboard-table-2.jpeg",
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
        {/* Añadir aclaración en letra pequeña */}
        <Typography 
          variant="body2" 
          sx={{ mt: 2, textAlign: 'center', color: 'gray' }}
        >
          Todos los productos están disponibles en Bogotá.
        </Typography>
      </Container>
    </>
  );
}

export default App;