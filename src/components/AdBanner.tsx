import React, { useEffect, useRef } from 'react';
import type { AdUnitProps } from '../types';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdBanner: React.FC<AdUnitProps> = ({ format = 'auto', className = '', label = 'Advertisement' }) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // This pushes the ad request to Google's script
    try {
      if (adRef.current && window.adsbygoogle) {
        // Safety check to prevent double-push in React StrictMode
        if (adRef.current.innerHTML === "") {
             (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`w-full my-8 flex flex-col items-center justify-center ${className}`}>
      <div className="w-full text-xs text-center text-slate-400 uppercase tracking-widest mb-1">{label}</div>
      
      {/* 
        IMPORTANT: 
        1. Replace data-ad-client with your "ca-pub-..." ID.
        2. Create Ad Units in Google AdSense dashboard and paste the data-ad-slot ID here.
        For now, this is a generic responsive unit configuration.
      */}
      <div className="w-full bg-slate-50 min-h-[100px] flex justify-center overflow-hidden">
          <ins className="adsbygoogle"
              ref={adRef}
              style={{ display: 'block', width: '100%' }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace this!
              data-ad-slot="1234567890" // Replace this with a real slot ID from AdSense
              data-ad-format={format}
              data-full-width-responsive="true">
          </ins>
      </div>
      
      {/* Fallback visual for development (AdSense is often blank on localhost) */}
      <div className="text-[10px] text-slate-300 mt-1">
          AdSense Space (Visible in Prod)
      </div>
    </div>
  );
};
