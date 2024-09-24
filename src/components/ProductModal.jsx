import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Grid, styled, TextField, InputAdornment } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Función para formatear el número con separadores de miles
const formatNumber = (num) => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Función para desformatear el número (quitar los puntos)
const unformatNumber = (num) => {
  return num.replace(/\./g, "");
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: '#121212',
    color: theme.palette.common.white,
    borderRadius: '12px',
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  textAlign: 'center',
});

const StyledCarousel = styled(Carousel)({
  '& .slide img': {
    maxHeight: '600px',
    objectFit: 'contain',
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#FE6B8B',
    },
    '&:hover fieldset': {
      borderColor: '#FF8E53',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF8E53',
    },
    '& input': {
      color: 'white',  // Color del texto de entrada
    },
  },
  '& .MuiInputLabel-root': {
    color: '#FE6B8B',
    '&.Mui-focused': {
      color: '#FF8E53',
    },
  },
  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
    color: '#FE6B8B',
  },
  '& .MuiFormHelperText-root': {
    color: 'rgba(255, 255, 255, 0.7)',  // Color del texto de ayuda
  },
}));

function ProductModal({ product, open, onClose, onBuy }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [offer, setOffer] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [offerError, setOfferError] = useState('');

  if (!product) return null;

  const handleMakeOffer = () => {
    setOfferModalOpen(true);
  };

  const handleOfferChange = (e) => {
    let value = unformatNumber(e.target.value);
    if (!/^\d*$/.test(value)) return; // Solo permite números
    
    if (value === '' || parseInt(value) >= 20000) {
      setOfferError('');
    } else {
      setOfferError('La oferta mínima es de $20.000');
    }
    
    setOffer(formatNumber(value));
  };

  const handleWhatsappChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Solo permite números
    if (value.length <= 10) {
      setWhatsapp(value);
    }
  };

  const handleSubmitOffer = async () => {
    if (unformatNumber(offer) < 20000) {
      setOfferError('La oferta mínima es de $20.000');
      return;
    }
  
    try {
      const response = await fetch('/api/send-offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: product.name,
          offer: unformatNumber(offer), // Envía la oferta desformateada
          whatsapp: whatsapp, // Envía el número de WhatsApp
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar la oferta');
      }
  
      const data = await response.json();
      if (data.success) {
        console.log('Oferta enviada con éxito');
        setOfferModalOpen(false);
        setOffer('');
        setWhatsapp('');
        setOfferError('');
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error enviando la oferta:', error);
    }
  };
  

  return (
    <>
      <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <StyledDialogTitle>{product.name}</StyledDialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledCarousel
                showArrows={true}
                onChange={setCurrentIndex}
                selectedItem={currentIndex}
                showStatus={false}
                showThumbs={true}
              >
                {product.images.map((img, index) => (
                  <div key={index}>
                    <img src={img} alt={`${product.name} - imagen ${index + 1}`} />
                  </div>
                ))}
              </StyledCarousel>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mt: 2 }}>{product.description}</Typography>
              <Typography variant="h5" sx={{ mt: 2, color: '#FE6B8B' }}>Precio: ${product.price}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
          <Button onClick={onClose} variant="outlined" sx={{ color: '#FE6B8B', borderColor: '#FE6B8B' }}>
            Cerrar
          </Button>
          <Box>
            <StyledButton onClick={handleMakeOffer} sx={{ mr: 2 }}>
              Hacer Oferta
            </StyledButton>
            <StyledButton onClick={() => onBuy(product)}>
              Comprar
            </StyledButton>
          </Box>
        </DialogActions>
      </StyledDialog>

      <Dialog 
        open={offerModalOpen} 
        onClose={() => setOfferModalOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: '#121212',
            color: 'white',
            borderRadius: '12px',
          },
        }}
      >
        <DialogTitle sx={{ color: '#FE6B8B' }}>Hacer una oferta</DialogTitle>
        <DialogContent>
          <StyledTextField
            autoFocus
            margin="dense"
            label="Tu oferta"
            fullWidth
            variant="outlined"
            value={offer}
            onChange={handleOfferChange}
            error={!!offerError}
            helperText={offerError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            margin="dense"
            label="Número de WhatsApp"
            fullWidth
            variant="outlined"
            value={whatsapp}
            onChange={handleWhatsappChange}
            helperText="Solo se usará para contactarte si se acepta la oferta y luego se eliminará."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WhatsAppIcon />
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOfferModalOpen(false)} sx={{ color: '#FE6B8B' }}>
            Cancelar
          </Button>
          <StyledButton onClick={handleSubmitOffer} disabled={!!offerError || !offer || !whatsapp}>
            Enviar Oferta
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductModal;