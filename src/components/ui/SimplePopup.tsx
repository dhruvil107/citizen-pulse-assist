import React from "react";

interface SimplePopupProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SimplePopup: React.FC<SimplePopupProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-background rounded-lg shadow-lg p-6 min-w-[250px] max-w-xs w-full relative animate-fade-in">
        <button
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default SimplePopup;
