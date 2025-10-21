import React, { useRef } from 'react';

export default function HeaderLogo({ onUnlockAdmin }) {
  const clicks = useRef(0);
  const timeoutRef = useRef(null);

  const handleClick = () => {
    clicks.current += 1;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => (clicks.current = 0), 1500);
    
    if (clicks.current >= 10) {
      clicks.current = 0;
      onUnlockAdmin?.();
    }
  };

  return (
    <header className="cp-header" onClick={handleClick} role="banner">
      <img 
        src="/img/logo1.png" 
        alt="Clínica Perto" 
        className="cp-logo" 
        style={{ 
          height: 54, 
          objectFit: 'contain'
        }} 
      />
    </header>
  );
}