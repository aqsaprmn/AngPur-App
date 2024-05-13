import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S21_1 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.3272093,0,0,.32500003,1334.621,239.28)"
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="258"
        height="12"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_75"
          width="258"
          height="12"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAQIAAAAMCAIAAAAGUCTDAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAcklEQVR4nO3XsQmAMBRF0T+bBAyonbinVhKwUAfIGAGbiDYqgqYR
3OHfx8kIlyTyMKZ+ks6yXWE9AYX24yYDaEcGwJeB975zU+tmQKF+GGOMYq01ZW2q
BlAoy4t0E/Aogmr8DQAyAMgACGQAhH8GjCnfCx641e9Ofw9+AAAAAElFTkSuQmCC"
        />
      </rect>
    </g>
  );
};

export default S21_1;
