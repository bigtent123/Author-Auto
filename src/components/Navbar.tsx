import { Link } from 'react-router-dom';
import { BookOpenIcon } from '@heroicons/react/24/outline';

export function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <BookOpenIcon className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AI Book Writer</span>
            </Link>
            
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/single-prompt" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
                Single Prompt
              </Link>
              <Link to="/guided-writing" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
                Guided Writing
              </Link>
              <Link to="/settings" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}