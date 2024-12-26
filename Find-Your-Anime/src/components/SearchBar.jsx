import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full max-w-lg  flex gap-4">
      <Input
        type="text"
        placeholder="What do you wanna watch?..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-12 text-black bg-card border border-secondary placeholder-secondary focus:ring-primary focus:border-primary"
      />
      <Button
        onClick={handleSearch}
        className="bg-primary h-12 text-accent hover:bg-hover px-4 py-2 rounded-md"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
