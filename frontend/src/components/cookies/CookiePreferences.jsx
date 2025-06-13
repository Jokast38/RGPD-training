// components/cookies/CookiePreferences.js
import React, { useState } from 'react';
import { useCookies } from '../../context/CookieContext';

const CookiePreferences = () => {
  const { cookieConsent, saveCookieConsent, reopenBanner } = useCookies();
  const [preferences, setPreferences] = useState(
    cookieConsent || {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    }
  );

  const handlePreferenceChange = (type) => {
    if (type === 'necessary') return; // Ne peut pas être désactivé
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSave = () => {
    saveCookieConsent(preferences);
    alert('Vos préférences ont été sauvegardées !');
  };

  const cookieCategories = [
    {
      key: 'necessary',
      title: 'Cookies nécessaires',
      description: 'Ces cookies sont essentiels au fonctionnement du site web. Ils ne peuvent pas être désactivés.',
      required: true
    },
    {
      key: 'analytics',
      title: 'Cookies analytiques',
      description: 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web.',
      required: false
    },
    {
      key: 'marketing',
      title: 'Cookies marketing',
      description: 'Ces cookies sont utilisés pour afficher des publicités pertinentes pour vous.',
      required: false
    },
    {
      key: 'functional',
      title: 'Cookies fonctionnels',
      description: 'Ces cookies permettent des fonctionnalités avancées et une personnalisation.',
      required: false
    }
  ];

  return (
    <div className="cookie-pref-container">
      <h1 className="cookie-pref-title">
        Préférences des cookies
      </h1>
      
      <div className="cookie-pref-info">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">
          Gestion de vos données personnelles
        </h2>
        <p className="text-blue-700 text-sm">
          Vous pouvez modifier vos préférences à tout moment. Ces paramètres ne s'appliquent qu'à ce navigateur et cet appareil.
        </p>
      </div>

      <div className="space-y-6">
        {cookieCategories.map((category) => (
          <div key={category.key} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-gray-900">
                {category.title}
              </h3>
              <div className="flex items-center">
                {category.required ? (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Requis
                  </span>
                ) : (
                  <button
                    onClick={() => handlePreferenceChange(category.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences[category.key] ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences[category.key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                )}
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              {category.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Sauvegarder les préférences
        </button>
        <button
          onClick={reopenBanner}
          className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Rouvrir la bannière
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Dernière mise à jour des préférences : {' '}
          {cookieConsent?.timestamp 
            ? new Date(cookieConsent.timestamp).toLocaleDateString('fr-FR')
            : 'Aucune préférence enregistrée'
          }
        </p>
      </div>
    </div>
  );
};

export default CookiePreferences;