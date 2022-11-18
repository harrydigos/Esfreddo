import { FC } from "react";
import styles from "./formSubmitBtn.module.scss";
import classNames from "classnames";

type Props = {
  value: string;
  // TODO: Add loading state
  // isLoading?: boolean;
};

const FormSubmitBtn: FC<Props> = ({ value }) => {
  return (
    <button
      type="submit"
      className={classNames(styles.formSubmitBtn)}
      button-text={value}
    />
  );
};

export default FormSubmitBtn;
