// src/app/providers.tsx
"use client";

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../services/store/store';


interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default Providers;
