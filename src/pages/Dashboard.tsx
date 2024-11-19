import { Link } from 'react-router-dom';
import { PencilSquareIcon, BookOpenIcon } from '@heroicons/react/24/outline';

export function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome to AI Book Writer</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/single-prompt" 
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <PencilSquareIcon className="h-8 w-8 text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Single Prompt Writing</h2>
          <p className="text-gray-600">Generate a complete book from a single detailed prompt.</p>
        </Link>

        <Link to="/guided-writing"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <BookOpenIcon className="h-8 w-8 text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Guided Writing</h2>
          <p className="text-gray-600">Create your book step by step with AI assistance.</p>
        </Link>
      </div>
    </div>
  );
}