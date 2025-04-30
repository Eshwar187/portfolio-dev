'use client';

import dynamic from 'next/dynamic';

// Import SimpleCursor with no SSR to avoid hydration issues
const SimpleCursor = dynamic(() => import('./SimpleCursor'), { ssr: false });

export default function SimpleCursorWrapper() {
  return <SimpleCursor />;
}
