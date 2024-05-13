import {
  StepConnector,
  StepIconProps,
  stepConnectorClasses,
  styled,
} from "@mui/material";
import { BiCheck } from "react-icons/bi";
import { BsFillCircleFill } from "react-icons/bs";

export const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 23.6,
  height: 23.6,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active &&
    {
      // backgroundImage:
      //   "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      // boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
  ...(ownerState.completed &&
    {
      // backgroundImage:
      //   "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
}));

export function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  // const icons: { [index: string]: React.ReactElement } = {
  //   1: <SettingsIcon />,
  //   2: <GroupAddIcon />,
  //   3: <VideoLabelIcon />,
  // };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
      style={{
        backgroundColor: "white",
        border: `1px solid ${completed || active ? "red" : "grey"}`,
        borderRadius: "50%",
      }}
    >
      {completed ? (
        <BiCheck
          style={{
            backgroundColor: "red",
            borderRadius: "50%",
            height: "15px",
            width: "15px",
          }}
        />
      ) : completed ? (
        <BiCheck />
      ) : (
        <BsFillCircleFill
          style={{
            color: active ? "red" : "grey",
            height: "15px",
            width: "15px",
          }}
        />
      )}
    </ColorlibStepIconRoot>
  );
}
export const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    // top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderLeftColor: "red",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderLeftColor: "red",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    // height: 10,
    borderLeftWidth: "2px",
    marginLeft: "-1px",
    // marginLeft: "12px",
    // backgroundColor:
    //   theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    // borderRadius: 10,
  },
}));
