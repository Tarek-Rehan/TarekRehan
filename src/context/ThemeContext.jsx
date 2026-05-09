import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext(null);

const THEME_KEY = 'tarek-portfolio-theme';

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored !== null) return stored === 'dark';
    } catch {}
    return true; // Default to dark mode
  });

  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDark);
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
