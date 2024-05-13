import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S1_2 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.32709677,0,0,.32769234,81.821,232.74)"
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="93"
        height="13"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_3"
          width="93"
          height="13"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAF0AAAANCAIAAABEnfVjAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAjUlEQVR4nGP4PyjBjx8/du/ezUADkJKS8vjxY4IOYKCDJ8kAf/78
OXr06AnagHfv3hF0AChcXn369fzDz1EEQcDQGA2X0XChc7g8ePlp467DwwZtP3AS
Gi7nz5/nEZHhE1cYRUAkIKm0atOu0XxEs3w0/NBouIyGC3nh8uXHn8+jCIaAofF/
0PYDBhwAAMrkCf6Nt3iDAAAAAElFTkSuQmCC"
        />
      </rect>
    </g>
  );
};

export default S1_2;
