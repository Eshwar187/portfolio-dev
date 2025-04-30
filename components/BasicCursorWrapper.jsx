'use client';

import dynamic from 'next/dynamic';

// Import BasicCursor with no SSR to avoid hydration issues
const BasicCursor = dynamic(() => import('./BasicCursor'), { ssr: false });

export default function BasicCursorWrapper() {
  return <BasicCursor />;
}
