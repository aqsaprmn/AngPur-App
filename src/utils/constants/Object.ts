import { SxProps, Theme } from "@mui/material";

export const columnStandard: any = {
  align: "left",
  headerAlign: "left",
  flex: 1,
  groupable: false,
};

export const GlassMorphismDialog: SxProps<Theme> = {
  background: "rgba(255, 255, 255, 0.7)",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)",
  "-webkit-backdrop-filter": "blur(5px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
};
