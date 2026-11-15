import defaultPhrases from '../data/phrases.json';

const STORAGE_KEY = 'aunty_custom_questions';

/**
 * Question Store & Management Service
 * Provides full CRUD operations, localStorage persistence, import/export, and defaults fallback.
 */

// Load questions from localStorage or fallback to default phrases
export function getStoredQuestions() {
  if (typeof window === 'undefined') return defaultPhrases;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored questions from localStorage:', err);
  }
  return defaultPhrases;
}

// Save questions array to localStorage
export function saveQuestions(questions) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
    // Dispatch custom event so board and components update immediately
    window.dispatchEvent(new CustomEvent('aunty:questions_updated', { detail: questions }));
  } catch (err) {
    console.error('Failed to save questions to localStorage:', err);
  }
}

// Add a new question
export function addQuestion({ en, bn, occasions = ['general'] }) {
  const current = getStoredQuestions();
  // Generate unique ID
  const maxId = current.reduce((max, q) => (typeof q.id === 'number' && q.id > max ? q.id : max), 0);
  const newQuestion = {
    id: maxId + 1,
    en: en.trim(),
    bn: bn.trim(),
    occasions: occasions.length > 0 ? occasions : ['general']
  };
  const updated = [newQuestion, ...current];
  saveQuestions(updated);
  return newQuestion;
}

// Update an existing question
export function updateQuestion(id, updatedFields) {
  const current = getStoredQuestions();
  const updated = current.map((q) => {
    if (q.id === id) {
      return {
        ...q,
        ...updatedFields,
        occasions: updatedFields.occasions && updatedFields.occasions.length > 0
          ? updatedFields.occasions
          : q.occasions || ['general']
      };
    }
    return q;
  });
  saveQuestions(updated);
  return updated;
}

// Delete a question by ID
export function deleteQuestion(id) {
  const current = getStoredQuestions();
  const updated = current.filter((q) => q.id !== id);
  saveQuestions(updated);
  return updated;
}

// Reset all questions to default 164 phrases
export function resetQuestionsToDefault() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('aunty:questions_updated', { detail: defaultPhrases }));
  }
  return defaultPhrases;
}

// Export current questions as a downloadable JSON file
export function exportQuestionsAsJSON() {
  const questions = getStoredQuestions();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `aunty-bingo-phrases-${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  document.body.removeChild(downloadAnchor);
}

// Import questions from a JSON string or file
export function importQuestionsFromJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      throw new Error('Imported data must be a JSON array of phrases.');
    }
    // Validate that items have en and bn
    const valid = parsed.every(p => p && typeof p.en === 'string' && typeof p.bn === 'string');
    if (!valid) {
      throw new Error('Each question item must have valid "en" and "bn" text.');
    }
    saveQuestions(parsed);
    return { success: true, count: parsed.length };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
