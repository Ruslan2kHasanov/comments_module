import React from 'react';

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main
    style={{
      height: '93dvh',
      width: '100%',
    }}
  >
    {children}
  </main>
);

export default Main;
