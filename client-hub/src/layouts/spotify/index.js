import React, { useState } from "react";
import { Card } from "@mui/material";
import VuiButton from "../../components/VuiButton";
import VuiBox from "../../components/VuiBox";
import VuiTypography from "../../components/VuiTypography";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import SpotifyComponent from "./components/SpotifyComponent";

function Spotify() {
  const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen-Zustand

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen); // Umschalten des Fullscreen-Modus
  };

  // CSS-Stile für Fullscreen
  const fullscreenStyles = isFullscreen
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.9)", // Dunkler Hintergrund
        zIndex: 9999,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }
    : {};

  // Card-Styling für beide Zustände
  const cardStyles = isFullscreen
    ? {
        width: "95%",
        height: "95%",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        boxShadow: "0 8px 20px rgba(255, 255, 255, 0.4)",
      }
    : {
        width: "100%",
        maxWidth: "1250px",
        minHeight: "600px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {isFullscreen ? (
        // Vollbildmodus
        <div style={fullscreenStyles}>
          <Card sx={cardStyles}>
            <VuiButton
              onClick={toggleFullscreen}
              variant="contained"
              color="info"
              style={{
                fontSize: "1.3rem",
                padding: "0.4rem 0.8rem",
                backgroundColor: "#ff5252",
                position: "absolute",
                top: "1rem",
                right: "1rem",
              }}
            >
              Exit Fullscreen
            </VuiButton>
            <SpotifyComponent />
          </Card>
        </div>
      ) : (
        // Normales Layout
        <DashboardLayout>
          <DashboardNavbar />
          <VuiBox py={3} display="flex" justifyContent="center" alignItems="center">
            <Card sx={cardStyles}>
              <VuiButton
                onClick={toggleFullscreen}
                variant="contained"
                color="info"
                style={{
                  fontSize: "1.3rem",
                  padding: "0.4rem 0.8rem",
                  backgroundColor: "royalblue",
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                }}
              >
                Enter Fullscreen
              </VuiButton>
              <SpotifyComponent />
            </Card>
          </VuiBox>
          <VuiBox mt="auto">
            <Footer />
          </VuiBox>
        </DashboardLayout>
      )}
    </div>
  );
}

export default Spotify;