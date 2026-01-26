/**
 * Fetch wrapper with HTTP method utilities
 *
 * @example
 * // GET request
 * const user = await api.get<User>('/users/1');
 *
 * // GET with query params
 * const users = await api.get<User[]>('/users', {
 *   params: { page: 1, limit: 10 }
 * });
 *
 * // POST request
 * const newUser = await api.post<User>('/users', {
 *   body: { name: 'John', email: 'john@example.com' }
 * });
 *
 * // PUT request
 * const updated = await api.put<User>('/users/1', {
 *   body: { name: 'Jane' }
 * });
 *
 * // DELETE request
 * await api.delete('/users/1');
 */

/**
 * Normalized API error shape
 */
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

/**
 * API client configuration
 */
interface ClientConfig {
  baseURL?: string;
  headers?: HeadersInit;
}

/**
 * Request options for API calls
 */
interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  params?: Record<string, string | number | boolean>;
}

/**
 * Request options with body for POST/PUT/PATCH
 */
interface RequestOptionsWithBody extends RequestOptions {
  body?: unknown;
}

/**
 * API client instance type
 */
interface ApiClient {
  get: <T>(endpoint: string, options?: RequestOptions) => Promise<T>;
  post: <T>(endpoint: string, options?: RequestOptionsWithBody) => Promise<T>;
  put: <T>(endpoint: string, options?: RequestOptionsWithBody) => Promise<T>;
  patch: <T>(endpoint: string, options?: RequestOptionsWithBody) => Promise<T>;
  delete: <T>(endpoint: string, options?: RequestOptionsWithBody) => Promise<T>;
}

/**
 * Create a fetch wrapper with base configuration
 */
function createClient(config: ClientConfig = {}): ApiClient {
  const { baseURL = "", headers: defaultHeaders = {} } = config;

  async function request<T>(
    endpoint: string,
    options: RequestOptionsWithBody & { method: string } = { method: "GET" }
  ): Promise<T> {
    const { method, body, params, ...restOptions } = options;

    // Build URL with query params
    let url = baseURL + endpoint;
    if (params) {
      const searchParams = new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      );
      url += `?${searchParams.toString()}`;
    }

    const headers = {
      "Content-Type": "application/json",
      ...defaultHeaders,
      ...restOptions.headers,
    };

    try {
      const response = await fetch(url, {
        ...restOptions,
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      // Handle non-OK responses
      if (!response.ok) {
        const error: ApiError = {
          message: response.statusText || "Request failed",
          status: response.status,
        };

        // Try to parse error body if available
        try {
          const errorData = await response.json();
          error.message = errorData.message || error.message;
          error.code = errorData.code;
        } catch {
          // If parsing fails, use default error
        }

        throw error;
      }

      // Handle empty responses (204 No Content, etc.)
      if (
        response.status === 204 ||
        response.headers.get("content-length") === "0"
      ) {
        return {} as T;
      }

      // Parse JSON response
      const data = await response.json();
      return data as T;
    } catch (err) {
      // Normalize all errors to ApiError shape
      if (isApiError(err)) {
        throw err;
      }

      // Network or other errors
      const error: ApiError = {
        message: err instanceof Error ? err.message : "Unknown error occurred",
        code: "NETWORK_ERROR",
      };
      throw error;
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

/**
 * Type guard for ApiError
 */
function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as ApiError).message === "string"
  );
}

/**
 * Default API client instance
 * Configure baseURL via environment variable or config
 */
export const api = createClient({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
});

/**
 * Export factory for creating custom clients
 */
export { createClient };

/**
 * Export types
 */
export type { ApiClient, RequestOptions, RequestOptionsWithBody };
