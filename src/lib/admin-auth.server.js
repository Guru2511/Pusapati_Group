import { createRemoteJWKSet, jwtVerify } from "jose";
import { getSecret } from "@/lib/secrets.server";

const firebaseSigningKeys = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"),
);

async function getRequiredSecret(name) {
  const value = await getSecret(name);
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing required ${name} secret for Firebase admin authentication.`);
  }
  return value.trim();
}

export async function verifyAdminIdToken(idToken) {
  const [projectId, allowedEmails] = await Promise.all([
    getRequiredSecret("FIREBASE_PROJECT_ID"),
    getRequiredSecret("ADMIN_EMAILS"),
  ]);
  const { payload } = await jwtVerify(idToken, firebaseSigningKeys, {
    algorithms: ["RS256"],
    audience: projectId,
    issuer: `https://securetoken.google.com/${projectId}`,
    requiredClaims: ["exp", "iat", "sub", "email"],
  });

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const admins = allowedEmails.split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
  if (!payload.email_verified || !email || !admins.includes(email)) {
    throw Object.assign(new Error("This account is not authorized to access the admin dashboard."), {
      status: 403,
      code: "ADMIN_ACCESS_DENIED",
    });
  }

  return {
    uid: payload.sub,
    email,
  };
}
