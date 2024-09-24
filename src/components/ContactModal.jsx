import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

function ContactModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Información de Contacto</DialogTitle>
      <DialogContent>
        <Typography>
          Email: tu@email.com
        </Typography>
        <Typography>
          Teléfono: +1 234 567 890
        </Typography>
        <Typography>
          LinkedIn: linkedin.com/in/tuusuario
        </Typography>
        <Typography>
          GitHub: github.com/tuusuario
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ContactModal;