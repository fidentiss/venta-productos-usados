import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ContactModal from './ContactModal';

// Estilo personalizado para el texto del logo
const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Orbitron", sans-serif', // Fuente futurista
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  letterSpacing: '3px',
  textShadow: '0 0 5px rgba(254, 107, 139, 0.5), 0 0 10px rgba(255, 142, 83, 0.5)',
  flexGrow: 1,
}));

// Estilo personalizado para los botones
const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

function Header() {
    const [contactModalOpen, setContactModalOpen] = useState(false);
  
    const handleOpenContactModal = () => {
      setContactModalOpen(true);
    };
  
    const handleCloseContactModal = () => {
      setContactModalOpen(false);
    };
  
    return (
      <>
        <AppBar position="static" sx={{ background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)' }}>
          <Toolbar>
            <LogoText variant="h5">
              Josephc.site
            </LogoText>
            <Box>
              <NavButton onClick={handleOpenContactModal}>Contacto y Condiciones*</NavButton>
            </Box>
          </Toolbar>
        </AppBar>
        <ContactModal open={contactModalOpen} onClose={handleCloseContactModal} />
      </>
    );
  }
  
  export default Header;