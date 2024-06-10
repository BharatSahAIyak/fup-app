import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const fpPromise = FingerprintJS.load();

    (async () => {
      const fp = await fpPromise;
      const result = await fp.get();
      console.log(result.visitorId);
      const paddedHash = result.visitorId.padEnd(32, '0');

      const uuid = `${paddedHash.slice(0, 8)}-${paddedHash.slice(
        8,
        12
      )}-${paddedHash.slice(12, 16)}-${paddedHash.slice(
        16,
        20
      )}-${paddedHash.slice(20)}`;

      localStorage.setItem('userId', uuid);
    })();
  }, []);

  return <Component {...pageProps} />;
}
