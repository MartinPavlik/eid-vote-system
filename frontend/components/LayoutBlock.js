import React from 'react';

export const LayoutBlock = ({ children }) =>
  <div className="layout-block">
    {children}
    <style jss>
      {`
        .layout-block {
          margin: 2rem 0;
        }
      `}
    </style>
  </div>;

export default LayoutBlock;
