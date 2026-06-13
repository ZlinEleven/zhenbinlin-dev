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

  const formatDate = (date: Date | null) => {
    if (!date) return 'Loading...';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="text-center text-sm text-muted pb-2">
      <p>Last updated: {formatDate(lastUpdated)}</p>
    </div>
  );
};

export default LastUpdated;
