import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

function ContactModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 8, backgroundColor: '#f5f5f5', padding: 3 } }}>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem', color: '#333' }}>
        Joseph C
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#555', marginBottom: 2 }}>
            ¡Bienvenido a mi sitio de Venta de Usados!
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', marginBottom: 2 }}>
            Esta página web la creé para practicar mis habilidades en React y para vender algunas cosas que ya no necesito.
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', marginBottom: 2 }}>
            Si quieres saber más sobre mí, ingresa a mi sitio web personal.
          </Typography>
          <Typography
            variant="body1"
            component="a"
            href="https://josephc.site"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: '#1976d2', fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            josephc.site
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{ borderRadius: 50, padding: '6px 24px', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#155a9e' } }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ContactModal;
