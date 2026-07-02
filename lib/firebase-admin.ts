import "server-only";

import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

/**
 * Singleton Firebase Admin app.
 *
 * In production on Firebase App Hosting the runtime provides Application
 * Default Credentials automatically, so no service-account key is needed —
 * `initializeApp()` with no args picks up ADC. For local development we fall
 * back to an explicit service account read from env vars (see .env.local).
 */
function createAdminApp(): App {
  const existing = getApps();
  if (existing.length) return existing[0];

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // The private key is stored with literal "\n" sequences in the env file;
  // turn them back into real newlines before handing it to the SDK.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (projectId && clientEmail && privateKey) {
    return initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  }

  // No explicit creds — rely on Application Default Credentials (App Hosting).
  return initializeApp();
}

const adminApp = createAdminApp();

export const db = getFirestore(adminApp);
export const authAdmin = getAuth(adminApp);
