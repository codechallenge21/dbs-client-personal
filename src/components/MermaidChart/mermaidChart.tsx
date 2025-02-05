'use client'; // Enable client-side rendering

import { useEffect } from 'react';
import mermaid from 'mermaid';

export default function MermaidChart({ chart }) {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, []);

  return <div className="mermaid">{chart}</div>;
}
