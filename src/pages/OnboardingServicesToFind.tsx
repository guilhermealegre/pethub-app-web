import React, { useState } from "react";
import { PetHubIcon } from '../components/customIcons'; // Add this import
import { Container, Typography, Button, Box, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Service options with their icons and labels
const serviceOptions = [
  { id: 'passeios', label: '🦮 Passeios' },
  { id: 'creche', label: '🐕 Creche' },
  { id: 'petsitting', label: '🐾 Pet Sitting' },
  { id: 'hotel', label: '🏨 Hotel' },
  { id: 'veterinario', label: '👨‍⚕️ Veterinário' },
  { id: 'treino', label: '🎾 Treino' },
  { id: 'estetica', label: '✨ Estética e Higiene' },
  { id: 'reabilitacao', label: '🔄 Reabilitação' },
  { id: 'exoticos', label: '🦜 Animais exóticos' },
  { id: 'fotografia', label: '📸 Fotografia' },
  { id: 'workshops', label: '👥 Workshops donos' },
  { id: 'eventos', label: '🎉 Eventos' },
  { id: 'paliativos', label: '💝 Cuidados paliativos' },
];
const PetHubLogo = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4, justifyContent: 'center' }}>
    <PetHubIcon sx={{ fontSize: 32, color: '#617AFF' }} />
    <Typography 
      variant="h5" 
      sx={{ 
        color: '#617AFF',
        fontWeight: 'bold',
        fontSize: '24px'
      }}
    >
      Pethub
    </Typography>
  </Box>
);


const OnboardingServicesToFind = () => {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleContinue = async () => {
    try {
      // Make API request with selected services
      const response = await fetch('/api/user-services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          services: selectedServices,
          // You can add more data from previous steps here
          userType: localStorage.getItem('userType'), // From previous page
        }),
      });

      if (response.ok) {
        // Navigate to next page after successful API call
        navigate('/next-step');
      } else {
        throw new Error('Failed to save services');
      }
    } catch (error) {
      console.error('Error saving services:', error);
      // Handle error (show error message to user)
    }
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", py: 5 }}>
      <PetHubLogo />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Que serviços procuras?
      </Typography>
      
      <Typography variant="body1" color="textSecondary" mb={12}>
        Podes selecionar mais do que uma opção
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 2,
        justifyContent: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        mb: 4
      }}>
        {serviceOptions.map((service) => (
          <Chip
            key={service.id}
            label={service.label}
            onClick={() => handleServiceToggle(service.id)}
            sx={{
              height: '40px',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '16px',
              fontWeight: 500,
              backgroundColor: selectedServices.includes(service.id) 
                ? '#617AFF' 
                : 'transparent',
              color: selectedServices.includes(service.id) 
                ? 'white' 
                : '#617AFF',
              border: '1px solid',
              borderColor: '#617AFF',
              '&:hover': {
                backgroundColor: selectedServices.includes(service.id) 
                  ? '#4B5CC7' 
                  : 'rgba(97, 122, 255, 0.1)',
              },
              '& .MuiChip-label': {
                padding: 0,
              },
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          />
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={handleContinue}
        disabled={selectedServices.length === 0}
        sx={{
          backgroundColor: "#617AFF",
          padding: "12px 24px",
          borderRadius: "8px",
          textTransform: "none",
          fontSize: "16px",
          width: "320px",
          '&:hover': {
            backgroundColor: "#4B5CC7",
          }
        }}
      >
        Continuar
      </Button>
      
      <Button
        onClick={() => navigate('/next-step')}
        sx={{
          color: '#617AFF',
          textTransform: 'none',
          mt: 2,
          '&:hover': {
            backgroundColor: 'transparent',
            textDecoration: 'underline',
          }
        }}
      >
        Saltar
      </Button>
    </Container>
  );
};

export default OnboardingServicesToFind;