import React, { useState } from "react";
import { Container, Typography, Button, Box, Stack } from "@mui/material";
import { Pets, EmojiEvents, SyncAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { PetHubLogo } from "../core/utils";

const options = [
  { id: 1, icon: <Pets fontSize="large" />, text: "Procuro serviços para os meus patudos" },
  { id: 2, icon: <EmojiEvents fontSize="large" />, text: "Quero disponibilizar os meus serviços" },
  { id: 3, icon: <SyncAlt fontSize="large" />, text: "As duas. Procuro e ofereço serviços" },
];

const Onboarding = () => {
  const [selected, setSelected] = useState<number>(0);
  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="lg" sx={{ textAlign: "center", py: 5, mt: 5 }}>
        <PetHubLogo />
        <Typography variant="h5" fontWeight="bold" gutterBottom mt={8}>
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
            <Box key={option.id} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  backgroundColor: selected === option.id ? "#6200ea" : "#f5f5f5",
                  borderRadius: "50%",
                  width: 120,
                  height: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#6200ea",
                    "& svg": {
                      color: "#fff",
                    },
                  },
                }}
                onClick={() => setSelected(option.id)}
              >
                {/* isto nao deve ser preciso quando puser os icons reais */}
                {React.cloneElement(option.icon, {
                  sx: {
                    color: selected === option.id ? "#fff" : "#000",
                    fontSize: 40,
                  },
                })}
                {/* {option.icon} */}
              </Box>
              <Typography variant="body1" sx={{ maxWidth: "200px", textAlign: "center" }}>
                {option.text}
              </Typography>
            </Box>
          ))}
        </Stack>
        <Button
          onClick={() => {
            if (selected) navigate("/onboarding-services-to-find ");
          }}
          sx={{ mt: 4 }}
          disabled={!selected}
          color="primary"
          variant="contained"
        >
          Continuar
        </Button>
        <Typography variant="caption" display="block" mt={2} color="textSecondary">
          Ao selecionar "Concordar e continuar", aceitas os <a href="#">Termos de Serviço</a>
          <br />
          da Pethub e a nossa <a href="#">Política de Privacidade</a>.
        </Typography>
      </Container>
    </>
  );
};

export default Onboarding;
