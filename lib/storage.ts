// Local storage management for learning history

export interface LearningSession {
  id: string;
  fileName: string;
  text: string;
  summary?: string;
  flashcards?: any[];
  quiz?: any[];
  createdAt: string;
}

export class StorageManager {
  private storageKey = 'pelajarin-sessions';

  getSessions(): LearningSession[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading sessions:', error);
      return [];
    }
  }

  getSession(id: string): LearningSession | null {
    const sessions = this.getSessions();
    return sessions.find(s => s.id === id) || null;
  }

  saveSession(session: LearningSession): void {
    if (typeof window === 'undefined') return;

    try {
      const sessions = this.getSessions();
      const existingIndex = sessions.findIndex(s => s.id === session.id);
      
      if (existingIndex >= 0) {
        sessions[existingIndex] = session;
      } else {
        sessions.unshift(session);
      }

      // Keep only last 50 sessions
      const trimmedSessions = sessions.slice(0, 50);
      localStorage.setItem(this.storageKey, JSON.stringify(trimmedSessions));
    } catch (error) {
      console.error('Error saving session:', error);
    }
  }

  deleteSession(id: string): void {
    if (typeof window === 'undefined') return;

    try {
      const sessions = this.getSessions();
      const filtered = sessions.filter(s => s.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  }

  clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.storageKey);
  }

  getStorageSize(): string {
    if (typeof window === 'undefined') return '0 KB';
    
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return '0 KB';
      
      const bytes = new Blob([data]).size;
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } catch (error) {
      return '0 KB';
    }
  }
}
