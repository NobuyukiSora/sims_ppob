import React, { useEffect, useState } from "react";
import './styles.css'

export const Snackbar = ({ message, visible, type, onDismiss }) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onDismiss();
      }, 100000);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  if (!show) return null;

  return (
    <div className={`${type === 'error' ? 'snackbar-error' : 'snackbar-success'} snackbar`}>
      <span className={`${type === 'error' ? 'snackbar-error' : 'snackbar-success'}`}>{message}</span>
      <button className="clean-button" onClick={() => setShow(false)}>✕</button>
    </div>
  );
};
