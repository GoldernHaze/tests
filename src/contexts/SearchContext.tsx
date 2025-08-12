import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchQuery: string;
  searchResults: any;
  isSearchActive: boolean;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: any) => void;
  setIsSearchActive: (active: boolean) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
    setIsSearchActive(false);
  };

  return (
    <SearchContext.Provider value={{
      searchQuery,
      searchResults,
      isSearchActive,
      setSearchQuery,
      setSearchResults,
      setIsSearchActive,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}