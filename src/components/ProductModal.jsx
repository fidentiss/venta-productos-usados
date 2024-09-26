import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Grid, styled, TextField, InputAdornment, useMediaQuery, useTheme, IconButton } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
    padding: theme.spacing(2),
    width: '100%',
    maxWidth: 600,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      maxWidth: '95%',
    },
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  textAlign: 'center',
  fontSize: '1.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1rem',
  },
}));

const StyledCarousel = styled(Carousel)(({ theme }) => ({
  '& .slide img': {
    maxHeight: '400px',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '250px',
    },
    [theme.breakpoints.down('xs')]: {
      maxHeight: '200px',
    },
  },
  '& .legend': {
    background: 'rgba(0, 0, 0, 0.5)',
    bottom: '40px',
    position: 'absolute',
    width: '100%',
    color: 'white',
    padding: '10px',
    fontSize: '14px',
    textAlign: 'center',
    opacity: 0.8,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 50,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(45deg, #FE6B8B 60%, #FF8E53 90%)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0 20px',
    height: 40,
  },
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
      color: 'white',
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
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

const FullScreenImage = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: theme.zIndex.modal + 1,
}));

const StyledFullScreenImage = styled('img')({
  maxWidth: '90%',
  maxHeight: '90%',
  objectFit: 'contain',
});

function ProductModal({ product, open, onClose, onBuy }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [offer, setOffer] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [offerError, setOfferError] = useState('');
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));

  if (!product) return null;

  const handleMakeOffer = () => {
    setOfferModalOpen(true);
  };

  const handleOfferChange = (e) => {
    let value = unformatNumber(e.target.value);
    if (!/^\d*$/.test(value)) return;
    
    if (value === '' || parseInt(value) >= 20000) {
      setOfferError('');
    } else {
      setOfferError('La oferta mínima es de $20.000');
    }
    
    setOffer(formatNumber(value));
  };

  const handleWhatsappChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
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
          offer: unformatNumber(offer),
          whatsapp: whatsapp,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar la oferta');
      }
  
      const data = await response.json();
      if (data.success) {
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

  const handleImageClick = (imageUrl) => {
    setFullscreenImage(imageUrl);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <>
      <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <StyledDialogTitle>{product.name}</StyledDialogTitle>
        <DialogContent>
          <Grid container spacing={isMobile ? 1 : 2}>
            <Grid item xs={12}>
              <StyledCarousel
                showArrows={!isExtraSmall}
                onChange={setCurrentIndex}
                selectedItem={currentIndex}
                showStatus={false}
                showThumbs={!isMobile}
              >
                {product.images.map((img, index) => (
                  <div key={index} onClick={() => handleImageClick(img)} style={{ cursor: 'pointer' }}>
                    <img src={img} alt={`${product.name} - imagen ${index + 1}`} />
                    <div className="legend">
                      <ZoomInIcon /> Clic para ampliar
                    </div>
                  </div>
                ))}
              </StyledCarousel>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ 
                mt: isMobile ? 1 : 2, 
                textAlign: isMobile ? 'center' : 'left',
                fontSize: isExtraSmall ? '0.9rem' : '1rem'
              }}>
                {product.description}
              </Typography>
              <Typography variant="h5" sx={{ 
                mt: isMobile ? 1 : 2, 
                color: '#FE6B8B', 
                textAlign: isMobile ? 'center' : 'left',
                fontSize: isExtraSmall ? '1.2rem' : '1.5rem'
              }}>
                Precio: ${product.price}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ 
          justifyContent: isMobile ? 'center' : 'space-between', 
          padding: isMobile ? '8px' : '16px',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: isMobile ? '8px' : '0'
        }}>
          <Button 
            onClick={onClose} 
            variant="outlined" 
            sx={{ 
              color: '#FE6B8B', 
              borderColor: '#FE6B8B',
              width: isMobile ? '100%' : 'auto'
            }}
          >
            Cerrar
          </Button>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            width: isMobile ? '100%' : 'auto',
            gap: isMobile ? '8px' : '16px'
          }}>
            <StyledButton 
              onClick={handleMakeOffer} 
              sx={{ width: isMobile ? '100%' : 'auto' }}
              startIcon={<AttachMoneyIcon />}
            >
              Hacer Oferta
            </StyledButton>
            <StyledButton 
              onClick={() => onBuy(product)}
              sx={{ width: isMobile ? '100%' : 'auto' }}
              startIcon={<ShoppingCartIcon />}
            >
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

      {fullscreenImage && (
        <FullScreenImage onClick={handleCloseFullscreen}>
          <IconButton
            onClick={handleCloseFullscreen}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>
          <StyledFullScreenImage src={fullscreenImage} alt="Imagen en pantalla completa" />
        </FullScreenImage>
      )}
    </>
  );
}

export default ProductModal;