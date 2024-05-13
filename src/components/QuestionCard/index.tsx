import healthIcon from "@app/assets/img/kesehatan-logo.png";
import { cn } from "@app/utils/common";

type Props = {
  title: string;
  mode?: string;
  subtitle?: string;
  icon?: boolean;
  time?: string;
  passed?: boolean;
  answer?: string;
};
const QuestionCard = ({
  title,
  subtitle,
  mode,
  icon,
  time,
  passed,
  answer,
}: Props) => {
  console.log(mode);
  return (
    <div
      className={cn(
        "bg-white rounded-xl flex justify-between p-4 shadow-sm",
        icon ? "" : "items-center"
      )}
    >
      <div className={cn("grid gap-6", icon ? "grid-cols-[75px_1fr]" : "")}>
        {icon && <img src={healthIcon} />}
        <div className="grid gap-2">
          <p className="font-medium">{title}</p>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-cyan-700 font-medium">{subtitle}</p>
            <p className="font-medium">{answer}</p>
          </div>
        </div>
      </div>
      <div className={cn("flex flex-col", time ? "gap-2" : "")}>
        {time && <p>{time}</p>}
        {passed && (
          <p className="text-cyan-700 font-medium">
            {passed ? "Lulus" : "Tidak Lulus"}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
