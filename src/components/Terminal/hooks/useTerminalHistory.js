import { useState, useContext } from 'react';
import TerminalContext from '../logic/TerminalContext';

export default (initialValue) => {
  const [items, setItems] = useState(initialValue);
  const context = useContext(TerminalContext);
  let currentItems = items;

  return {
    context,
    items: currentItems,
    append: (text, showUser) => currentItems = [...currentItems, {
      text,
      showUser,
      currentPath: context.currentPath
    }],
    commit: () => setItems(currentItems),
    clear: () => setItems([])
  };
};
