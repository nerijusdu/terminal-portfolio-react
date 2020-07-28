import React from 'react';

const directories = {
  '/': { isRestricted: true },
  '/home': { isRestricted: true },
  '/home/guest': {
    files: ['about.txt']
  },
  '/home/guest/projects': {
    files: []
  }
};

export const initialContext = {
  currentPath: '/home/guest',
  homePath: '/home/guest',
  directories
};

const TerminalContext = React.createContext();

export default TerminalContext;
