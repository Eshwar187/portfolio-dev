'use client';

import dynamic from 'next/dynamic';

// Import Cursor with no SSR to avoid hydration issues
const Cursor = dynamic(() => import('./Cursor'), { ssr: false });

export default function CursorWrapper() {
  return <Cursor />;
}
