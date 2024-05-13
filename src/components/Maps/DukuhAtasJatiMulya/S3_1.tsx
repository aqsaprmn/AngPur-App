import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S3_1 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.32728724,0,0,.32500003,146.321,239.28)"
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="376"
        height="12"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_8"
          width="376"
          height="12"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAXgAAAAMCAIAAADnOzGSAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAyklEQVR4nO3XMQqCUBzH8XcCL9DeCcJVAo/R4Cw6dwJxfBB4Ao/x
QHJoEBehyT1odrDBwYpoi3Dx74v4fvkcwIf4e6juRETCKdsPQET/32to2hYApAwD
QwNAGEMD4Kmr6yrPhRyNUVrrQxThU+j7O9fFwrar1VopLGzjOHLv1Pc8laap9U/6
N5ksk9t4fHMpCuvXO2bGrxMAcQwNAHEMDQBxDA0WcGuaa1lK6Ora+ukw7T00fQ/I
OVeVTpIwCOa1j+OTMdZPh2nj+ACOuq9eSUpO4wAAAABJRU5ErkJggg=="
        />
      </rect>
    </g>
  );
};

export default S3_1;
