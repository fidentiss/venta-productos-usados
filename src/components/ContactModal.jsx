import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, useTheme, useMediaQuery, IconButton } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';

function ContactModal({ open, onClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullScreen={fullScreen}
      PaperProps={{ 
        sx: { 
          borderRadius: fullScreen ? 0 : 8, 
          backgroundColor: '#1a1a1a', 
          padding: { xs: 2, sm: 3 },
          maxWidth: '600px',
          width: '100%',
          height: fullScreen ? '100%' : 'auto',
          overflowY: 'auto'
        } 
      }}
    >
      <DialogTitle sx={{ 
        textAlign: 'center', 
        fontWeight: 'bold', 
        fontSize: { xs: '1.2rem', sm: '1.5rem' }, 
        color: '#FE6B8B',
        paddingRight: fullScreen ? '48px' : '24px'
      }}>
        Joseph C - Venta de Usados
        {fullScreen && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#FE6B8B',
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#FF8E53', marginBottom: 2, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            ¡Bienvenido a mi sitio de Venta de Usados!
          </Typography>
          <Typography variant="body1" sx={{ color: '#fff', marginBottom: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Esta página web la creé para practicar mis habilidades en "Programación web" React y para vender algunas cosas que ya no necesito.
          </Typography>
          <Typography variant="body1" sx={{ color: '#fff', marginBottom: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Si quieres saber más sobre mí, visita mi instagram.
          </Typography>
          <Typography
            variant="body1"
            component="a"
            href="https://www.instagram.com/fidentis/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              color: '#FE6B8B', 
              fontWeight: 'bold', 
              textDecoration: 'none', 
              '&:hover': { textDecoration: 'underline' },
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            @fidentis
          </Typography>

          <Box sx={{ marginTop: 3, backgroundColor: '#2a2a2a', padding: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: '#FF8E53', marginBottom: 2, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
              Condiciones de Venta
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
              <HandshakeIcon sx={{ color: '#FE6B8B', marginRight: 1 }} />
              <Typography variant="body2" sx={{ color: '#fff', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                Venta directa o negociación de precio vía WhatsApp.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
              <LocationOnIcon sx={{ color: '#FE6B8B', marginRight: 1 }} />
              <Typography variant="body2" sx={{ color: '#fff', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                Preferencia por tratos en Bogotá con retiro en persona.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalShippingIcon sx={{ color: '#FE6B8B', marginRight: 1 }} />
              <Typography variant="body2" sx={{ color: '#fff', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                Envíos a todo el país con pago contra entrega disponible.
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', padding: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{ 
            borderRadius: 50, 
            padding: '8px 24px', 
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            color: 'white',
            '&:hover': { 
              background: 'linear-gradient(45deg, #FE6B8B 50%, #FF8E53 70%)',
            }
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ContactModal;