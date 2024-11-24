import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box, useTheme } from "@mui/material";

export default function DefaultProductImage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "14rem",
        aspectRatio: "1 / 1.1",
        flex: 1,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <AddPhotoAlternateIcon fontSize="large" sx={{ margin: "auto" }} />
    </Box>
  );
}
