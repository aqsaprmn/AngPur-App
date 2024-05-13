import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S15_2 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.3274359,0,0,.32500003,673.841,232.74)"
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="234"
        height="12"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_54"
          width="234"
          height="12"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAOoAAAAMCAIAAADj67aGAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAcElEQVR4nO3WoRGAMBBE0asqOk3EUQUtpYF0EI2ggNjomKiTwIDA
Y5id+TuvgBNfnB2Myc7+PoCx77vzbQ0Q0zv5Qhb5QtiTb4xxCQHQsqbk7lZr3XIG
tOyl8DxAFr8vhJEvhJEvhL35jgGImfMq9wSFv+pLJ0MDkwAAAABJRU5ErkJggg=="
        />
      </rect>
    </g>
  );
};

export default S15_2;
