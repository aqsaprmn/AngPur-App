import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "../DukuhAtasJatiMulya/S1_1";

const S11_1 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.33,0,0,.3273563,611.981,699.06)"
      onClick={props.handleSelect}
    >
      <rect
        x="0"
        y="0"
        width="12"
        height="522"
        className={`${HandledClassNames(props)}`}
      >
        <image
          id="image_34"
          width="12"
          height="522"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAAwAAAIKCAIAAACY0TmEAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAmklEQVR4nO3KuwnDMAAEUM+oBbSABzDqjfo0at2p8hwaQXiafAhJ
YQhOK3jHNXe86f5HptNurdVaf6DjeHfPeQnhO1+FIAiCIAiCIAiCoBHRltIa4wW6
zfOzEARBEARBEARBEARBEARBEARBEARB0EBojXFL6QItIew5QxAEQRAEQRAEQRAE
QRAEQRAEQRAEQQOgT0opvffT+QCJUYntola0QQAAAABJRU5ErkJggg=="
        />
      </rect>
    </g>
  );
};

export default S11_1;
