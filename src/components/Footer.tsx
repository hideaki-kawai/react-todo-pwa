import { Box } from "@mui/material";
import React from "react";

export const Footer = () => {
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          color: "white",
          backgroundColor: "primary.dark",
          height: 56,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: 0,
        }}
      >
        © Hideaki Kawai
      </Box>
    </div>
  );
};
