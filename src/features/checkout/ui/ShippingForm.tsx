import { Input } from "@/shared/ui/Input";
import type { ShippingAddress } from "@/entities/order/types";
import { useShippingForm } from "../hooks/useShippingForm";

interface ShippingFormProps {
  onSubmit: (address: ShippingAddress) => void;
  disabled?: boolean;
  showValidationError?: boolean;
}

export function ShippingForm({ onSubmit, disabled = false, showValidationError = false }: ShippingFormProps) {
  const { formData, errors, touched, handleChange, handleBlur, handleSubmit } = useShippingForm({
    onSubmit,
    showValidationError,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-bold text-zinc-900">배송지 정보</h2>
        <div className="space-y-4">
          <Input
            name="recipientName"
            label="받는 분"
            value={formData.recipientName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.recipientName ? errors.recipientName : undefined}
            placeholder="이름을 입력해주세요"
            disabled={disabled}
            required
          />

          <Input
            name="phone"
            label="연락처"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone ? errors.phone : undefined}
            placeholder="010-1234-5678"
            disabled={disabled}
            required
          />

          <div className="grid grid-cols-3 gap-3">
            <Input
              name="zipCode"
              label="우편번호"
              value={formData.zipCode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.zipCode ? errors.zipCode : undefined}
              placeholder="12345"
              maxLength={5}
              disabled={disabled}
              required
            />
          </div>

          <Input
            name="address"
            label="주소"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.address ? errors.address : undefined}
            placeholder="서울시 강남구 테헤란로"
            disabled={disabled}
            required
          />

          <Input
            name="addressDetail"
            label="상세 주소"
            value={formData.addressDetail}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.addressDetail ? errors.addressDetail : undefined}
            placeholder="101동 101호"
            disabled={disabled}
            required
          />

          <div>
            <label
              htmlFor="deliveryRequest"
              className="mb-1.5 block text-sm font-medium text-zinc-900"
            >
              배송 요청사항
            </label>
            <textarea
              id="deliveryRequest"
              name="deliveryRequest"
              value={formData.deliveryRequest}
              onChange={handleChange}
              placeholder="배송 시 요청사항을 입력해주세요 (선택)"
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-base transition-colors placeholder:text-zinc-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500"
              rows={3}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
