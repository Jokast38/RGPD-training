// context/CookieContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CookieContext = createContext();

export const useCookies = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookies must be used within a CookieProvider');
  }
  return context;
};

export const CookieProvider = ({ children }) => {
  const [cookieConsent, setCookieConsent] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  // Clé pour le localStorage
  const COOKIE_CONSENT_KEY = 'cookie-consent';
  const COOKIE_CONSENT_DATE_KEY = 'cookie-consent-date';

  // Durée de validité du consentement (13 mois selon le RGPD)
  const CONSENT_EXPIRY_MONTHS = 13;

  useEffect(() => {
    // Vérifier si le consentement existe et est encore valide
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const consentDate = localStorage.getItem(COOKIE_CONSENT_DATE_KEY);

    if (savedConsent && consentDate) {
      const consentDateObj = new Date(consentDate);
      const expiryDate = new Date(consentDateObj);
      expiryDate.setMonth(expiryDate.getMonth() + CONSENT_EXPIRY_MONTHS);

      if (new Date() < expiryDate) {
        // Le consentement est encore valide
        setCookieConsent(JSON.parse(savedConsent));
        setShowBanner(false);
      } else {
        // Le consentement a expiré
        clearCookieConsent();
        setShowBanner(true);
      }
    } else {
      // Aucun consentement trouvé
      setShowBanner(true);
    }
  }, []);

  const saveCookieConsent = (preferences) => {
    const consentData = {
      necessary: true, // Toujours true
      analytics: preferences.analytics || false,
      marketing: preferences.marketing || false,
      functional: preferences.functional || false,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    localStorage.setItem(COOKIE_CONSENT_DATE_KEY, consentData.timestamp);
    
    setCookieConsent(consentData);
    setShowBanner(false);

    // Déclencher les actions basées sur le consentement
    handleConsentChange(consentData);
  };

  const clearCookieConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    localStorage.removeItem(COOKIE_CONSENT_DATE_KEY);
    setCookieConsent(null);
    
    // Nettoyer les cookies non-nécessaires
    cleanupCookies();
  };

  const handleConsentChange = (consent) => {
    // Gestion des cookies analytics
    if (consent.analytics) {
      initializeAnalytics();
    } else {
      disableAnalytics();
    }

    // Gestion des cookies marketing
    if (consent.marketing) {
      initializeMarketing();
    } else {
      disableMarketing();
    }

    // Gestion des cookies fonctionnels
    if (consent.functional) {
      initializeFunctional();
    } else {
      disableFunctional();
    }
  };

  const initializeAnalytics = () => {
    // Exemple : Votre propre système d'analytics
    console.log('Analytics cookies enabled');
    
    // Option 1: Analytics maison
    trackPageView();
    
    // Option 2: Autre outil (Plausible, Matomo, etc.)
    // if (typeof plausible !== 'undefined') {
    //   plausible('pageview');
    // }
  };

  const disableAnalytics = () => {
    console.log('Analytics cookies disabled');
    // Arrêter le tracking si nécessaire
  };

  const initializeMarketing = () => {
    console.log('Marketing cookies enabled');
    // Initialiser Facebook Pixel, autres outils marketing
    // if (typeof fbq !== 'undefined') {
    //   fbq('consent', 'grant');
    // }
  };

  const disableMarketing = () => {
    console.log('Marketing cookies disabled');
    // if (typeof fbq !== 'undefined') {
    //   fbq('consent', 'revoke');
    // }
  };

  const initializeFunctional = () => {
    // Initialiser les fonctionnalités qui nécessitent des cookies
    console.log('Functional cookies enabled');
    // Exemple: chat widget, préférences utilisateur, etc.
  };

  const disableFunctional = () => {
    console.log('Functional cookies disabled');
  };

  // Fonction d'analytics simple maison
  const trackPageView = () => {
    // Exemple d'analytics simple sans cookies tiers
    const analyticsData = {
      page: window.location.pathname,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language
    };

    // Envoyer à votre backend
    fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    }).catch(error => {
      console.log('Analytics tracking failed:', error);
    });
  };

  const cleanupCookies = () => {
    // Liste des cookies à supprimer selon vos besoins
    const cookiesToDelete = [
      // Google Analytics (si vous l'aviez utilisé)
      '_ga', '_gid', '_gat',
      // Facebook Pixel
      '_fbp', '_fbc',
      // Autres cookies marketing/analytics
      // Ajoutez ici les cookies spécifiques à vos outils
    ];

    cookiesToDelete.forEach(cookieName => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    });
  };

  const reopenBanner = () => {
    setShowBanner(true);
  };

  const value = {
    cookieConsent,
    showBanner,
    saveCookieConsent,
    clearCookieConsent,
    reopenBanner,
    hasConsent: (type) => cookieConsent && cookieConsent[type] === true
  };

  return (
    <CookieContext.Provider value={value}>
      {children}
    </CookieContext.Provider>
  );
};