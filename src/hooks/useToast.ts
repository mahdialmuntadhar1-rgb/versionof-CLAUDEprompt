import { useState, useEffect, useCallback } from 'react';

export const useToast = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((msg: string, duration = 3000) => {
    setMessage(msg);
    setVisible(true);
    
    setTimeout(() => {
      setVisible(false);
    }, duration);
  }, []);

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 300); // Wait for fade out animation
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return { message, visible, showToast };
};
