export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function useUrls() {
  // endpoints
  const loginUrl = `${BASE_URL}/token`;

  return {
    loginUrl,
  };
}
