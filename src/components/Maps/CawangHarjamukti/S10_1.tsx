import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "../DukuhAtasJatiMulya/S1_1";

const S10_1 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.33,0,0,.32707963,611.981,625.14)"
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="12"
        height="226"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_33"
          width="12"
          height="226"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAAwAAADiCAIAAAD1WbFCAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAnklEQVR4nO3WoQqDQBjAcZ9gdVXWZG3YBqaBSTDtUVYWfCbTwZJg
GohFZGXYxupg4TYQzg8PRDDY9f/xh7vjfg/wOWY0WmullJmMY4/35y8VdeMdjvY+
BAKBQCAQaJVI2mxdEAgEAoFAoL7d3q+erxkkG4bsGSAQCAQCgRaOgjBW2X0GnaJz
estBIBAIBAItE31/re1yTcrqMTwl+e0AXXUKQX/s/cYAAAAASUVORK5CYII="
        />
      </rect>
    </g>
  );
};

export default S10_1;
