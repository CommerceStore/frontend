import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/features/cart";
import type { ShippingAddress } from "@/entities/order/types";

type ToastType = "success" | "error" | "info";

interface ToastState {
  show: boolean;
  message: string;
  type: ToastType;
}

interface UseCheckoutReturn {
  shippingData: ShippingAddress | null;
  showValidationError: boolean;
  isProcessing: boolean;
  toast: ToastState;
  handleShippingSubmit: (address: ShippingAddress) => void;
  handlePayment: () => Promise<void>;
  closeToast: () => void;
}

export function useCheckout(): UseCheckoutReturn {
  const navigate = useNavigate();
  const clearCart = useCartStore((state) => state.clearCart);

  const [shippingData, setShippingData] = useState<ShippingAddress | null>(null);
  const [showValidationError, setShowValidationError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "info",
  });

  const showToast = (message: string, type: ToastType) => {
    setToast({ show: true, message, type });
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const handleShippingSubmit = (address: ShippingAddress) => {
    setShippingData(address);
    setShowValidationError(false);
  };

  const handlePayment = async () => {
    if (!shippingData) {
      setShowValidationError(true);
      showToast("배송지 정보를 입력해주세요", "error");
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const isSuccess = Math.random() > 0.3;

      if (isSuccess) {
        showToast("주문이 완료되었습니다", "success");
        clearCart();

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        throw new Error("결제 처리 중 오류가 발생했습니다");
      }
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "결제에 실패했습니다. 다시 시도해주세요.",
        "error"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    shippingData,
    showValidationError,
    isProcessing,
    toast,
    handleShippingSubmit,
    handlePayment,
    closeToast,
  };
}
