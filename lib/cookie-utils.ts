import Cookies from "js-cookie";

export function setLanguageCookie(locale: string) {
  Cookies.set("NEXT_LOCALE", locale, { path: "/", expires: 365 });
}
