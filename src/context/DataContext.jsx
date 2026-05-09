import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import defaultData from '../data/defaultData';

const STORAGE_KEY = 'tarek-portfolio-data';

const DataContext = createContext(null);

/**
 * Loads portfolio data from localStorage, falling back to defaultData.
 */
function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults so new fields are always present
      return { ...defaultData, ...parsed };
    }
  } catch (err) {
    console.warn('Failed to load portfolio data from localStorage:', err);
  }
  return { ...defaultData };
}

/**
 * Saves portfolio data to localStorage.
 */
function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save portfolio data:', err);
  }
}

/**
 * DataProvider — wraps the app and provides portfolio data + updater functions.
 */
export function DataProvider({ children }) {
  const [data, setData] = useState(loadData);

  // Persist on every change
  useEffect(() => {
    saveData(data);
  }, [data]);

  // Generic updater: updateSection('profile', { name: 'New Name' })
  const updateSection = useCallback((section, value) => {
    setData((prev) => ({
      ...prev,
      [section]: typeof value === 'function' ? value(prev[section]) : value,
    }));
  }, []);

  // Reset all data to defaults
  const resetData = useCallback(() => {
    setData({ ...defaultData });
  }, []);

  // Export data as JSON file download
  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  // Import data from a JSON file
  const importData = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          setData({ ...defaultData, ...imported });
          resolve();
        } catch (err) {
          reject(new Error('Invalid JSON file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }, []);

  const value = {
    data,
    setData,
    updateSection,
    resetData,
    exportData,
    importData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

/**
 * Hook to access portfolio data and updaters.
 */
export function usePortfolioData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a DataProvider');
  }
  return context;
}

export default DataContext;
