import OrderHistoryTable from "@components/user/history/OrderHistoryTable";
import OrderSidebar from "@components/user/history/OrderSidebar";
import { useOrders } from "@hooks/useOrders";
import { NextPage } from "next";

const OrderHistory: NextPage = () => {
  useOrders();

  return (
    <div className="container mx-auto pt-24">
      <div className="relative flex w-full items-center justify-between border-b-2 border-black/5">
        <div className="flex flex-col gap-2 pb-5">
          <h1 className="text-4xl font-medium text-dark">Order history</h1>
          <p className="font-medium opacity-80">Manage your recent orders.</p>
        </div>
        <button className="inline-flex rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium text-dark shadow-sm">
          Download all
        </button>
      </div>
      <div className="mt-5 flex w-full gap-8">
        <OrderSidebar />
        <div className="flex-1">
          <OrderHistoryTable />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
