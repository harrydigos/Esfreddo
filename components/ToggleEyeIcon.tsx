import EyeIcon from "@components/icons/EyeIcon";
import EyeSlashIcon from "@components/icons/EyeSlashIcon";

const ToggleEyeIcon: React.FC<{ isPasswordHidden: boolean }> = ({
  isPasswordHidden,
}) => {
  if (isPasswordHidden) return <EyeIcon className="stroke-coffee-dark" />;
  return <EyeSlashIcon className="stroke-coffee-dark" />;
};

export default ToggleEyeIcon;
