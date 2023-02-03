import Spinner from "@components/loader/Spinner";
import { useBoughtProducts } from "@hooks/useOrders";
import { CartProduct } from "models/Product";
import { useMemo, useState } from "react";
import { useOrderHistory } from "./OrderHistoryProvider";

const OrderSidebar = () => {
  const { selectedOrder } = useOrderHistory();
  const [boughtProducts, setBoughtProducts] = useState<CartProduct[]>([]);

  const { isFetching } = useBoughtProducts(setBoughtProducts);

  const totalPrice = useMemo(() => {
    return boughtProducts.reduce((acc, product) => acc + product.quantity * product.price!, 0);
  }, [boughtProducts]);

  return (
    <div className="relative w-96">
      <h6 className="text-sm font-bold text-dark/90">ORDER DETAILS</h6>
      {isFetching && <Spinner />}
      {selectedOrder && (
        <div className=" flex w-full flex-col rounded-lg">
          <div className="flex items-center justify-between border-b-2 border-gray-200 py-4">
            <div className="font-semibold text-dark">ESF-{selectedOrder.id}</div>
            <div className="text-lg font-semibold text-dark">Total Price: {totalPrice} $</div>
          </div>
          {!isFetching && boughtProducts.map((product, i) => <BoughtProduct key={i} product={product} />)}
        </div>
      )}
    </div>
  );
};

export default OrderSidebar;

const BoughtProduct = ({ product }: { product: CartProduct }) => {
  return (
    <div className="flex items-center justify-between pt-4">
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-dark">{product.name}</div>
        <div className="font-medium text-dark/75">
          {product.quantity} x {product.price} $
        </div>
      </div>
      <div className="font-medium text-dark">{product.quantity * product.price!} $</div>
    </div>
  );
};
