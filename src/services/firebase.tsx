import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN_FIREBASE,
  projectId: import.meta.env.VITE_PROJECT_ID_FIREBASE,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET_FIREBASE,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID_FIREBASE,
  appId: import.meta.env.VITE_APP_ID_FIREBASE,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/**
 * Função para login com email e senha
 * @param {string} email - O email do usuário
 * @param {string} password - A senha do usuário
 * @returns {Promise} - Retorna uma Promise com o usuário autenticado ou erro
 */
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login bem-sucedido:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao realizar login:", error.code, error.message);
    throw error; // Propaga o erro para quem chamar a função
  }
};