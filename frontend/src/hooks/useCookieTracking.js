// hooks/useCookieTracking.js
import { useCookies } from '../context/CookieContext';

export const useCookieTracking = () => {
  const { hasConsent } = useCookies();

  const trackPageView = () => {
    if (!hasConsent('analytics')) return;

    const analyticsData = {
      type: 'pageview',
      page: window.location.pathname,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language
    };

    fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    }).catch(err => console.warn('Tracking error:', err));
  };

  const trackEvent = (eventName, eventData = {}) => {
    if (!hasConsent('analytics')) return;

    const eventPayload = {
      type: 'event',
      name: eventName,
      data: eventData,
      timestamp: new Date().toISOString(),
    };

    fetch('/api/analytics/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventPayload)
    }).catch(err => console.warn('Tracking error:', err));
  };

  return { trackPageView, trackEvent };
};
