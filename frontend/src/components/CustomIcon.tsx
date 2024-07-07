import { Icon, IconGhost } from "@tabler/icons-react";

interface CustomIconProps {
  icon: Icon;
  size?: number | string | undefined;
  stroke?: string;
  color?: string;
}

const CustomIcon = (props: CustomIconProps) => {
  const { icon: Icon = IconGhost, size = "24", stroke = "1", color } = props;

  return (
    <>
      <Icon size={size} stroke={stroke} color={color} />
    </>
  );
};

export default CustomIcon;
