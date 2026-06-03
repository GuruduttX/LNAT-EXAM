"use client";

import { ADMIN_TOKEN_STORAGE_KEY } from "@/lib/adminSession";

function redirectToLogin() {
  const next = `${window.location.pathname}${window.location.search}`;
  window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
  window.location.href = `/admin/login?next=${encodeURIComponent(next)}`;
}

export function getAdminToken() {
  return window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) || "";
}

export async function adminFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const token = getAdminToken();
  const headers = new Headers(init.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (response.status === 401) {
    redirectToLogin();
  }

  return response;
}
