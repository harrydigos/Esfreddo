import { Dispatch, forwardRef, SetStateAction } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { CHECKBOXES } from "@utils/productFilters";
import { TupleToObject } from "@appTypes/tuple";

const CheckboxFilter = forwardRef<HTMLInputElement, { item: string } & UseFormRegisterReturn<string>>(
  ({ item, ...props }, ref) => {
    return (
      <label className="checkbox-container">
        <input {...props} ref={ref} type="checkbox" />
        <div className="checkmark" />
        <div className="text" data-text={item} />
      </label>
    );
  }
);

type CheckFields = TupleToObject<typeof CHECKBOXES>;

const ProductFilter = ({ onFilter }: { onFilter: Dispatch<SetStateAction<string[]>> }) => {
  const { register, handleSubmit, reset } = useForm<CheckFields>({
    mode: "onChange",
    defaultValues: { ...CHECKBOXES.reduce((acc, curr) => ({ ...acc, [curr]: false }), {}) },
  });

  const onSuccessfulSubmit = (data: CheckFields) => {
    onFilter(
      Object.entries(data)
        .filter(([_, value]) => value)
        .map(([key]) => key)
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSuccessfulSubmit)} className="min-w-[290px] text-lg font-medium text-coffee-dark">
        <div className="flex items-center justify-between border-b-2 border-coffee-light/25 p-4">
          <div>Filters</div>
          <button className="text-sm text-coffee-light" onClick={() => reset()}>
            Reset
          </button>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div>Price</div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div>Category</div>
          <div className="flex flex-col gap-3 text-sm">
            {CHECKBOXES.map((item) => (
              <CheckboxFilter
                {...register(item, {
                  onChange: () => handleSubmit(onSuccessfulSubmit)(),
                })}
                key={item}
                item={item}
              />
            ))}
          </div>
        </div>
      </form>
    </>
  );
};

export default ProductFilter;
