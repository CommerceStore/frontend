import { useState } from "react";
import type { ShippingAddress } from "@/entities/order/types";
import { validateShippingField, validateShippingForm } from "./validation";

interface UseShippingFormOptions {
  onSubmit: (data: ShippingAddress) => void;
}

interface UseShippingFormReturn {
  formData: ShippingAddress;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const INITIAL_FORM_DATA: ShippingAddress = {
  recipientName: "",
  phone: "",
  zipCode: "",
  address: "",
  addressDetail: "",
  deliveryRequest: "",
};

export function useShippingForm({ onSubmit }: UseShippingFormOptions): UseShippingFormReturn {
  const [formData, setFormData] = useState<ShippingAddress>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateShippingField(name as keyof ShippingAddress, value);
      setErrors((prev) => {
        if (error) {
          return { ...prev, [name]: error };
        }
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateShippingField(name as keyof ShippingAddress, value);
    setErrors((prev) => {
      if (error) {
        return { ...prev, [name]: error };
      }
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields: Array<keyof ShippingAddress> = [
      "recipientName",
      "phone",
      "zipCode",
      "address",
      "addressDetail",
    ];

    const newErrors = validateShippingForm(formData, requiredFields);

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

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
