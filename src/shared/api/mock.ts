/**
 * Mock API 지연 시뮬레이션 (300~600ms)
 */
export function mockDelay(): Promise<void> {
  const min = 300;
  const max = 600;
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  return new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * Mock API 응답 래퍼
 * 실제 API 호출을 시뮬레이션하며, 지연 후 데이터 반환
 */
export async function mockApiResponse<T>(data: T): Promise<T> {
  await mockDelay();
  return data;
}

/**
 * Mock API 에러 시뮬레이션
 */
export async function mockApiError(
  message: string,
  status: number = 500
): Promise<never> {
  await mockDelay();
  throw {
    message,
    status,
    code: `MOCK_ERROR_${status}`,
  };
}
