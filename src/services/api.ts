interface GenerateChapterParams {
  prompt: string;
  chapterNumber: number;
  previousChapters?: string[];
  model: 'gpt-4o' | 'o1-preview' | 'claude-3.5-sonnet';
  apiKey: string;
}

export async function generateChapter({
  prompt,
  chapterNumber,
  previousChapters = [],
  model,
  apiKey
}: GenerateChapterParams): Promise<string> {
  const userPrompt = `
Book Prompt: ${prompt}

${previousChapters.length > 0 ? `Previous chapters summary: ${previousChapters.join('\n\n')}` : ''}

Write Chapter ${chapterNumber}. Focus on advancing the story while maintaining consistency with previous chapters.
`;

  // Claude 3.5 Sonnet
  if (model === 'claude-3.5-sonnet') {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3.5-sonnet',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Error generating chapter');
    return data.completion;
  }

  // GPT-4o
  if (model === 'gpt-4o') {
    const systemPrompt = `You are an expert book writer. Write chapter ${chapterNumber} based on the provided prompt. Ensure continuity with previous chapters if any. Write engaging, well-structured content.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 4000,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0.1
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Error generating chapter');
    return data.choices[0].message.content;
  }

  // o1-preview
  if (model === 'o1-preview') {
    const o1Prompt = `You are an expert book writer. Write chapter ${chapterNumber} based on the provided prompt. Ensure continuity with previous chapters if any. Write engaging, well-structured content.\n\n${userPrompt}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'o1-preview',
        messages: [
          { role: 'user', content: o1Prompt }
        ],
        max_completion_tokens: 4000,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Error generating chapter');
    return data.choices[0].message.content;
  }

  throw new Error('Invalid model selected');
}