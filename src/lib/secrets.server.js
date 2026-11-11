export async function getSecret(name) {
  const value = process.env[name];
  return typeof value === "string" ? value : undefined;
}
