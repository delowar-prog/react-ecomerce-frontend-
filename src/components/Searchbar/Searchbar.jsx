import React from 'react';
import { Input } from '../ui/input';
import { MdSearch } from 'react-icons/md';

const Searchbar = () => {
    return (
        <div>
                  <div className="w-full px-6 py-4 flex items-center gap-2 relative">
                    <div className="flex w-full max-w-lg mx-auto relative">
                      <Input type="text" placeholder="Search" className="w-full pr-10" />
                      <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center"
                        aria-label="Search"
                      >
                        <MdSearch size={24} />
                      </button>
                    </div>
                  </div>
        </div>
    );
};

export default Searchbar;