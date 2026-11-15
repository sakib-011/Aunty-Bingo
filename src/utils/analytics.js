/**
 * Aunty Bingo - Analytics & Monitoring Service
 * Tracks client-side gameplay events and integrates seamlessly with Google Analytics 4 (GA4).
 */

const STATS_KEY = 'aunty_analytics_stats';
const GA4_KEY = 'aunty_ga4_measurement_id';
const CF_KEY = 'aunty_cf_token';

// Default stats schema
const DEFAULT_STATS = {
  pageViews: 0,
  gamesStarted: 0,
  tilesMarked: 0,
  bingosWon: 0,
  facebookShares: 0,
  cardDownloads: 0,
  occasionPlays: {
    eid: 0,
    wedding: 0,
    exam: 0,
    general: 0,
    all: 0
  },
  popularPhrases: {}, // { [phraseId]: count }
  firstSeen: Date.now(),
  lastSeen: Date.now()
};

/**
 * Get current analytics metrics
 */
export function getAnalyticsStats() {
  if (typeof window === 'undefined') return { ...DEFAULT_STATS };
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_STATS, ...parsed, occasionPlays: { ...DEFAULT_STATS.occasionPlays, ...(parsed.occasionPlays || {}) } };
    }
  } catch (err) {
    console.warn('Failed to parse analytics stats:', err);
  }
  return { ...DEFAULT_STATS };
}

/**
 * Save analytics stats
 */
function saveStats(stats) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error('Failed to save analytics stats:', err);
  }
}

/**
 * Track an action event
 */
export function trackEvent(eventName, params = {}) {
  const stats = getAnalyticsStats();
  stats.lastSeen = Date.now();

  switch (eventName) {
    case 'page_view':
      stats.pageViews = (stats.pageViews || 0) + 1;
      break;
    case 'game_start':
      stats.gamesStarted = (stats.gamesStarted || 0) + 1;
      if (params.occasionId) {
        stats.occasionPlays = stats.occasionPlays || {};
        stats.occasionPlays[params.occasionId] = (stats.occasionPlays[params.occasionId] || 0) + 1;
      }
      break;
    case 'tile_mark':
      stats.tilesMarked = (stats.tilesMarked || 0) + 1;
      if (params.phraseId) {
        stats.popularPhrases = stats.popularPhrases || {};
        stats.popularPhrases[params.phraseId] = (stats.popularPhrases[params.phraseId] || 0) + 1;
      }
      break;
    case 'bingo_win':
      stats.bingosWon = (stats.bingosWon || 0) + 1;
      break;
    case 'facebook_share':
      stats.facebookShares = (stats.facebookShares || 0) + 1;
      break;
    case 'card_download':
      stats.cardDownloads = (stats.cardDownloads || 0) + 1;
      break;
    default:
      break;
  }

  saveStats(stats);

  // Forward event to Google Analytics 4 if gtag exists on window
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, params);
    } catch {
      // ignore
    }
  }
}

/**
 * Get configured Google Analytics 4 Measurement ID
 */
export function getGA4MeasurementId() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(GA4_KEY) || '';
}

/**
 * Save GA4 Measurement ID and dynamically inject script
 */
export function setGA4MeasurementId(measurementId) {
  if (typeof window === 'undefined') return;
  const cleanId = (measurementId || '').trim();
  if (cleanId) {
    localStorage.setItem(GA4_KEY, cleanId);
    initGA4(cleanId);
  } else {
    localStorage.removeItem(GA4_KEY);
  }
}

/**
 * Get Cloudflare token
 */
export function getCloudflareToken() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(CF_KEY) || '';
}

/**
 * Set Cloudflare token
 */
export function setCloudflareToken(token) {
  if (typeof window === 'undefined') return;
  const cleanToken = (token || '').trim();
  if (cleanToken) {
    localStorage.setItem(CF_KEY, cleanToken);
  } else {
    localStorage.removeItem(CF_KEY);
  }
}

/**
 * Initialize GA4 tracking script in <head>
 */
export function initGA4(customId) {
  if (typeof window === 'undefined') return;
  const gaId = customId || getGA4MeasurementId();
  if (!gaId || !gaId.startsWith('G-')) return;

  // Prevent duplicate script injection
  if (document.getElementById('ga4-script')) return;

  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', gaId, {
    page_title: document.title,
    page_location: window.location.href
  });
}

/**
 * Reset local analytics counters
 */
export function resetAnalyticsStats() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STATS_KEY);
  return { ...DEFAULT_STATS };
}
