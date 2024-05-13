import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#FAF9F6",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "0.1px solid #B2BEB5",
    borderRadius: "10px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#B2BEB5",
  },
}));
