import { Icon } from "@tabler/icons-react";
import _ from "lodash";

interface CustomIconProps {
  button: Icon;
  size?: number | string | undefined;
  stroke?: string;
  color?: string;
}

const CustomIcon = (props: CustomIconProps) => {
  const IconButton = props.button;
  const iconSize = _.get(props, ["size"], "24");
  const iconStroke = _.get(props, ["stroke"], "1");
  const iconColor = _.get(props, ["color"], undefined)

  return (
    <>
      <IconButton size={iconSize} stroke={iconStroke} color={iconColor} />
    </>
  );
};

export default CustomIcon;
