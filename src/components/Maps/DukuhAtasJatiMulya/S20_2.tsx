import { HandledClassNames } from "@app/utils/Processor";
import { RouteElementProp } from "./S1_1";

const S20_2 = (props: RouteElementProp) => {
  return (
    <g
      transform="matrix(.3274172,0,0,.32500003,1234.781,232.74)"
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
          id="image_64"
          width="302"
          height="12"
          xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAS4AAAAMCAIAAABTMcedAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAf0lEQVR4nO3avQlCMRiG0Uxga+swtrbWIu6SeWxtHSIj3EoQrK7X
fxAcwOL7AufhZIQ3pEh5SkpQeZ/hPAKBxuluihDPFCEFU4QUPlOstS5Xa7o2my/o
2ma7K621/eFI18Ivdf7kgQopmCKkYIqQwneKp8sVCDTdHiXuo4+kXy87Vk0R90kN
AgAAAABJRU5ErkJggg=="
        />
      </rect>
    </g>
  );
};

export default S20_2;
