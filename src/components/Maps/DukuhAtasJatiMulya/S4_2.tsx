import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S4_2 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.32711373,0,0,.32769234,269.381,232.74)"
      onClick={props.handleSelect}
      id="testingZoom1"
    >
      <rect
        x="0"
        y="0"
        width="343"
        height="13"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_11"
          width="343"
          height="13"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAVcAAAANCAIAAACSMbpqAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAeUlEQVR4nO3asQ2DMABEUaai9hCUrMFEDGKJLiPQ0NAiVjCkSCQm
oLj39QZwdZItd01Sdt3bB5D0cr8VWFcgzrZZAchmBSDdfwVqrZ95BtLsy/JdgXsC
Silj3wNppmFwI4Bs3gUgnRWAdFYA0j1W4DiAOOfZ/CCWdAFgfe0K+oLmaAAAAABJ
RU5ErkJggg=="
        />
      </rect>
    </g>
  );
};

export default S4_2;
