import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const SD1_1 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.32707317,0,0,.32500003,1538.861,239.28)"
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="82"
        height="12"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_81"
          width="82"
          height="12"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAFIAAAAMCAIAAAB+yn1LAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAXklEQVR4nGP4PyIBAxA///BzRKGfv/+OenvEoFFvjyQ06u2RhEa9
PZIQ1NtvP/8iiPYfPbPn0ElaoAvX7hLjACqi33/+MRDZmjt8+LCkpCQDtYG3t/fF
ixdp0PokAABlAorYYsbx3gAAAABJRU5ErkJggg=="
        />
      </rect>
    </g>
  );
};

export default SD1_1;
