// GA4 helpers. Safe during SSR/prerender (no window) and when gtag is absent.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends a GA4 event. No-ops during prerender and when analytics is blocked. */
export const trackEvent = (name: string, params: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
};

/**
 * SPA page_view tracking. index.html loads gtag with `send_page_view: false`,
 * so this is the single source of page views (fires on mount + route change).
 */
export const trackPageView = (path: string) => {
  trackEvent("page_view", { page_path: path });
};
