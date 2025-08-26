// hooks/useLoading.js
import { useState, useEffect } from 'react';

const useLoading = (
  pageKey = 'default',
  minLoadTime = 1500,
  checkAssets = true
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Initializing Quantum Detection...");
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Check if this page has been loaded before in this session
  const getSessionKey = () => `quantum_loaded_${pageKey}`;
  
  useEffect(() => {
    const sessionKey = getSessionKey();
    const hasLoadedBefore = sessionStorage.getItem(sessionKey) === 'true';

    // If already loaded in this session, skip loading
    if (hasLoadedBefore) {
      setIsLoading(false);
      return;
    }

    // Asset loading checker
    const checkAssetsLoaded = () => {
      return new Promise((resolve) => {
        // Check if document is ready
        if (document.readyState === 'complete') {
          resolve(true);
          return;
        }

        // Wait for window load event
        const handleLoad = () => {
          window.removeEventListener('load', handleLoad);
          resolve(true);
        };

        window.addEventListener('load', handleLoad);
        
        // Fallback timeout
        setTimeout(() => {
          window.removeEventListener('load', handleLoad);
          resolve(true);
        }, 5000);
      });
    };

    // Main loading logic
    const initializeLoading = async () => {
      const startTime = Date.now();
      
      if (checkAssets) {
        // Wait for assets to load
        setLoadingMessage("Loading Quantum Assets...");
        await checkAssetsLoaded();
        setAssetsLoaded(true);
        setLoadingMessage("Initializing Security Protocols...");
      }

      // Ensure minimum loading time for smooth UX
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }

      // Mark as loaded in session
      sessionStorage.setItem(sessionKey, 'true');
      setIsLoading(false);
    };

    initializeLoading();
  }, [pageKey, minLoadTime, checkAssets]);

  // Manual loading controls
  const startLoading = (message = "Processing...", resetSession = false) => {
    if (resetSession) {
      sessionStorage.removeItem(getSessionKey());
    }
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const stopLoading = () => {
    sessionStorage.setItem(getSessionKey(), 'true');
    setIsLoading(false);
  };

  // Force reload (for testing or refresh scenarios)
  const forceReload = () => {
    sessionStorage.removeItem(getSessionKey());
    setIsLoading(true);
    setLoadingMessage("Reinitializing Systems...");
  };

  return {
    isLoading,
    loadingMessage,
    assetsLoaded,
    startLoading,
    stopLoading,
    forceReload
  };
};

export default useLoading;