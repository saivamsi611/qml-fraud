// components/LoadingManager.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext();

export const useGlobalLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useGlobalLoading must be used within LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingQueue, setLoadingQueue] = useState(new Set());

  const startGlobalLoading = (id, message = 'Loading...') => {
    setLoadingQueue(prev => new Set(prev.add(id)));
    setLoadingMessage(message);
    setGlobalLoading(true);
  };

  const stopGlobalLoading = (id) => {
    setLoadingQueue(prev => {
      const newQueue = new Set(prev);
      newQueue.delete(id);
      
      if (newQueue.size === 0) {
        setGlobalLoading(false);
        setLoadingMessage('');
      }
      
      return newQueue;
    });
  };

  const value = {
    globalLoading,
    loadingMessage,
    startGlobalLoading,
    stopGlobalLoading,
    isLoading: (id) => loadingQueue.has(id)
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

// Enhanced Asset Loader
export class AssetLoader {
  constructor() {
    this.loadedAssets = new Set();
    this.loadingPromises = new Map();
  }

  async loadImage(src, id = src) {
    if (this.loadedAssets.has(id)) {
      return Promise.resolve();
    }

    if (this.loadingPromises.has(id)) {
      return this.loadingPromises.get(id);
    }

    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.loadedAssets.add(id);
        resolve(img);
      };
      img.onerror = reject;
      img.src = src;
    });

    this.loadingPromises.set(id, promise);
    return promise;
  }

  async loadScript(src, id = src) {
    if (this.loadedAssets.has(id)) {
      return Promise.resolve();
    }

    if (this.loadingPromises.has(id)) {
      return this.loadingPromises.get(id);
    }

    const promise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.onload = () => {
        this.loadedAssets.add(id);
        resolve();
      };
      script.onerror = reject;
      script.src = src;
      document.head.appendChild(script);
    });

    this.loadingPromises.set(id, promise);
    return promise;
  }

  async loadMultiple(assets) {
    const promises = assets.map(asset => {
      if (asset.type === 'image') {
        return this.loadImage(asset.src, asset.id);
      } else if (asset.type === 'script') {
        return this.loadScript(asset.src, asset.id);
      }
      return Promise.resolve();
    });

    return Promise.all(promises);
  }

  isLoaded(id) {
    return this.loadedAssets.has(id);
  }

  clearCache() {
    this.loadedAssets.clear();
    this.loadingPromises.clear();
  }
}

export const assetLoader = new AssetLoader();