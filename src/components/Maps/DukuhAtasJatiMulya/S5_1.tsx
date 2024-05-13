import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S5_1 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.32722987,0,0,.32500003,381.941,239.28)"
      // onMouseEnter={props.handleHover}
      // onMouseLeave={props.handleUnHover}
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="509"
        height="12"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_15"
          width="509"
          height="12"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAf0AAAAMCAIAAADnF/PXAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAA40lEQVR4nO3YvQqCUACGYS/JubG5i3ByCIeuo0maorEpaHIIKhcF
U2xoEYIanIIWaxNLAqOMQFr9qc778uxHh/MNR8qIiEikpKY/gIiIau25+2GY7XYA
gP8XRew+AIiE3QcAseS7P+33B5oGAPh7s/H4sfuL4bDxTwEA1MAxDN55AEAkvO8D
gFjYfQAQy+fu37bbo21X4eR5zf8wILBrEHC7v1bkupvJpArhfF4467X7SZLFce6w
3490vasopXOWy8v5/D4IQM2qu91ry2r8735d4Ps9VW3Jcrk67fbKNAtnpekdNg0B
Ev7SoqwAAAAASUVORK5CYII="
        />
      </rect>
    </g>
  );
};

export default S5_1;
