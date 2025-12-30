import React, { useState, useEffect } from 'react';

const LastUpdated = () => {
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        // Fetch build timestamp from the generated file
        fetch('/build-info.json')
            .then(response => response.json())
            .then(data => {
                setLastUpdated(new Date(data.lastUpdated));
            })
            .catch(error => {
                console.error('Error fetching build info:', error);
                // Fallback to current date if fetch fails
                setLastUpdated(new Date());
            });
    }, []);

    const formatDate = (date) => {
        if (!date) return 'Loading...';
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className='text-center text-sm text-[#8892b0] mt-4'>
            <p>Last updated: {formatDate(lastUpdated)}</p>
        </div>
    );
};

export default LastUpdated;