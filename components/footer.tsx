import { FC } from "react";

type FooterProps = JSX.IntrinsicElements["footer"];

export const Footer: FC<FooterProps> = () => {
  return (
    <footer className="flex w-full items-center justify-center border-t">
      <p className="text-base text-slate-800 p-8">Created by Babis Digos.</p>
    </footer>
  );
};

// export const Footer: FC<FooterProps> = ({ className, ...rest }) => {
//   return (
//     <footer
//       className={`flex w-full items-center justify-center border-t ${className}`}
//       {...rest}
//     >
//       <p className="text-base text-slate-800 p-8">Created by Babis Digos.</p>
//       <Button label="My Button" />
//     </footer>
//   );
// };

// type ButtonProps = JSX.IntrinsicElements["button"] & {
//   label: string;
//   theme?: "dark" | "light";
//   variant?: "primary" | "secondary";
// };

// export const Button: FC<ButtonProps> = ({
//   theme,
//   variant = "primary",
//   label,
// }) => (
//   <button
//     className={`${variant === "primary" ? "bg:black" : "bd:2px-solid-black"}`}
//   >
//     {label}
//   </button>
// );
