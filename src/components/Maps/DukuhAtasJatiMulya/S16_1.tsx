import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S16_1 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.32724036,0,0,.32500003,751.121,239.28)"
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
          id="image_66"
          width="337"
          height="12"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAVEAAAAMCAIAAABUcxmIAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAhElEQVR4nO3XsQ2CUBiFUaaiZwwTayo6BnABKztr1mABexomYALy
QqVGY+ECmnDPzRngNV/yv+puZkmr/v0AM/vpPs3PM7Bzy6J5SKJ5yPJu/vTapevS
XPv+NgyQYxrH6ObPbXusa8hxaJpSitseYvjPQxbNQxbNQ5av5tcV2Llte7b+AFpi
SSwuig2uAAAAAElFTkSuQmCC"
        />
      </rect>
    </g>
  );
};

export default S16_1;
