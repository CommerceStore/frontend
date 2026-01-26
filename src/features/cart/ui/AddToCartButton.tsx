import { Button } from "@/shared/ui/Button";

interface AddToCartButtonProps {
  onAddToCart: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export function AddToCartButton({
  onAddToCart,
  disabled = false,
  isLoading = false,
}: AddToCartButtonProps) {
  return (
    <Button
      variant="secondary"
      size="lg"
      disabled={disabled || isLoading}
      onClick={onAddToCart}
      className="flex-1"
    >
      {isLoading ? "담는 중..." : "장바구니에 추가"}
    </Button>
  );
}
