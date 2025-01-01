import React, { useState } from "react";
import { Card, useMediaQuery } from "@mui/material";
import VuiButton from "../../components/VuiButton";
import SpotifyComponent from "./components/SpotifyComponent"; // Import Spotify-Komponente

function SpotifyBox() {
  const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen Zustand
  const isSmallScreen = useMediaQuery("(max-width: 960px)"); // Breakpoint für Responsive Design

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen); // Fullscreen-Modus umschalten
  };

  // Fullscreen Styles
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

  return (
    <div
      style={{
        ...fullscreenStyles,
        width: isFullscreen ? "100vw" : "100%",
        height: isFullscreen
          ? "100vh"
          : isSmallScreen
          ? "300px"
          : "40vw",
        transition: "all 0.3s ease",
      }}
    >
      <Card
        sx={{
          width: isFullscreen ? "95%" : "100%",
          height: isFullscreen ? "95%" : "100%",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          padding: "20px",
          boxShadow: isFullscreen
            ? "0 8px 20px rgba(255, 255, 255, 0.4)"
            : "0 4px 12px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Fullscreen Button */}
        <VuiButton
          onClick={toggleFullscreen}
          variant="contained"
          color="info"
          style={{
            fontSize: "1.3rem",
            padding: "0.4rem 0.8rem",
            backgroundColor: isFullscreen ? "#ff5252" : "royalblue",
          }}
        >
          {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        </VuiButton>

        {/* Spotify Component Rendering */}
        <SpotifyComponent />
      </Card>
    </div>
  );
}

export default SpotifyBox;