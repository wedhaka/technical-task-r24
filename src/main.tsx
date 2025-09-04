import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import i18n from "i18next";
import App from './App.tsx';
import { initReactI18next } from 'react-i18next';


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "title": "Enter <strong>Dimensions.</strong>",
          "widthTitle": "Width",
          "heightTitle": "Height",
        }
      },
      de: { 
        translation: {
          "title": "<strong>Maße.</strong> Eingeben",
          "widthTitle": "Breite",
          "heightTitle": "Höhe",
        }
      }
    },
    lng: "de", // if you're using a language detector, do not define the lng option
    fallbackLng: "de",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    react: {
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i']
    }
  });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
