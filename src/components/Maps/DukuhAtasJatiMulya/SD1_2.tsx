import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const SD1_2 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.32727275,0,0,.32500003,1539.161,232.74)"
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="44"
        height="12"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_80"
          width="44"
          height="12"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAACwAAAAMCAIAAACWSshgAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAbklEQVR4nGP4TwQ4fPhwYWFhCrVBV1fXxYsXgeYzgCx59Ag/enP+
/LOTJ2mBPl+79v/LF7Ajbt4cSPTx46gj4I4wMDBQY2AgBjlKS8eYmVEdednYkBAS
T/btO7l4MdXR4a1bB0d0jDpi0DlioAEAWWcBEnZmIAsAAAAASUVORK5CYII="
        />
      </rect>
    </g>
  );
};

export default SD1_2;
