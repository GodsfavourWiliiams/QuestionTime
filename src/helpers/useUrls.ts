export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function useUrls() {
  // endpoints
  const loginUrl = `${BASE_URL}/token`;
  const questions = `${BASE_URL}/questions`;
  return {
    loginUrl,
    questions,
  };
}
