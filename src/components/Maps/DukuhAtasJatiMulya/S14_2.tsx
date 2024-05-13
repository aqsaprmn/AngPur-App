import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S14_2 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.3269461,0,0,.33,618.581,233.04)"
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="167"
        height="12"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_50"
          width="167"
          height="12"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAKcAAAAMCAIAAACIrzqWAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAcklEQVR4nGP4PwpGHmAA4ucffo6iEYLefv41GusjDo3G+khEo7FO
Gjp67vrGXYeHOtqy6yAo1oGAT1xhFBFEBpZOLr5hQx55Bd6/f380r48sNFrCj0Q0
GusjEY3G+khEiFgHskbRCEGfvv+BxvooGGkAAIrPo28jeBi1AAAAAElFTkSuQmCC"
        />
      </rect>
    </g>
  );
};

export default S14_2;
