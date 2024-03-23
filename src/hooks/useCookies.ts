interface Cookies {
  [name: string]: string;
}

export const useCookies = (): {
  getCookies: () => Cookies;
  setCookie: (name: string, value: string, days?: number) => void;
  removeCookie: (name: string) => void;
} => {
  const getCookies = (): Cookies => {
    if (typeof window === "undefined") {
      console.warn("Cookies cannot be accessed in this environment.");
      return {};
    }

    const cookies: Cookies = document.cookie
      .split(";")
      .reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split("=");
        return { ...acc, [name]: decodeURIComponent(value) };
      }, {});

    return cookies;
  };

  const setCookie = (name: string, value: string, days = 7): void => {
    if (typeof window === "undefined") {
      console.warn("Cookies cannot be set in this environment.");
      return;
    }

    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    const encodedValue = encodeURIComponent(value);
    document.cookie = `${name}=${encodedValue}; expires=${expires.toUTCString()}; path=/`;
  };

  const removeCookie = (name: string): void => {
    if (typeof window === "undefined") {
      console.warn("Cookies cannot be removed in this environment.");
      return;
    }

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  return { getCookies, setCookie, removeCookie };
};
