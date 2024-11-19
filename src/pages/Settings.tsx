import { useState, useEffect } from 'react';
import { Button } from '../components/Button';

export function Settings() {
  const [openAIKey, setOpenAIKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [saved, setSaved] = useState(false);
  
  // Load existing keys on mount
  useEffect(() => {
    const savedOpenAIKey = localStorage.getItem('openai_key');
    const savedAnthropicKey = localStorage.getItem('anthropic_key');
    
    if (savedOpenAIKey) setOpenAIKey(savedOpenAIKey);
    if (savedAnthropicKey) setAnthropicKey(savedAnthropicKey);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (openAIKey) {
      localStorage.setItem('openai_key', openAIKey);
    }
    
    if (anthropicKey) {
      localStorage.setItem('anthropic_key', anthropicKey);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">API Keys</h2>
            <p className="text-sm text-gray-500 mb-4">
              Enter your API keys to use the respective AI models. Your keys are stored securely in your browser.
            </p>
          </div>

          <div>
            <label htmlFor="openAIKey" className="block text-sm font-medium text-gray-700 mb-2">
              OpenAI API Key
            </label>
            <input
              type="password"
              id="openAIKey"
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="sk-..."
            />
            <p className="mt-1 text-sm text-gray-500">Required for GPT-4o and o1 models</p>
          </div>

          <div>
            <label htmlFor="anthropicKey" className="block text-sm font-medium text-gray-700 mb-2">
              Anthropic API Key
            </label>
            <input
              type="password"
              id="anthropicKey"
              value={anthropicKey}
              onChange={(e) => setAnthropicKey(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="sk-ant-..."
            />
            <p className="mt-1 text-sm text-gray-500">Required for Claude 3.5 Sonnet model</p>
          </div>
        </div>

        {saved && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Settings saved successfully!</p>
              </div>
            </div>
          </div>
        )}

        <Button 
          type="submit"
          disabled={!openAIKey && !anthropicKey}
        >
          Save Settings
        </Button>
      </form>
    </div>
  );
}