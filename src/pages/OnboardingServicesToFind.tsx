import React, { useState } from "react";
import { Container, Typography, Button, Box, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PetHubLogo } from "../core/utils";
import useAxios from "axios-hooks";

// Service options with their icons and labels
const serviceOptions = [
  { id: 1, label: "🦮 Passeios", icon: "" },
  { id: 2, label: "🐕 Creche", icon: "" },
  { id: 3, label: "🐾 Pet Sitting", icon: "" },
  { id: 4, label: "🏨 Hotel", icon: "" },
  { id: 5, label: "👨‍⚕️ Veterinário", icon: "" },
  { id: 6, label: "🎾 Treino", icon: "" },
  { id: 7, label: "✨ Estética e Higiene", icon: "" },
  { id: 8, label: "🔄 Reabilitação", icon: "" },
  { id: 9, label: "🦜 Animais exóticos", icon: "" },
  { id: 10, label: "📸 Fotografia", icon: "" },
  { id: 11, label: "👥 Workshops donos", icon: "" },
  { id: 12, label: "🎉 Eventos", icon: "" },
  { id: 13, label: "💝 Cuidados paliativos", icon: "" },
];

const OnboardingServicesToFind = () => {
  const navigate = useNavigate();
  // const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  // typing axios
  const [, submitServices] = useAxios(
    {
      url: "/user-services",
      method: "post",
    },
    { manual: true }
  );

  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices((prev) => (prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]));
  };

  const handleContinue = async () => {
    submitServices({
      data: {
        services: selectedServices,
      },
    })
      .then(() => {
        console.log("sucesso");
        // navigate para a proxima pagina
        // navigate('/next-step');
      })
      .catch((error) => {
        console.log(error);
        throw new Error("Failed to save services");
      });
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

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          maxWidth: "800px",
          margin: "0 auto",
          mb: 4,
        }}
      >
        {serviceOptions.map((service) => (
          <Chip
            key={service.id}
            label={service.label}
            onClick={() => handleServiceToggle(service.id)}
            sx={{
              height: "40px",
              borderRadius: "20px",
              padding: "8px 16px",
              fontSize: "16px",
              fontWeight: 500,
              backgroundColor: selectedServices.includes(service.id) ? "#617AFF" : "transparent",
              color: selectedServices.includes(service.id) ? "white" : "#617AFF",
              border: "1px solid",
              borderColor: "#617AFF",
              "&:hover": {
                backgroundColor: selectedServices.includes(service.id) ? "#4B5CC7" : "rgba(97, 122, 255, 0.1)",
              },
              "& .MuiChip-label": {
                padding: 0,
              },
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Button
          variant="contained"
          onClick={handleContinue}
          color="primary"
          disabled={!selectedServices?.length}
          sx={{
            // backgroundColor: "#617AFF",
            // padding: "12px 24px",
            // borderRadius: "8px",
            // textTransform: "none",
            // fontSize: "16px",
            // width: "320px",
            "&:hover": {
              backgroundColor: "#4B5CC7",
            },
          }}
        >
          Continuar
        </Button>

        <Button
          onClick={() => console.log("skip clicked")}
          sx={{
            color: "#617AFF",
            textTransform: "none",
            mt: 2,
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          Saltar
        </Button>
      </Box>
    </Container>
  );
};

export default OnboardingServicesToFind;
