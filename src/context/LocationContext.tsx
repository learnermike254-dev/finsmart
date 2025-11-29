
import React, { createContext, useContext, useEffect, useState } from 'react';

type LocationState = {
  region: string; // e.g., "United States", "Europe"
  timeZone: string; // "America/New_York"
  isLocating: boolean;
};

const LocationContext = createContext<LocationState>({
  region: 'Global',
  timeZone: 'UTC',
  isLocating: false,
});

export const useLocation = () => useContext(LocationContext);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<LocationState>({
    region: 'Global',
    timeZone: 'UTC',
    isLocating: true,
  });

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let region = 'Global';

        // Infer broad region from timezone for content tailoring
        if (timeZone.includes('America')) region = 'North America';
        else if (timeZone.includes('Europe')) region = 'Europe';
        else if (timeZone.includes('Asia')) region = 'Asia';
        else if (timeZone.includes('Africa')) region = 'Africa';
        else if (timeZone.includes('Australia')) region = 'Australia';

        // In a real app, you might use an IP API here, but Timezone is robust and privacy-friendly.
        
        setState({ region, timeZone, isLocating: false });
      } catch (e) {
        console.warn('Location detection failed', e);
        setState({ region: 'Global', timeZone: 'UTC', isLocating: false });
      }
    };

    detectLocation();
  }, []);

  return (
    <LocationContext.Provider value={state}>
      {children}
    </LocationContext.Provider>
  );
};
