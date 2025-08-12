import { createContext, useContext, useState, ReactNode } from 'react';

type PageType = 'home' | 'scope' | 'salary' | 'future' | 'top-companies' | 'students' | 'professionals' | 'curious' | 'about' | 'contact' | 'faq' | 'support';

interface RouterContextType {
  currentPage: PageType;
  navigateTo: (page: PageType) => void;
  goBack: () => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

interface RouterProviderProps {
  children: ReactNode;
}

export function RouterProvider({ children }: RouterProviderProps) {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [history, setHistory] = useState<PageType[]>(['home']);

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    setHistory(prev => [...prev, page]);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      const previousPage = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentPage(previousPage);
    }
  };

  return (
    <RouterContext.Provider value={{ currentPage, navigateTo, goBack }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}