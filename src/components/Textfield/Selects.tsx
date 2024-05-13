import { Select, SelectProps, styled } from "@mui/material";

// const MainSelectProps: SelectProps = {
//   variant: "standard",
// };

export const MainSelect = styled(Select, {
  shouldForwardProp: (_prop) => true,
  // shouldForwardProp: (prop) => prop !== "variant",
})<SelectProps>(() => ({
  borderRadius: "10px",
}));
