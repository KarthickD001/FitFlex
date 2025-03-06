// Search.js
import React, { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(`Searching for: ${query}`);
  };

  return (
    <div>
      <h2>Search Workouts</h2>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search exercise..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;