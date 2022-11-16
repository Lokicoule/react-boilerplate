import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { useThemeColor } from "./ThemeColor.context";

export function ThemeColor() {
  const theme = useTheme();
  const { toggleThemeColor } = useThemeColor();

  return (
    <IconButton
      color="inherit"
      aria-label="toggle theme color"
      onClick={toggleThemeColor}
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
}
