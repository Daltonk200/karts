"use client";

import { useEffect, ReactNode } from "react";
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface SlideableDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: number | string;
  anchor?: "left" | "right" | "top" | "bottom";
}

export default function SlideableDrawer({
  open,
  onClose,
  title,
  children,
  width = "50%",
  anchor = "right",
}: SlideableDrawerProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const drawerWidth = isMobile ? "100%" : width;

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          maxWidth: "90vw",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
        },
      }}
      ModalProps={{
        keepMounted: false, // Better performance on mobile
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 3,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 600,
              fontSize: "1.25rem",
              color: "text.primary",
            }}
          >
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: "text.secondary",
              "&:hover": {
                bgcolor: "action.hover",
                color: "text.primary",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            p: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Drawer>
  );
}

