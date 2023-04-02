import { useCallback, useState } from 'react';

type UseToggleResponse = {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

export function useToggle(initial = false): UseToggleResponse {
  const [isOpen, setIsOpen] = useState(initial);

  const toggle = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);
  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  return { isOpen, toggle, open, close };
}
