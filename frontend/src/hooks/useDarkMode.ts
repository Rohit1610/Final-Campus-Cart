import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  // Check if user has already set a preference or has a system preference
  const getUserPreference = () => {
    const storedPreference = localStorage.getItem('darkMode');
    if (storedPreference) {
      return storedPreference === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(getUserPreference());

  // Toggle between dark and light mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Apply the dark mode class to the document when the state changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Store the preference in localStorage
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  return { isDarkMode, toggleDarkMode };
};