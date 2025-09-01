import React, { useState } from 'react';
import type {FormEvent} from 'react';

interface CreateNoteProps {
  onCreate: (title: string) => void;
  loading: boolean;
}

const CreateNote: React.FC<CreateNoteProps> = ({ onCreate, loading }) => {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate(title);
    setTitle('');
    setShowInput(false);
  };

  const handleCreateClick = () => {
    setShowInput(true);
  };

  if (!showInput) {
    return (
      <div className="px-4 sm:px-0">
        <button
          onClick={handleCreateClick}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          disabled={loading}
        >
          Create Note
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-0">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          className="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          autoFocus
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={loading || !title.trim()}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            {loading ? 'Creating...' : 'Add Note'}
          </button>
          <button
            type="button"
            onClick={() => {
              setShowInput(false);
              setTitle('');
            }}
            className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;