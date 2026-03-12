export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

interface ClientConfig {
  baseURL?: string;
  headers?: HeadersInit;
}

interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  params?: Record<string, string | number | boolean | undefined>;
}

interface RequestOptionsWithBody extends RequestOptions {
  body?: unknown;
}

interface ApiClient {
  get: <T>(endpoint: string, options?: RequestOptions) => Promise<T>;
  post: <T>(endpoint: string, options?: RequestOptionsWithBody) => Promise<T>;
  put: <T>(endpoint: string, options?: RequestOptionsWithBody) => Promise<T>;
  patch: <T>(endpoint: string, options?: RequestOptionsWithBody) => Promise<T>;
  delete: <T>(endpoint: string, options?: RequestOptionsWithBody) => Promise<T>;
}

async function attemptRefresh(baseURL: string): Promise<void> {
  const response = await fetch(`${baseURL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Token refresh failed");
}

function createClient(config: ClientConfig = {}): ApiClient {
  const { baseURL = "", headers: defaultHeaders = {} } = config;

  async function request<T>(
    endpoint: string,
    options: RequestOptionsWithBody & { method: string } = { method: "GET" },
    isRetry = false
  ): Promise<T> {
    const { method, body, params, ...restOptions } = options;

    let url = baseURL + endpoint;
    if (params) {
      const entries = Object.entries(params).filter(
        ([, v]) => v !== undefined && v !== null && v !== ""
      ) as [string, string | number | boolean][];
      if (entries.length > 0) {
        url += `?${new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString()}`;
      }
    }

    const headers = {
      "Content-Type": "application/json",
      ...(defaultHeaders as Record<string, string>),
      ...(restOptions.headers as Record<string, string>),
    };

    try {
      const response = await fetch(url, {
        ...restOptions,
        method,
        headers,
        credentials: "include",
        body: body ? JSON.stringify(body) : undefined,
      });

      if (response.status === 401 && !isRetry) {
        try {
          await attemptRefresh(baseURL);
          return request<T>(endpoint, options, true);
        } catch {
          window.dispatchEvent(new Event("auth:logout"));
          throw {
            message: "인증이 만료되었습니다. 다시 로그인해주세요.",
            status: 401,
          } as ApiError;
        }
      }

      if (!response.ok) {
        const error: ApiError = {
          message: response.statusText || "Request failed",
          status: response.status,
        };
        try {
          const errorData = await response.json();
          error.message = errorData.message || error.message;
          error.code = errorData.code;
        } catch { /* ignore */ }
        throw error;
      }

      if (
        response.status === 204 ||
        response.headers.get("content-length") === "0"
      ) {
        return {} as T;
      }

      return (await response.json()) as T;
    } catch (err) {
      if (isApiError(err)) throw err;
      throw {
        message: err instanceof Error ? err.message : "Unknown error occurred",
        code: "NETWORK_ERROR",
      } as ApiError;
    }
  }

  return {
    get: <T>(endpoint: string, options?: RequestOptions) =>
      request<T>(endpoint, { ...options, method: "GET" }),
    post: <T>(endpoint: string, options?: RequestOptionsWithBody) =>
      request<T>(endpoint, { ...options, method: "POST" }),
    put: <T>(endpoint: string, options?: RequestOptionsWithBody) =>
      request<T>(endpoint, { ...options, method: "PUT" }),
    patch: <T>(endpoint: string, options?: RequestOptionsWithBody) =>
      request<T>(endpoint, { ...options, method: "PATCH" }),
    delete: <T>(endpoint: string, options?: RequestOptionsWithBody) =>
      request<T>(endpoint, { ...options, method: "DELETE" }),
  };
}

function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as ApiError).message === "string"
  );
}

export const api = createClient({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
});

export { createClient };
export type { ApiClient, RequestOptions, RequestOptionsWithBody };
