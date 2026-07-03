import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const serviceAccount = require("../../../firebase-admin.json");

initializeApp({
  credential: cert(serviceAccount),
  storageBucket:
    "multi-tenant-saas-application.firebasestorage.app",
});

export const bucket =
  getStorage().bucket();

console.log("Firebase initialized");