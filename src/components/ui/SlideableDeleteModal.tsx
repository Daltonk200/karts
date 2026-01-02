"use client";

import { Box, Button, Typography, Alert, CircularProgress } from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";
import SlideableDrawer from "./SlideableDrawer";

interface SlideableDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  itemName?: string;
  isLoading?: boolean;
}

export default function SlideableDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemName,
  isLoading = false,
}: SlideableDeleteModalProps) {
  return (
    <SlideableDrawer
      open={isOpen}
      onClose={onClose}
      title={title}
      width={400}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Alert Icon */}
        <Alert
          severity="warning"
          icon={<WarningIcon />}
          sx={{
            bgcolor: "#fef3c7",
            border: "1px solid #fbbf24",
            "& .MuiAlert-icon": {
              color: "#d97706",
            },
          }}
        >
          <Typography variant="body2" sx={{ color: "#92400e", fontWeight: 500 }}>
            {description}
          </Typography>
        </Alert>

        {/* Item Name */}
        {itemName && (
          <Box
            sx={{
              p: 2,
              bgcolor: "grey.50",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "grey.200",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 0.5, fontSize: "0.75rem" }}
            >
              Item to delete:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary" }}>
              {itemName}
            </Typography>
          </Box>
        )}

        {/* Warning Text */}
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontSize: "0.875rem" }}
        >
          This action cannot be undone. Please make sure you want to proceed.
        </Typography>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            pt: 2,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Button
            onClick={onClose}
            disabled={isLoading}
            variant="outlined"
            fullWidth
            sx={{
              borderColor: "grey.300",
              color: "text.primary",
              "&:hover": {
                borderColor: "grey.400",
                bgcolor: "grey.50",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#dc2626",
              color: "white",
              "&:hover": {
                bgcolor: "#b91c1c",
              },
              "&:disabled": {
                bgcolor: "#dc2626",
                opacity: 0.6,
              },
            }}
            startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </Box>
      </Box>
    </SlideableDrawer>
  );
}

