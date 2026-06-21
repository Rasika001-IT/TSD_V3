import './globals.css';
import { Suspense } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import PreviewHighlighter from '@/components/PreviewHighlighter';

export const metadata = {
  title: 'The Success Digest',
  description: 'Driving Business Forward, One Story at a Time',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <Suspense fallback={null}>
          <PreviewHighlighter />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
