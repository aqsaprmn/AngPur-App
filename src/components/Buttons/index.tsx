import { LoadingButton } from "@mui/lab";
import { ButtonProps, styled } from "@mui/material";

interface CustomButtonProp {
  loading?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

export const MainCustomButton = styled(
  LoadingButton,
  {}
)<CustomButtonProp>(({ loading, backgroundColor, textColor }) => ({
  boxShadow: "none",
  textTransform: "none",
  borderRadius: "6px",
  padding: "0.7rem 2rem",
  color: textColor ?? "#FFF",
  backgroundColor: backgroundColor ?? "#E41205",
  fontWeight: "600",
  fontSize: "12px",
  ...(loading && {
    backgroundColor: "grey !important",
  }),
  ":hover": {
    boxShadow: "none",
    backgroundColor: backgroundColor ?? "#E41205",
    filter: "lighten(90%)",
    transition: "ease-in-out 0.3s",
  },
}));

export const MainCustomButtonDeny = styled(
  LoadingButton,
  {}
)<CustomButtonProp>(({ loading, backgroundColor, textColor }) => ({
  boxShadow: "none",
  textTransform: "none",
  borderRadius: "6px",
  padding: "0.7rem 2rem",
  color: textColor ?? "#FFF",
  backgroundColor: backgroundColor ?? "#969696",
  fontWeight: "600",
  fontSize: "12px",
  ...(loading && {
    backgroundColor: "grey !important",
  }),
  ":hover": {
    boxShadow: "none",
    backgroundColor: backgroundColor ?? "#969696",
    filter: "lighten(90%)",
    transition: "ease-in-out 0.3s",
  },
}));

interface MainCustomOutlinedButtonProps extends ButtonProps {
  loading?: boolean;
  colorCustom?: string;
}

export const MainCustomOutlinedButton = ({
  props,
}: {
  props: MainCustomOutlinedButtonProps;
}) => {
  return (
    <LoadingButton
      loading={props.loading ?? false}
      {...props}
      variant="outlined"
      disableElevation
      size="small"
      sx={{
        ...props.sx,
        boxShadow: "none",
        textTransform: "none",
        borderRadius: "6px",
        padding: "0.7rem 2rem",
        color: props.colorCustom ?? "#367196",
        backgroundColor: "transparent",
        fontWeight: "600",
        fontSize: "12px",
        borderColor: props.colorCustom ?? "#367196",
        // ...(loading && {
        //   backgroundColor: "grey !important",
        // }),
        ":hover": {
          boxShadow: "none",
          backgroundColor: "transparent",
          filter: "lighten(90%)",
          transition: "ease-in-out 0.3s",
        },
      }}
    />
  );
};
