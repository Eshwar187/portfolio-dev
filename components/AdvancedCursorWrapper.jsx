'use client';

import dynamic from 'next/dynamic';

// Import AdvancedCursor with no SSR to avoid hydration issues
const AdvancedCursor = dynamic(() => import('./AdvancedCursor'), { ssr: false });

export default function AdvancedCursorWrapper() {
  return <AdvancedCursor />;
}
