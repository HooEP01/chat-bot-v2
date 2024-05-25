import { Icon } from "@tabler/icons-react";
import _ from "lodash";

interface CustomIconProps {
  button: Icon;
  size?: number | string | undefined;
  stroke?: string;
}

const CustomIcon = (props: CustomIconProps) => {
  const IconButton = props.button;
  const iconSize = _.get(props, ["size"], "24");
  const iconStroke = _.get(props, ["stroke"], "1");

  return (
    <>
      <IconButton size={iconSize} stroke={iconStroke} />
    </>
  );
};

export default CustomIcon;
