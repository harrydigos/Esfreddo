import ShieldTick from "@components/icons/ShieldTick";

type ValidateEmailProps = JSX.IntrinsicElements["div"] & {
  message?: string;
};

const ValidateEmail: React.FC<ValidateEmailProps> = ({ message }) => {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex gap-2 font-medium text-[#68C95B]">
          <ShieldTick className="fill-[#68C95B]" />
          {message || ""}
        </div>
      </div>
    </>
  );
};

export default ValidateEmail;
