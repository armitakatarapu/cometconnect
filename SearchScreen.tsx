import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const initialTags = ['Music', 'Coding', 'Art', 'Sports'];

const SearchScreen: React.FC = () => {
  const [tags, setTags] = useState(initialTags);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-col h-screen px-4 py-6 bg-white">
      {/* Filter Tags Header */}
      <header className="text-sm font-medium text-gray-600 mb-2">
        Filter Tags
      </header>

      {/* Tag Row */}
      <div className="flex space-x-2 overflow-x-auto mb-6 pb-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className={`flex items-center px-3 py-1 rounded-full text-sm cursor-pointer 
              ${selectedTags.includes(tag) ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-700'}
            `}
            onClick={() => toggleTag(tag)}
          >
            <span>{tag}</span>
            {selectedTags.includes(tag) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                className="ml-2 text-xs font-bold text-blue-800"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {/* Add tag button */}
        <button
          className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition"
          //onClick={() => alert('Add tag functionality goes here')}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Search Bar */}
      <div className="mt-auto">
        <input
          type="text"
          placeholder="Find a friend"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
};

export default SearchScreen;
