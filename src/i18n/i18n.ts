import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importa tus recursos de traducción
import en from './locales/en.json';
import es from './locales/es.json';

i18n
  // Detecta el idioma del navegador/sistema
  .use(LanguageDetector) 
  // Pasa la instancia de i18n a react-i18next
  .use(initReactI18next) 
  .init({
    resources: {
      en: { translation: en.translation },
      es: { translation: es.translation }
    },
    // Si no se detecta idioma, usa 'es' como respaldo
    fallbackLng: "es", 
    // Usar 'translation' como namespace por defecto
    defaultNS: "translation", 
    interpolation: {
      escapeValue: false // React ya previene ataques XSS
    }
  });

export default i18n;