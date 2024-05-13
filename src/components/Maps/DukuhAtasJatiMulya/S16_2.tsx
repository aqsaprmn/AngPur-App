import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S16_2 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.32724036,0,0,.32500003,751.121,232.74)"
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="337"
        height="12"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_57"
          width="337"
          height="12"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAVEAAAAMCAIAAABUcxmIAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAfklEQVR4nO3XOw6CQBSGUZZGQWvL3myo2ICtjYVLoLGypSUxBnwF
ldCwAUjmni9nAdP8yZ1slBSpbOsHSFq1efNt9wDS1t1fNg+B2DzEMm8+nyp2JZC2
fVX/N3+aOhzPQNqay9VtD4H4z0MsNg+x2DzEstj8bXgDaeufn9/YvyGptFw1RYPP
AAAAAElFTkSuQmCC"
        />
      </rect>
    </g>
  );
};

export default S16_2;
