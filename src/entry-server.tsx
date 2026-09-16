import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import type { HelmetServerState } from "react-helmet-async";
import App from "./App";

export type RenderResult = {
  html: string;
  head: string;
};

/**
 * Renders one route to static HTML + head tags at build time.
 *
 * Uses renderToPipeableStream (not renderToString) so lazily-loaded route
 * components are awaited via `onAllReady` before the HTML is captured.
 */
export function render(url: string): Promise<RenderResult> {
  const helmetContext: { helmet?: HelmetServerState } = {};

  return new Promise((resolve, reject) => {
    let html = "";

    // Duck-typed writable: collects the streamed HTML without needing node:stream.
    const collector = {
      write(chunk: string | Uint8Array) {
        html += typeof chunk === "string" ? chunk : new TextDecoder().decode(chunk);
        return true;
      },
      end() {
        const { helmet } = helmetContext;
        const head = helmet
          ? [
              helmet.title.toString(),
              helmet.meta.toString(),
              helmet.link.toString(),
              helmet.script.toString(),
            ]
              .filter(Boolean)
              .join("\n    ")
          : "";
        resolve({ html, head });
      },
      on() {
        return collector;
      },
      once() {
        return collector;
      },
      emit() {
        return true;
      },
      removeListener() {
        return collector;
      },
    };

    const stream = renderToPipeableStream(
      <App ssrLocation={url} helmetContext={helmetContext} />,
      {
        onAllReady() {
          (stream.pipe as unknown as (destination: unknown) => void)(collector);
        },
        onError(error) {
          reject(error);
        },
      }
    );
  });
}
