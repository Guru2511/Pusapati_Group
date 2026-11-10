import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export function getFirebaseAuth() {
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };
  const missing = Object.entries(config).filter(([, value]) => !value).map(([key]) => key);
  if (missing.length) {
    throw new Error(`Firebase is not configured. Add ${missing.join(", ")} to your local environment.`);
  }

  const app = getApps().length ? getApp() : initializeApp(config);
  return getAuth(app);
}

export async function getAdminIdToken() {
  const user = getFirebaseAuth().currentUser;
  if (!user) throw new Error("Sign in to the admin account before continuing.");
  return user.getIdToken();
}
