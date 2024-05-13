import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S3_2 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.32728724,0,0,.32769234,146.321,232.74)"
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="376"
        height="13"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_7"
          width="376"
          height="13"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAXgAAAANCAIAAAAsZ+I3AAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAn0lEQVR4nO3bMQrCQBRF0dlGdpPCLti6TyvBJsI0mi6F2qW1FWwU
YpRAFpDCT0DO5Swg0zyYwKSPFFzbtlVVpV9XFEXOeenDaVZp6Q/Q/9d13TGmpmmW
PpxmNQ7N7f4CCNK/B0MDxDI0QLhxaOq63u4zQITd4TQOTVmWq/UGIMj5cnV1AmL5
RwOEMzRAOEMDhJuG5vHsAYIMgycIkuL7AgQpfL3VVbBKAAAAAElFTkSuQmCC"
        />
      </rect>
    </g>
  );
};

export default S3_2;
