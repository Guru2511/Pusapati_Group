export const env = process.env;

export function waitUntil(promise) {
  Promise.resolve(promise).catch((error) => {
    console.error("[vercel background task] Failed:", error);
  });
}

export const secrets = {
  async get(name) {
    return process.env[name];
  },
};
