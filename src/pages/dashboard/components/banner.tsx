import { Box, Typography, IconButton } from "@mui/material";
import React from "react";
import { useTranslate } from "@refinedev/core";
import { Cancel } from "@mui/icons-material";

export const Banner: React.FC = () => {
  const t = useTranslate();
  return (
    <Box
      height="120px"
      borderRadius="12px"
      sx={{
        backgroundImage:
          "linear-gradient(66deg, #B2E6FD -5.25%, #38CB89 35.43%, #15BFFD 98.77%)",
      }}
    >
      <IconButton
        sx={{
          float: "right",
          right: "-8px",
          top: "-12px",
          backgroundColor: "white",
          padding: "0",
          "&:hover": {
            backgroundColor: "#f2968f",
          },
        }}
      >
        <Cancel color="error" />
      </IconButton>
      <Box
        component="img"
        width="144px"
        src="/images/banner_doctor.png"
        sx={{
          float: "right",
          right: "-16px",
          bottom: "54px",
          position: "relative",
        }}
      ></Box>

      {/* c:\Users\dpcon\Desktop\banner_doctor.png */}
      <Typography
        marginLeft="14px"
        lineHeight="120px"
        fontWeight="bold"
        variant="h6"
      >
        {t("dashboard.welcome_banner")}
      </Typography>
    </Box>
  );
};
