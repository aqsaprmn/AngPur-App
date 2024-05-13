import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S21_2 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.3272093,0,0,.32500003,1334.621,232.74)"
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
          id="image_73"
          width="258"
          height="12"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAQIAAAAMCAIAAAAGUCTDAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAdElEQVR4nO3XsQnAIBBGYacSS2ewC2SQ7CNkDC1DRrjGQoKVTSYw
BAxkh3s/H27w4DSDMfUz71PKEAE06p0MoB4ZADODnPOx72eMgDZXSjMD7/3i3Got
oM0WAkcRwN8AEDIAhAwA+WfQ2qgV0Oi+vwwY070HVLG2dfbMZvAAAAAASUVORK5CYII="
        />
      </rect>
    </g>
  );
};

export default S21_2;
