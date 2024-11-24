import { CSSProperties } from "react";

interface TitleUnderlineProps {
  style?: CSSProperties;
}

export default function TitleUnderline({ style }: TitleUnderlineProps) {
  return (
    <hr
      style={{
        color: "#d3d3d3",
        marginBottom: "1.5rem",
        ...style,
      }}
    ></hr>
  );
}
