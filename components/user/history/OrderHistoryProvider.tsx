import { createContext, FC, PropsWithChildren, useContext, useState } from "react";
import { Order } from "models/Order";

const OrderHistoryContext = createContext({
  orders: [] as Order[],
  setOrders: (orders: Order[]) => {},
  selectedOrder: null as Order | null,
  setSelectedOrder: (order: Order) => {},
});

export const useOrderHistory = () => useContext(OrderHistoryContext);

const OrderHistoryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <OrderHistoryContext.Provider value={{ orders, setOrders, selectedOrder, setSelectedOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};

export default OrderHistoryProvider;
