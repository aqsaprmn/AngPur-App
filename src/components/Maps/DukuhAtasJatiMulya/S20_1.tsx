import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S20_1 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.3274172,0,0,.32500003,1234.781,239.28)"
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="302"
        height="12"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_69"
          width="302"
          height="12"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAS4AAAAMCAIAAABTMcedAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAXElEQVR4nO3WuwnAMBBEwYtdiEHVuH6l7kGgzMafHrTBLIM6eJzq
MrOA1fOcJ7DSnG+KvQMrjSFFCCBFiPCleLS2VwGrbFWuIgTwQYUIUoQIUoQIUoQI
f4pmtno3HPnsBAznSWQAAAAASUVORK5CYII="
        />
      </rect>
    </g>
  );
};

export default S20_1;
