import React, { useState } from "react";
import { Container, Typography, Button, Box, Stack} from "@mui/material";
import { Pets, EmojiEvents, SyncAlt } from "@mui/icons-material";
import { styled } from "@mui/system";
import { PetHubIcon } from '../components/customIcons'; // Add this import
import { useNavigate } from "react-router-dom";


const options = [
  { id: 1, icon: <Pets fontSize="large" />, text: "Procuro serviços para os meus patudos" },
  { id: 2, icon: <EmojiEvents fontSize="large" />, text: "Quero disponibilizar os meus serviços" },
  { id: 3, icon: <SyncAlt fontSize="large" />, text: "As duas. Procuro e ofereço serviços" },
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


const CustomButton = styled(Button)({
  backgroundColor: "#6200ea",
  color: "#fff",
  borderRadius: "8px",
  padding: "12px 24px",
  fontSize: "16px",
  textTransform: "none",
  '&:hover': {
    backgroundColor: "#4b00b5",
  }
});


const CircleContainer = styled(Box)(({ selected }) => ({
  backgroundColor: selected ? '#6200ea' : '#f5f5f5',
  borderRadius: '50%',
  width: 120,
  height: 120,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#6200ea',
    '& svg': {
      color: '#fff'
    }
  },
}));

const Onboarding = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="lg"  sx={{ textAlign: "center", py: 5,  mt: 5}}>
      <PetHubLogo />
      <Typography variant="h5" fontWeight="bold" gutterBottom mt={8} >
        Vamos começar?
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Diz-nos o que procuras para te podermos
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={4}>
        ajudar e oferecer a melhor experiência Pethub
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} justifyContent="center">
      {options.map((option) => (
        <Box key={option.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircleContainer 
            sx={{ 
              backgroundColor: selected === option.id ? '#6200ea' : '#f5f5f5',
              '& svg': {
                color: selected === option.id ? '#fff' : '#000'
              }
            }}
            onClick={() => setSelected(option.id)}
          >
            {React.cloneElement(option.icon, { 
              sx: { 
                color: selected === option.id ? '#fff' : '#000',
                fontSize: 40 
              } 
            })}
          </CircleContainer>
          <Typography variant="body1" sx={{ maxWidth: '200px', textAlign: 'center' }}>
            {option.text}
          </Typography>
        </Box>
      ))}
      </Stack>
      <CustomButton variant="contained" sx={{ mt: 4 }} disabled={!selected} onClick={() => navigate('/onboarding-services-to-find ')}>
        Concordar e continuar
      </CustomButton>
      <Typography variant="caption" display="block" mt={2} color="textSecondary">
        Ao selecionar "Concordar e continuar", aceitas os <a href="#">Termos de Serviço</a>
        <br />
        da Pethub e a nossa <a href="#">Política de Privacidade</a>.
      </Typography>
    </Container>
  );
};

export default Onboarding;
