import { HandledClassNames } from "@app/utils/Processor";

export interface RouteElementProp {
  selected: boolean;
  selectedAsChild: boolean;
  ref: any;
  handleSelect: () => void;
  handleHover?: () => void;
  handleUnHover?: () => void;
  isHoveredParent?: boolean;
  isHoveredChild?: boolean;
}

const S1_1 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.32744683,0,0,.32500003,81.821,239.28)"
      // onMouseEnter={props.handleHover}
      // onMouseLeave={props.handleUnHover}
      onClick={props.handleSelect}
      ref={props.ref}
    >
      <rect
        x="0"
        y="0"
        width="94"
        height="12"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_4"
          width="94"
          height="12"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAF4AAAAMCAIAAABk9p3FAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAhUlEQVR4nGP4PwpwAIaBdsDgBeCguXfv/82bowiBnj8fDZrRoCE7
aH5cvz6zuHhSTs4ogqAre/ZAg+bjhQsD7ppBhY6uXTuaoQhlqNGgGQ2a4RI0r48e
fX7wIC3Qz8uXiQ6a79//f/06qNCPd++O7NqVlZBAdTRrwoQnt24RcMDPn8BQAQDe
jAzruI5/0wAAAABJRU5ErkJggg=="
        />
      </rect>
    </g>
  );
};

export default S1_1;
