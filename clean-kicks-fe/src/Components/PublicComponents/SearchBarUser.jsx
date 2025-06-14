import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

export default function SearchBarUser({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchValue.trim());
    }
  };

  const handleIconClick = () => {
    onSearch(searchValue.trim());
  };

  return (
    <div className="w-full py-2 px-5 border-2 rounded-md border-blue-900 flex justify-between items-center gap-x-3">
      <button onClick={handleIconClick}>
        <CiSearch className="text-blue-900 text-xl font-black cursor-pointer" />
      </button>
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChanges}
        onKeyDown={handleKeyDown}
        placeholder="Put Your Code Here !"
        className="w-full rounded ring-0 focus:outline-none py-2 px-3 text-sm font-black text-blue-900"
      />
    </div>
  );
}
