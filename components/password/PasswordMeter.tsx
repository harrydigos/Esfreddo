import {
  passwordMediumRegex,
  passwordStrongRegex,
  passwordVeryStrongRegex,
} from "@utils/regex";
import { FC } from "react";
import classnames from "classnames";
import styles from "./passwordMeter.module.scss";

type PasswordMeterProps = JSX.IntrinsicElements["div"] & {
  password: string;
};

const getPasswordStrength = (password: string): number => {
  if (passwordVeryStrongRegex.test(password)) {
    return 3;
  } else if (passwordStrongRegex.test(password)) {
    return 2;
  } else if (passwordMediumRegex.test(password)) {
    return 1;
  }
  return 0;
};

const passwordStrengthText = [
  "😞 Weak",
  "😐 Meh, it's ok",
  "😇 Almost. Must contain a special character",
  "😎 Awesome, you have a secure password",
];

const PasswordMeter: FC<PasswordMeterProps> = ({ password }) => {
  if (password.length === 0) {
    return <></>;
  }

  const passwordStrength = getPasswordStrength(password);

  return (
    <>
      <div className="w-full pt-1 flex flex-col gap-1">
        <div className={classnames(styles.bar)}>
          <div
            className={classnames(
              styles.strength,
              styles["--" + passwordStrength]
            )}
          ></div>
        </div>
        <div className="font-semibold text-[#7f7f7f]">
          {passwordStrengthText[passwordStrength]}
        </div>
      </div>
    </>
  );
};

export default PasswordMeter;
