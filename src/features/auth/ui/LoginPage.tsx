import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../api/useAuthMutations";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import type { ApiError } from "@/shared/api/client";

type Mode = "login" | "register";

export function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const mutation = mode === "login" ? loginMutation : registerMutation;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        await loginMutation.mutateAsync({
          email: form.email,
          password: form.password,
        });
      } else {
        await registerMutation.mutateAsync(form);
      }
      navigate("/");
    } catch {
      // 에러는 mutation.error에서 처리
    }
  };

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const errorMessage = mutation.error
    ? (mutation.error as ApiError).message || "오류가 발생했습니다"
    : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center text-2xl font-bold text-zinc-900">
          {mode === "login" ? "로그인" : "회원가입"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <Input
              label="이름"
              value={form.name}
              onChange={handleChange("name")}
              required
            />
          )}
          <Input
            label="이메일"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            required
          />
          <Input
            label="비밀번호"
            type="password"
            value={form.password}
            onChange={handleChange("password")}
            minLength={8}
            required
          />

          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={mutation.isPending}
            className="w-full"
          >
            {mutation.isPending
              ? "처리 중..."
              : mode === "login"
                ? "로그인"
                : "회원가입"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          {mode === "login" ? (
            <>
              계정이 없으신가요?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="font-medium text-zinc-900 hover:underline"
              >
                회원가입
              </button>
            </>
          ) : (
            <>
              이미 계정이 있으신가요?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-medium text-zinc-900 hover:underline"
              >
                로그인
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
