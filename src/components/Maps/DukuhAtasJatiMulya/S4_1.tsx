import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S4_1 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.32728867,0,0,.32500003,269.681,239.28)"
      // onMouseEnter={props.handleHover}
      // onMouseLeave={props.handleUnHover}
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="343"
        height="12"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_12"
          width="343"
          height="12"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAVcAAAAMCAIAAABZbWnPAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAmklEQVR4nO3WIQ6DMBiG4cqq2ZmJmVlOgZ1BYLCcYhbLLbCYiRks
p5idqZiZbcjCSrKEI/xNvvfLc4CmSd/UrYwx7TnrAzDGjPevQPhEAIKoAKCOCgDq
tgqEELz3h+PZyulSlNcamqqmvXU9rNynOYu/wPP1TkeBpmF8mL8EZen+s6gAAENU
AFBHBQB1VABQt1cgLl8AgtLz/wHmyoA+KAgaUgAAAABJRU5ErkJggg=="
        />
      </rect>
    </g>
  );
};

export default S4_1;
