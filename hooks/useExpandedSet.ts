import { useState } from 'react';

export function useExpandedSet(initial?: Set<string>): [Set<string>, (key: string) => void] {
  const [expanded, setExpanded] = useState<Set<string>>(initial ?? new Set());

  const toggle = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return [expanded, toggle];
}
