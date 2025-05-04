import React from 'react';

const YouTubeLive = () => {
  const videoId = 'NXnHKOhZmfU'; // Ganti dengan ID livestream YouTube kamu

  return (
    <div style={{ position: 'relative', paddingTop: '56.25%', height: 0, overflow: 'hidden' }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
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

export default YouTubeLive;
