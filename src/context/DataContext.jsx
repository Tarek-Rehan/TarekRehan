import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import defaultData from '../data/defaultData.json';

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
      // Only merge top-level keys that are missing in parsed to avoid overwriting deletions
      const merged = { ...defaultData };
      Object.keys(parsed).forEach(key => {
        merged[key] = parsed[key];
      });
      return merged;
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

  // Reset all data to defaults (Hard reset)
  const resetData = useCallback(() => {
    if (window.confirm('This will delete all your custom changes and revert to the original file data. Are you sure?')) {
      localStorage.removeItem(STORAGE_KEY);
      setData({ ...defaultData });
      window.location.reload(); // Refresh to ensure clean state
    }
  }, []);
  // Sync with file (Hard Sync)
  const syncWithFile = useCallback(() => {
    setData(() => {
      localStorage.removeItem(STORAGE_KEY); // Clear cache to be sure
      return { ...defaultData };
    });
    alert('SYSTEM REFRESHED: Loaded directly from defaultData.json file.');
    window.location.reload();
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
    syncWithFile,
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
