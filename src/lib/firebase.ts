// Import the necessary functions from the Firebase SDK
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // Import with alias for better readability

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCR4mFH34spNYolZq1k4X4cmhxZH_VQ16U",
  authDomain: "mind-body-shift.firebaseapp.com",
  projectId: "mind-body-shift",
  storageBucket: "mind-body-shift.appspot.com",
  messagingSenderId: "148376352206",
  appId: "1:148376352206:web:34ec4fde9e18637cda279f",
  measurementId: "G-EXP3J1GZKS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : undefined;
const storage = getStorage(app);

/**
 * Uploads a file to the storage bucket based on the specified type.
 *
 * @param {File} file - The file to be uploaded.
 * @param {"image" | "video" | "audio" | "document"} type - The type of the file to determine the storage path.
 * @returns {Promise<{ok: boolean, data?: any, file?: {name: string, url: string, type: string, size: number}, error?: any}>}
 *          A promise that resolves to an object containing the upload result.
 */
const uploadFile = async (
  file: File,
  type: "image" | "video" | "audio" | "document"
) => {
  if (file === null) return;

  const storageMap: Record<string, string> = {
    image: "images",
    video: "videos",
    audio: "audio",
    document: "document",
  };

  // Create a reference to the file in storage bucket
  const fileRef = ref(storage, `${storageMap[type]}/${uuidv4()}`);

  try {
    // Upload file to storage bucket
    const res = await uploadBytes(fileRef, file);

    // Retrieve the download URL for the file
    const url = await getDownloadURL(res.ref);

    // If successful, Return success response for client
    return {
      ok: true,
      data: res,
      file: {
        name: res.metadata.name,
        url: url,
        type: res.metadata.contentType,
        size: res.metadata.size,
      },
    };
  } catch (err) {
    // Log the error for debugging
    console.error(err);

    // If failed, Return error response for client
    return {
      ok: false,
      error: err,
    };
  }
};

export { storage, analytics, uploadFile, app };
