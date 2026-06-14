import { useState, useEffect } from 'react';

interface BuildInfo {
  buildTimestamp: string;
  lastUpdated: string;
}

const LastUpdated = () => {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetch('/build-info.json')
      .then((response) => response.json())
      .then((data: BuildInfo) => {
        setLastUpdated(new Date(data.lastUpdated));
      })
      .catch((error) => {
        console.error('Error fetching build info:', error);
        setLastUpdated(new Date());
      });
  }, []);

  if (!lastUpdated) {
    return null;
  }

  const formattedDate = lastUpdated.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="pb-2 text-center text-sm text-muted">
      <p>Last updated: {formattedDate}</p>
    </div>
  );
};

export default LastUpdated;
