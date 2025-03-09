// src/components/LoadingScreen.tsx
import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh max-h-dvh w-dvw bg-gray-900 overflow-hidden">
      <div className="w-32 h-32 border-8 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      <p className="mt-5 text-xl text-white">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
