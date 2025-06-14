import { useState } from "react";
import { CiSearch } from 'react-icons/ci';

export default function SearchBarAdmin ({onSearch}) {
  const [searchValue, setSearchValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchValue.trim());
    }
  };

  const handleIconClick = () => {
    onSearch(searchValue.trim());
  };

  return (
    <div className="mb-6">
      <div className="border-4 border-orange-600 rounded-md w-2/5 py-2 px-5 flex justify-between items-center gap-x-3">
        <button onClick={handleIconClick}>
          <CiSearch className="text-orange-600 text-xl font-black cursor-pointer" />
        </button>
        <input 
          type="text" 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Cari berdasarkan kode order..."
          className="w-full rounded ring-0 focus:outline-none py-2 px-3 text-sm font-medium text-orange-600"
        />
      </div> 
    </div>
  );
}
