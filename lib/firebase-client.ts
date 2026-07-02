import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

/**
 * Client-side Firebase — used ONLY for the admin login form
 * (signInWithEmailAndPassword). Everything else (products, orders) is handled
 * server-side via the Admin SDK. These NEXT_PUBLIC_ values are safe to expose.
 *
 * Auth is initialised lazily (on first call, in the browser) so that importing
 * this module during build/prerender never touches Firebase with a possibly
 * empty config — which would throw auth/invalid-api-key.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let authInstance: Auth | null = null;

export function getFirebaseAuth(): Auth {
  if (authInstance) return authInstance;
  const app: FirebaseApp = getApps().length
    ? getApps()[0]
    : initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  return authInstance;
}
