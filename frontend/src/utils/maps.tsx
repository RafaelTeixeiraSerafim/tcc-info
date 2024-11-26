import { ChipOwnProps } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ReportIcon from "@mui/icons-material/Report";
import WarningIcon from "@mui/icons-material/Warning";

export const translateSeverity: { [key: string]: string } = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
};

export const severityMap: {
  [key: string]: {
    color: ChipOwnProps["color"];
    label: string;
    icon: React.ReactElement;
  };
} = {
  LOW: {
    color: "info",
    label: translateSeverity["LOW"],
    icon: <InfoIcon fontSize="small" />,
  },
  MEDIUM: {
    color: "warning",
    label: translateSeverity["MEDIUM"],
    icon: <WarningIcon fontSize="small" />,
  },
  HIGH: {
    color: "error",
    label: translateSeverity["HIGH"],
    icon: <ReportIcon fontSize="small" />,
  },
};
