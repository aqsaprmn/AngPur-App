import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S2_2 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.32705886,0,0,.32769234,112.601,232.74)"
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="102"
        height="13"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_5"
          width="102"
          height="13"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAGYAAAANCAIAAADUjoysAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAfklEQVR4nGP4PwTBxYsXvb29GagNJCUlDx8+TNB2Bjr4kOrg9u3b
J2gDTp06RdB2WJDdvDmKCKPnz0eDbDTI6BNk+8Hg5OLFo4gg+ggMNWCQOYBBjJnZ
KCKIZjU1jWZMsjLmaJCNBtlokA0qhBJkb96MIsLo8+f/Q7TDNLAAAKNX+f9qoOYF
AAAAAElFTkSuQmCC"
        />
      </rect>
    </g>
  );
};

export default S2_2;
