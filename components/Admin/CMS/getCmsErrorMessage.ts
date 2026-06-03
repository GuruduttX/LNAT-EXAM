type CmsErrorResponse = {
  reason?: unknown;
  error?: unknown;
  message?: unknown;
};

export async function getCmsErrorMessage(
  response: Response,
  fallback: string,
) {
  try {
    const data = (await response.json()) as CmsErrorResponse;
    const message = data.reason || data.error || data.message;

    return typeof message === "string" && message.trim()
      ? message
      : fallback;
  } catch {
    return fallback;
  }
}
