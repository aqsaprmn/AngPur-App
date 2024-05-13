import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "../DukuhAtasJatiMulya/S1_1";

const S13_2 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.32500003,0,0,.328,618.581,1009.32)"
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="12"
        height="60"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_47"
          width="12"
          height="60"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAAwAAAA8CAIAAADdbcwdAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAQklEQVR4nGP4jwrOnz//HwMwAPHzDz/hSNPI+szVe3Du28+/RhWN
KhpVNKpoVNGoolFFo4rIUYQM6uvr379/jyYIAFBgboy92S+fAAAAAElFTkSuQmCC"
        />
      </rect>
    </g>
  );
};

export default S13_2;
