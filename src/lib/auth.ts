'use client';

import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const TOKEN_KEY = "auth_token";

export function saveToken(token: string, maxAgeHours: number = 3) {
  setCookie(TOKEN_KEY, token, {
    maxAge: maxAgeHours * 60 * 60,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
}

export function getToken(): string | null {
  const token = getCookie(TOKEN_KEY);
  return token ? String(token) : null;
}

export function clearToken() {
  deleteCookie(TOKEN_KEY, { path: '/' });
}
