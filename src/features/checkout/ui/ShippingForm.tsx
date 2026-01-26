import { useState } from "react";
import { Input } from "@/shared/ui/Input";
import type { ShippingAddress } from "@/entities/order/types";

interface ShippingFormProps {
  onSubmit: (address: ShippingAddress) => void;
  disabled?: boolean;
}

interface FormErrors {
  recipientName?: string;
  phone?: string;
  zipCode?: string;
  address?: string;
  addressDetail?: string;
}

const VALIDATION_RULES = {
  recipientName: {
    required: "받는 분 이름을 입력해주세요",
    minLength: { value: 2, message: "이름은 2자 이상 입력해주세요" },
  },
  phone: {
    required: "연락처를 입력해주세요",
    pattern: {
      value: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
      message: "올바른 휴대폰 번호 형식이 아닙니다 (예: 010-1234-5678)",
    },
  },
  zipCode: {
    required: "우편번호를 입력해주세요",
    pattern: {
      value: /^\d{5}$/,
      message: "우편번호는 5자리 숫자입니다 (예: 12345)",
    },
  },
  address: {
    required: "주소를 입력해주세요",
    minLength: { value: 5, message: "주소를 정확히 입력해주세요" },
  },
  addressDetail: {
    required: "상세 주소를 입력해주세요",
  },
};

export function ShippingForm({ onSubmit, disabled = false }: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingAddress>({
    recipientName: "",
    phone: "",
    zipCode: "",
    address: "",
    addressDetail: "",
    deliveryRequest: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: keyof ShippingAddress, value: string): string | undefined => {
    const rules = VALIDATION_RULES[name as keyof typeof VALIDATION_RULES];
    if (!rules) return undefined;

    if (rules.required && !value.trim()) {
      return rules.required;
    }

    if (rules.minLength && value.length < rules.minLength.value) {
      return rules.minLength.message;
    }

    if (rules.pattern && !rules.pattern.value.test(value)) {
      return rules.pattern.message;
    }

    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name as keyof ShippingAddress, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name as keyof ShippingAddress, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    const requiredFields: Array<keyof ShippingAddress> = [
      "recipientName",
      "phone",
      "zipCode",
      "address",
      "addressDetail",
    ];

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field] as string);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    setTouched(
      requiredFields.reduce(
        (acc, field) => ({ ...acc, [field]: true }),
        {}
      )
    );

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

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

      <button type="submit" className="hidden">
        제출
      </button>
    </form>
  );
}
