import { forwardRef } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { CHECKBOXES } from "@utils/productFilters";
import { TupleToObject } from "@appTypes/tuple";
import * as Slider from "@radix-ui/react-slider";
import { useProductFilterContext } from "./ProductFilterProvider";

const CategoryFilter = forwardRef<HTMLInputElement, { item: string } & UseFormRegisterReturn<string>>(
  ({ item, ...props }, ref) => {
    return (
      <label className="checkbox-container select-none">
        <input {...props} ref={ref} type="checkbox" />
        <div className="checkmark" />
        <div className="font-medium">{item}</div>
      </label>
    );
  }
);

const PriceFilter = () => {
  const { filters, setFilters, initialPrice } = useProductFilterContext();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>Price</div>
      <div className="flex flex-col gap-3">
        <div className="text-base">
          $ {filters.price.min} - {filters.price.max}
        </div>
        <Slider.Root
          value={[filters.price.min, filters.price.max]}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, price: { min: value[0], max: value[1] } }))}
          min={initialPrice.min}
          max={initialPrice.max}
          step={1}
          minStepsBetweenThumbs={1}
          className="relative flex h-6 w-full select-none items-center"
        >
          <Slider.Track className="relative h-[2px] flex-grow rounded-full bg-coffee-dark/50 outline-none">
            <Slider.Range className="absolute h-full rounded-full bg-coffee-dark outline-none" />
          </Slider.Track>
          <Slider.Thumb className="block h-6 w-6 rounded-full border-2 border-coffee-dark bg-white shadow-xl outline-none ring-coffee-dark/25 transition-all focus:ring-4" />
          <Slider.Thumb className="block h-6 w-6 rounded-full border-2 border-coffee-dark bg-white shadow-xl outline-none ring-coffee-dark/25 transition-all focus:ring-4" />
        </Slider.Root>
      </div>
    </div>
  );
};

type Categories = TupleToObject<typeof CHECKBOXES>;

const ProductFilter = () => {
  const { setFilters, initialPrice } = useProductFilterContext();

  const { register, handleSubmit, reset } = useForm<Categories>({
    mode: "onChange",
  });

  const onSuccessfulSubmit = (data: Categories) => {
    setFilters((prev) => ({
      categories: Object.entries(data)
        .filter(([_, value]) => value)
        .map(([key]) => key),
      price: prev.price,
    }));
  };

  const handleReset = () => {
    reset({ ...CHECKBOXES.reduce((acc, curr) => ({ ...acc, [curr]: false }), {}) });
    setFilters({ categories: [], price: { min: initialPrice.min, max: initialPrice.max } });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSuccessfulSubmit)} className="min-w-[290px] text-lg font-medium text-coffee-dark">
        <div className="flex items-center justify-between border-b-2 border-coffee-light/25 p-4">
          <div>Filters</div>
          <button className="text-sm text-coffee-light" onClick={() => handleReset()}>
            Reset
          </button>
        </div>
        <PriceFilter />
        <div className="flex flex-col gap-4 p-4">
          <div>Category</div>
          <div className="flex flex-col gap-3 text-sm">
            {CHECKBOXES.map((item) => (
              <CategoryFilter
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
