// hooks/usePageLoader.js
import { useState, useEffect, useRef } from 'react';

const usePageLoader = (pageId, options = {}) => {
  const {
    minLoadTime = 3000,
    maxLoadTime = 5000,
    checkDOMReady = true,
    checkImages = true,
    checkFonts = false,
    customAssets = [],
    onLoadComplete = null
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Initializing...");
  const [error, setError] = useState(null);
  
  const startTimeRef = useRef(Date.now());
  const hasLoadedRef = useRef(false);

  // Session key for this specific page
  const getSessionKey = () => `page_loaded_${pageId}_${window.location.pathname}`;

  useEffect(() => {
    const sessionKey = getSessionKey();
    
    // Check if page was already loaded in this session
    if (sessionStorage.getItem(sessionKey) === 'true') {
      setIsLoading(false);
      hasLoadedRef.current = true;
      return;
    }

    const loadPage = async () => {
      try {
        startTimeRef.current = Date.now();
        let progress = 0;
        const updateProgress = (newProgress, message) => {
          setLoadingProgress(Math.min(newProgress, 100));
          setLoadingMessage(message);
        };

        // Step 1: DOM Ready Check
        if (checkDOMReady) {
          updateProgress(10, "Loading DOM...");
          await waitForDOMReady();
          updateProgress(25, "DOM Ready");
        }

        // Step 2: Font Loading
        if (checkFonts && document.fonts) {
          updateProgress(30, "Loading Fonts...");
          await document.fonts.ready;
          updateProgress(45, "Fonts Loaded");
        }

        // Step 3: Image Loading
        if (checkImages) {
          updateProgress(50, "Loading Images...");
          await loadAllImages();
          updateProgress(70, "Images Loaded");
        }

        // Step 4: Custom Assets
        if (customAssets.length > 0) {
          updateProgress(75, "Loading Assets...");
          await loadCustomAssets(customAssets, updateProgress);
          updateProgress(90, "Assets Ready");
        }

        // Step 5: Ensure minimum load time
        updateProgress(95, "Finalizing...");
        await ensureMinimumLoadTime();
        
        // Complete
        updateProgress(100, "Ready!");
        
        // Mark as loaded in session
        sessionStorage.setItem(sessionKey, 'true');
        hasLoadedRef.current = true;
        
        if (onLoadComplete) {
          onLoadComplete();
        }
        
        // Small delay before hiding loader for smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 200);

      } catch (err) {
        console.error('Page loading error:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadPage();
  }, [pageId]);

  // Helper functions
  const waitForDOMReady = () => {
    return new Promise((resolve) => {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        resolve();
      } else {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      }
    });
  };

  const loadAllImages = () => {
    return new Promise((resolve) => {
      const images = document.querySelectorAll('img');
      if (images.length === 0) {
        resolve();
        return;
      }

      let loadedCount = 0;
      const totalImages = images.length;
      
      const checkComplete = () => {
        loadedCount++;
        if (loadedCount >= totalImages) {
          resolve();
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          checkComplete();
        } else {
          img.addEventListener('load', checkComplete, { once: true });
          img.addEventListener('error', checkComplete, { once: true }); // Continue even on error
        }
      });

      // Timeout fallback
      setTimeout(resolve, 3000);
    });
  };

  const loadCustomAssets = async (assets, progressCallback) => {
    const total = assets.length;
    let loaded = 0;

    for (const asset of assets) {
      try {
        await loadAsset(asset);
        loaded++;
        progressCallback(75 + (loaded / total) * 10, `Loaded ${asset.name || 'asset'}`);
      } catch (err) {
        console.warn('Failed to load asset:', asset, err);
        loaded++; // Continue anyway
      }
    }
  };

  const loadAsset = (asset) => {
    return new Promise((resolve, reject) => {
      if (asset.type === 'image') {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = asset.src;
      } else if (asset.type === 'script') {
        const script = document.createElement('script');
        script.onload = resolve;
        script.onerror = reject;
        script.src = asset.src;
        document.head.appendChild(script);
      } else {
        resolve(); // Unknown type, skip
      }
    });
  };

  const ensureMinimumLoadTime = async () => {
    const elapsed = Date.now() - startTimeRef.current;
    const remaining = minLoadTime - elapsed;
    
    if (remaining > 0) {
      await new Promise(resolve => setTimeout(resolve, remaining));
    }
  };

  // Manual controls
  const forceReload = () => {
    sessionStorage.removeItem(getSessionKey());
    window.location.reload();
  };

  const skipLoading = () => {
    sessionStorage.setItem(getSessionKey(), 'true');
    setIsLoading(false);
  };

  return {
    isLoading: isLoading && !hasLoadedRef.current,
    loadingProgress,
    loadingMessage,
    error,
    forceReload,
    skipLoading,
    hasLoaded: hasLoadedRef.current
  };
};

export default usePageLoader;