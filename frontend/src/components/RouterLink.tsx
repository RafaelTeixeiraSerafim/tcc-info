import { useTheme } from "@mui/material";
import { CSSProperties } from "react";
import { Link, To } from "react-router-dom";

interface RouterLinkProps {
  to: To;
  children: React.ReactNode;
  style?: CSSProperties;
}

export default function RouterLink({ to, children, style }: RouterLinkProps) {
  const theme = useTheme();

  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: theme.palette.secondary.main,
        ...style,
      }}
    >
      {children}
    </Link>
  );
}
