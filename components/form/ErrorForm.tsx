import WarningIcon from "@components/icons/WarningIcon";

type ErrorFormProps = JSX.IntrinsicElements["div"] & {
  error: boolean;
  errorMsg?: string;
};

const ErrorForm: React.FC<ErrorFormProps> = ({ error, errorMsg }) => {
  if (error) {
    return (
      <div className="flex w-full justify-center gap-2 font-medium text-[#FF3333]">
        <WarningIcon className="fill-[#FF3333]" />
        {errorMsg || ""}
      </div>
    );
  }
  return <></>;
};

export default ErrorForm;
