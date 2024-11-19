import { useState } from 'react';
import { useAIStore } from '../stores/aiStore';
import { Button } from '../components/Button';
import { TextArea } from '../components/TextArea';
import { ModelSelector } from '../components/ModelSelector';
import ReactMarkdown from 'react-markdown';

export function SinglePrompt() {
  const [prompt, setPrompt] = useState('');
  const [numChapters, setNumChapters] = useState(5);
  const { generateBook, isGenerating, progress, generatedChapters, error } = useAIStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    await generateBook(prompt, numChapters);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Generate Book from Single Prompt</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6 mb-8">
        <ModelSelector />
        
        <div>
          <label htmlFor="chapters" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Chapters
          </label>
          <input
            type="number"
            id="chapters"
            min={1}
            max={20}
            value={numChapters}
            onChange={(e) => setNumChapters(parseInt(e.target.value))}
            className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        
        <TextArea
          label="Enter your book prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your book idea in detail..."
          rows={6}
        />

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        <Button 
          type="submit"
          isLoading={isGenerating}
          disabled={isGenerating || !prompt.trim()}
        >
          Generate Book
        </Button>

        {isGenerating && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Generating chapters... {Math.round(progress)}%
              </span>
              <span className="text-sm text-gray-500">
                {generatedChapters.length} of {numChapters} chapters
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </form>

      {generatedChapters.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6 space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">Generated Book</h2>
          {generatedChapters.map((chapter, index) => (
            <div key={index} className="prose max-w-none">
              <ReactMarkdown>{chapter}</ReactMarkdown>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}