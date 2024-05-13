export const FormTitle = ({
  children,
  fontSize,
  onClick,
  forElement,
  isPointing,
}: {
  children: string;
  fontSize?: string;
  onClick?: any;
  isPointing?: boolean;
  forElement?: string;
}) => {
  return (
    <label
      className="text-base text-text-title font-bold mb-0 pb-0"
      style={{
        fontSize: fontSize ?? "1rem",
        cursor: isPointing ? "pointer" : "",
      }}
      onClick={onClick}
      htmlFor={forElement}
    >
      {children}
    </label>
  );
};
