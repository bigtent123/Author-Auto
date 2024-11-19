import { useAIStore } from '../stores/aiStore';

export function ModelSelector() {
  const { selectedModel, setSelectedModel } = useAIStore();

  return (
    <div className="form-control">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select AI Model
      </label>
      <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value as any)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="gpt-4o">GPT-4o</option>
        <option value="o1-preview">OpenAi o1</option>
        <option value="claude-3.5-sonnet">Claude 3.5 Sonnet</option>
      </select>
    </div>
  );
}