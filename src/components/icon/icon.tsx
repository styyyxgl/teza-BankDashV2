import { type IconName } from "~/types/icon-name.type";
import { iconNameToSvg } from "~/utils/icon-name-to-svg";

type Properties = {
  className?: string;
  name: IconName;
};

export const Icon: React.FC<Properties> = ({ className, name }) => {
  const SvgIcon = iconNameToSvg[name];

  return <SvgIcon className={className} />;
};
