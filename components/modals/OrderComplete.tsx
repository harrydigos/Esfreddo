import { useCartDropdownContext } from "@components/dropdowns/cart/CartDropdownProvider";
import { TickCircle } from "@components/icons";
import { createPortal } from "react-dom";

const OrderCompleteModal = () => {
  const { showCompleteModal, setShowCompleteModal } = useCartDropdownContext();

  if (!showCompleteModal) return null;

  return (
    <>
      {createPortal(
        <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/10 backdrop-blur-[1px]">
          <div className="flex w-80 flex-col items-center rounded-xl bg-white p-6">
            <TickCircle className="stroke-green-600" height={80} />
            <div className="mt-4 mb-2 text-2xl font-semibold text-coffee-dark">Thank you!</div>
            <div className="mb-4 font-medium text-coffee-dark/80">Your order has been received</div>
            <button
              className="flex w-full justify-center rounded-lg bg-coffee-dark py-2 text-lg text-coffee-cream-light transition-colors hover:bg-coffee-light"
              onClick={() => setShowCompleteModal(false)}
            >
              Close
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default OrderCompleteModal;
