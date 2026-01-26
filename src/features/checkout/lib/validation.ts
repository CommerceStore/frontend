import type { ShippingAddress } from "@/entities/order/types";

export interface ValidationRule {
  required?: string;
  minLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
}

export type ValidationRules = {
  [K in keyof ShippingAddress]?: ValidationRule;
};

export const SHIPPING_VALIDATION_RULES: ValidationRules = {
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

export function validateShippingField(
  fieldName: keyof ShippingAddress,
  value: string,
  rules: ValidationRules = SHIPPING_VALIDATION_RULES
): string | undefined {
  const rule = rules[fieldName];
  if (!rule) return undefined;

  if (rule.required && !value.trim()) {
    return rule.required;
  }

  if (rule.minLength && value.length < rule.minLength.value) {
    return rule.minLength.message;
  }

  if (rule.pattern && !rule.pattern.value.test(value)) {
    return rule.pattern.message;
  }

  return undefined;
}

export function validateShippingForm(
  formData: ShippingAddress,
  requiredFields: Array<keyof ShippingAddress> = [
    "recipientName",
    "phone",
    "zipCode",
    "address",
    "addressDetail",
  ]
): Record<string, string> {
  const errors: Record<string, string> = {};

  requiredFields.forEach((field) => {
    const error = validateShippingField(field, formData[field] as string);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}
