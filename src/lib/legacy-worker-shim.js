export const env = process.env;

export function waitUntil(promise) {
  Promise.resolve(promise).catch((error) => {
    console.error("[legacy worker task] Failed:", error);
  });
}
