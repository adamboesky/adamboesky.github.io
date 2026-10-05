import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/research': 'Research – Adam Boesky',
  '/cv': 'CV – Adam Boesky',
};

/**
 * Custom hook to keep the browser tab title in sync with the current route
 * (the static HTML for each route already has the right title on first load)
 */
const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace(/\/+$/, '') || '/';
    document.title = PAGE_TITLES[path] || 'Adam Boesky';
  }, [location]);
};

export default usePageTitle;
