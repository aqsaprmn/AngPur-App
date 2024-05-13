import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S2_1 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.32705886,0,0,.32500003,112.601,239.28)"
      // onMouseEnter={props.handleHover}
      // onMouseLeave={props.handleUnHover}
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="102"
        height="12"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_6"
          width="102"
          height="12"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAGYAAAAMCAIAAAAf0l8JAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAgklEQVR4nGP4PwpIBAwD7YChB6BB9vzDz1FEEH34+ns0yEaDjD5B
Nn/+/Pr6+qrmnlFEEB09dQEUZP39/aNBRiTatvvgaMYkK2OOBtlokI0GGTZ07/mH
8zce0gLdfPSa2CD7+fvvEEJnz1/s7O5NScugLiosLt1/8DAee3///QcMKwCqRm0I
h9IR9wAAAABJRU5ErkJggg=="
        />
      </rect>
    </g>
  );
};

export default S2_1;
