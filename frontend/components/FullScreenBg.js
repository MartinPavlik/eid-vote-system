import React from 'react';

const FullScreenBg = ({ url }) => (
  <style jsx global>
    {`
      body {
        background-image: url(${url});
        background-size: cover;
      }
    `}
  </style>
);

export default FullScreenBg;
