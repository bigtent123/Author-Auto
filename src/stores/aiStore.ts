import create from 'zustand';
import { generateChapter } from '../services/api';

interface AIStore {
  selectedModel: 'gpt-4o' | 'o1-preview' | 'claude-3.5-sonnet';
  isGenerating: boolean;
  progress: number;
  generatedChapters: string[];
  error: string | null;
  setSelectedModel: (model: AIStore['selectedModel']) => void;
  generateBook: (prompt: string, numChapters: number) => Promise<void>;
  checkRepetition: (text: string) => Promise<boolean>;
  getApiKey: () => string | null;
  clearError: () => void;
}

export const useAIStore = create<AIStore>((set, get) => ({
  selectedModel: 'gpt-4o',
  isGenerating: false,
  progress: 0,
  generatedChapters: [],
  error: null,
  
  setSelectedModel: (model) => set({ selectedModel: model }),
  
  generateBook: async (prompt: string, numChapters: number) => {
    const apiKey = get().getApiKey();
    if (!apiKey) {
      set({ error: 'API key not found. Please add it in Settings.' });
      return;
    }

    set({ isGenerating: true, progress: 0, generatedChapters: [], error: null });
    
    try {
      const chapters: string[] = [];
      const model = get().selectedModel;
      
      for (let i = 0; i < numChapters; i++) {
        const chapter = await generateChapter({
          prompt,
          chapterNumber: i + 1,
          previousChapters: chapters,
          model,
          apiKey
        });
        
        chapters.push(chapter);
        
        set({ 
          progress: ((i + 1) / numChapters) * 100,
          generatedChapters: [...chapters]
        });
      }
    } catch (error) {
      console.error('Error generating book:', error);
      set({ error: error instanceof Error ? error.message : 'Error generating book' });
    } finally {
      set({ isGenerating: false });
    }
  },

  checkRepetition: async (text: string) => {
    // Simple repetition check - can be enhanced
    const sentences = text.split(/[.!?]+/).map(s => s.trim().toLowerCase());
    const uniqueSentences = new Set(sentences);
    return uniqueSentences.size < sentences.length * 0.8;
  },

  getApiKey: () => {
    const { selectedModel } = get();
    if (selectedModel === 'claude-3.5-sonnet') {
      return localStorage.getItem('anthropic_key');
    }
    return localStorage.getItem('openai_key');
  },

  clearError: () => set({ error: null })
}));