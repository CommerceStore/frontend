import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/client";
import type { ApiError } from "@/shared/api/client";
import { cartQueryKey } from "@/features/cart/api/useCartQuery";
import type { ShippingAddress, Order } from "@/entities/order/types";
import type { Cart } from "@/entities/cart/types";

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
  handlePayment: (cart: Cart) => void;
  closeToast: () => void;
}

export function useCheckout(): UseCheckoutReturn {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [shippingData, setShippingData] = useState<ShippingAddress | null>(null);
  const [showValidationError, setShowValidationError] = useState(false);
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

  const orderMutation = useMutation({
    mutationFn: ({
      items,
      shippingAddress,
    }: {
      items: { productId: string; quantity: number }[];
      shippingAddress: ShippingAddress;
    }) =>
      api.post<{ data: Order }>("/orders", {
        body: { items, shippingAddress },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
      showToast("주문이 완료되었습니다", "success");
      setTimeout(() => navigate("/"), 2000);
    },
    onError: (err: unknown) => {
      const apiErr = err as ApiError;
      showToast(
        apiErr.message || "주문에 실패했습니다. 다시 시도해주세요.",
        "error"
      );
    },
  });

  const handlePayment = (cart: Cart) => {
    if (!shippingData) {
      setShowValidationError(true);
      showToast("배송지 정보를 입력해주세요", "error");
      return;
    }

    const items = cart.items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    orderMutation.mutate({ items, shippingAddress: shippingData });
  };

  return {
    shippingData,
    showValidationError,
    isProcessing: orderMutation.isPending,
    toast,
    handleShippingSubmit,
    handlePayment,
    closeToast,
  };
}
