import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    });
    setIsVisible(false);
    // Ajoute ici la logique pour sauvegarder les préférences
    console.log('Cookies acceptés:', { ...preferences, analytics: true, marketing: true, functional: true });
  };

  const handleRejectAll = () => {
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    });
    setIsVisible(false);
    console.log('Seuls les cookies nécessaires acceptés');
  };

  const handleSavePreferences = () => {
    setIsVisible(false);
    console.log('Préférences sauvegardées:', preferences);
  };

  const handlePreferenceChange = (type) => {
    if (type === 'necessary') return;
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner-overlay">
      <div className="cookie-banner-box">
        {/* Bouton de fermeture */}
        <button
          onClick={() => setIsVisible(false)}
          className="cookie-banner-close"
          aria-label="Fermer la bannière cookies"
        >
          <X size={20} />
        </button>

        <div style={{ padding: '1.5rem' }}>
          {/* En-tête avec icône cookie */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '2rem' }}>🍪</div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b' }}>
              Have a Cookie
            </h2>
          </div>

          {!showPreferences ? (
            <>
              {/* Message principal */}
              <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Nous utilisons des cookies pour mesurer notre trafic et vous assurer une expérience normale sur notre site web.
                <button
                  onClick={() => setShowPreferences(true)}
                  className="cookie-banner-link"
                  style={{ marginLeft: 4 }}
                >
                  En savoir plus
                </button>
              </p>

              {/* Boutons d'action */}
              <div className="cookie-banner-actions">
                <button
                  onClick={handleRejectAll}
                  className="reject"
                >
                  Refuser
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="accept"
                >
                  Accepter tout
                </button>
              </div>

              {/* Lien vers les préférences */}
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="cookie-banner-link"
                  style={{ fontSize: '0.95rem' }}
                >
                  Gérer mes préférences
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Vue des préférences détaillées */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: 12 }}>
                  Préférences des cookies
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: 16 }}>
                  Choisissez quels cookies vous souhaitez accepter. Vous pouvez modifier ces paramètres à tout moment.
                </p>

                {/* Cookies nécessaires */}
                <div className="cookie-pref-category">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0 }}>
                    <span className="cookie-pref-category-title">Cookies nécessaires</span>
                    <span className="cookie-pref-required">Requis</span>
                  </div>
                  <p className="cookie-pref-description">Essentiels au fonctionnement du site</p>
                </div>

                {/* Cookies analytiques */}
                <div className="cookie-pref-category">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0 }}>
                    <span className="cookie-pref-category-title">Cookies analytiques</span>
                    <button
                      onClick={() => handlePreferenceChange('analytics')}
                      className={`cookie-switch${preferences.analytics ? ' active' : ''}`}
                      aria-pressed={preferences.analytics}
                      aria-label="Activer ou désactiver les cookies analytiques"
                    >
                      <span className="cookie-switch-knob" />
                    </button>
                  </div>
                  <p className="cookie-pref-description">Analyse du trafic et des performances</p>
                </div>

                {/* Cookies marketing */}
                <div className="cookie-pref-category">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0 }}>
                    <span className="cookie-pref-category-title">Cookies marketing</span>
                    <button
                      onClick={() => handlePreferenceChange('marketing')}
                      className={`cookie-switch${preferences.marketing ? ' active' : ''}`}
                      aria-pressed={preferences.marketing}
                      aria-label="Activer ou désactiver les cookies marketing"
                    >
                      <span className="cookie-switch-knob" />
                    </button>
                  </div>
                  <p className="cookie-pref-description">Publicité personnalisée</p>
                </div>

                {/* Cookies fonctionnels */}
                <div className="cookie-pref-category">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0 }}>
                    <span className="cookie-pref-category-title">Cookies fonctionnels</span>
                    <button
                      onClick={() => handlePreferenceChange('functional')}
                      className={`cookie-switch${preferences.functional ? ' active' : ''}`}
                      aria-pressed={preferences.functional}
                      aria-label="Activer ou désactiver les cookies fonctionnels"
                    >
                      <span className="cookie-switch-knob" />
                    </button>
                  </div>
                  <p className="cookie-pref-description">Fonctionnalités avancées du site</p>
                </div>
              </div>

              {/* Boutons d'action pour les préférences */}
              <div className="cookie-pref-actions">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="cookie-pref-btn reopen"
                >
                  Retour
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="cookie-pref-btn save"
                >
                  Sauvegarder
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}