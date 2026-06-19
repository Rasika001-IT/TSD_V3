import './globals.css';

export const metadata = {
  title: 'The Success Digest',
  description: 'Driving Business Forward, One Story at a Time',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
