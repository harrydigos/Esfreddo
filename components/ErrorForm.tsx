import WarningIcon from "./icons/WarningIcon";

type ErrorFormProps = JSX.IntrinsicElements["div"] & {
  error: boolean;
  errorMsg: string;
};

export const ErrorForm: React.FC<ErrorFormProps> = ({ error, errorMsg }) => {
  if (error) {
    return (
      <>
        <div className="flex gap-2 font-medium text-[#FF3333]">
          <WarningIcon className="fill-[#FF3333]" />
          {errorMsg}
        </div>
      </>
    );
  }
  return <></>;
};

export default ErrorForm;
