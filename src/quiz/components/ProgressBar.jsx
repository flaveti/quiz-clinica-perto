import React from 'react';

export default function ProgressBar({ progress }) {
  return (
    <div className="cp-progress">
      <div 
        className="cp-progress-fill" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}