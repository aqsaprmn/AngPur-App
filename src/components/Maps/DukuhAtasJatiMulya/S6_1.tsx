import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S6_1 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.32724638,0,0,.32500003,549.161,239.28)"
      // onMouseEnter={props.handleHover}
      // onMouseLeave={props.handleUnHover}
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="207"
        height="12"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_18"
          width="207"
          height="12"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAM8AAAAMCAIAAABKn34SAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAbUlEQVR4nO3WsQmAMBRF0cwmggGxdU87ESzEIqPYCjYGExXBFf6z
8D7OACku/LiLMdXc1w9gP9pT27JGwNq2J2qDCLVB56nNe182LWCtqGoXQuiGGbDW
jxOXFCL826BDbdChNui8tcUjA9ZSPm/dJKLDRZcqSgAAAABJRU5ErkJggg=="
        />
      </rect>
    </g>
  );
};

export default S6_1;
