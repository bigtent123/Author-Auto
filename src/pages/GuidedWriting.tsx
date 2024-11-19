import { useState } from 'react';
import { useAIStore } from '../stores/aiStore';
import { Button } from '../components/Button';
import { TextArea } from '../components/TextArea';
import { ModelSelector } from '../components/ModelSelector';

export function GuidedWriting() {
  const [currentStep, setCurrentStep] = useState(1);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const { isGenerating, generateBook } = useAIStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await generateBook(responses[currentStep] || '');
    setCurrentStep(prev => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Guided Writing Process</h1>

      <div className="mb-8">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-900">Step {currentStep} of 5</span>
          <div className="ml-4 flex-1 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-indigo-600 rounded-full transition-all"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <ModelSelector />
        
        <TextArea
          label={`Step ${currentStep}: ${getStepPrompt(currentStep)}`}
          value={responses[currentStep] || ''}
          onChange={(e) => setResponses(prev => ({ ...prev, [currentStep]: e.target.value }))}
          placeholder="Enter your response..."
          rows={6}
        />

        <div className="flex justify-between">
          <Button
            type="button"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1 || isGenerating}
            variant="secondary"
          >
            Previous
          </Button>

          <Button
            type="submit"
            isLoading={isGenerating}
            disabled={isGenerating || !responses[currentStep]?.trim()}
          >
            {currentStep === 5 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  );
}

function getStepPrompt(step: number): string {
  switch (step) {
    case 1:
      return "What's the main theme or concept of your book?";
    case 2:
      return "Describe your main characters and their motivations";
    case 3:
      return "Outline the major plot points";
    case 4:
      return "Describe the setting and world-building elements";
    case 5:
      return "What's the intended message or takeaway for readers?";
    default:
      return "";
  }
}