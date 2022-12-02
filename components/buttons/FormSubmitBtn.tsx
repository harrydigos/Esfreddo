import { FC, Suspense } from "react";
import styles from "./formSubmitBtn.module.scss";
import classNames from "classnames";
import Spinner from "@components/loader/Spinner";

type FormSubmitBtnProps = {
  value: string;
};

const FormSubmitBtn: FC<FormSubmitBtnProps> = ({ value }) => {
  return (
    <>
      <button
        type="submit"
        className={classNames(styles.formSubmitBtn)}
        button-text={value}
      />
    </>
  );
};

export default FormSubmitBtn;
