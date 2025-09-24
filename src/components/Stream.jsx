import React from 'react';

const Stream = () => {
  const channelId = 'UCmgz9mlNXUXw44-F8zWYDew'; // Ganti dengan channelId dari channel YouTube kamu

  return (
    <div
      id="Stream"
      style={{
        position: 'relative',
        paddingTop: '56.25%',
        height: 0,
        overflow: 'hidden',
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="YouTube Live Stream"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default Stream;
