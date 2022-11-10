import {
  passwordMediumRegex,
  passwordStrongRegex,
  passwordVeryStrongRegex,
} from "@utils/regex";
import { FC } from "react";

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
  const passwordStrength = getPasswordStrength(password);
  if (password.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className="w-full pt-1 flex flex-col gap-1">
        <div className="password-bar">
          <div className={`strength --${passwordStrength}`}></div>
        </div>
        <div className="font-semibold text-[#7f7f7f]">
          {passwordStrengthText[passwordStrength]}
        </div>
      </div>
    </>
  );
};

export default PasswordMeter;