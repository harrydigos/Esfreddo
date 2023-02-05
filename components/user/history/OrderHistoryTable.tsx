import { MoreIcon } from "@components/icons";
import { Order } from "models/Order";
import { useOrderHistory } from "./OrderHistoryProvider";

const OrderHistoryTable = () => {
  const { orders } = useOrderHistory();

  return (
    <div className="rounded-lg border border-gray-200">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead>
          <tr className="whitespace-nowrap text-left font-semibold text-dark/90">
            <th className="px-4 py-3">Order number</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date ordered</th>
            <th className="px-4 py-3">Progress</th>
            <th className="w-5 px-4 py-3" />
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 whitespace-nowrap">
          {orders.map((order, i) => (
            <OrderRow key={i} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;

const OrderRow = ({ order }: { order: Order }) => {
  const { setSelectedOrder } = useOrderHistory();

  return (
    <tr
      onClick={() => setSelectedOrder(order)}
      className="cursor-pointer text-left font-medium text-dark/90 hover:bg-gray-50"
    >
      <td className="px-4 py-4 font-semibold text-dark">ESF-{order.id}</td>
      <td className="px-4 py-4">
        <div className="inline-flex select-none rounded-full bg-green-100 py-1 px-2 text-xs font-semibold text-green-600">
          Paid
        </div>
      </td>
      <td className="px-4 py-4">{order.date?.toString()}</td>
      <td className="px-4 py-4">
        <ProgressBar date={order.date} />
      </td>
      <td className="px-4 py-4">
        <MoreIcon className="rotate-90 fill-dark/90" width={20} />
      </td>
    </tr>
  );
};

const ProgressBar = ({ date }: { date: Date | null }) => {
  return (
    <div className="h-2 max-w-[160px] rounded-full bg-gray-100">
      <div
        className="h-full rounded-full bg-gradient-to-r from-coffee-light to-coffee-cream"
        style={{ width: `${getDayDiff(new Date(date?.toString() || 0))}%` }}
      />
    </div>
  );
};

/* Returns a percentage based on the number of days since the order was placed. */
const getDayDiff = (startDate: Date) => {
  if (!startDate) return 0;

  const now = new Date();
  const msInDay = 24 * 60 * 60 * 1000;
  const diff = Math.round(Math.abs(Number(now) - Number(startDate)) / msInDay);

  return diff >= 5 ? 100 : diff * 20;
};
