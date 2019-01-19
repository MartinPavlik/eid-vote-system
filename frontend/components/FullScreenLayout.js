// @flow
import * as React from 'react';

type PropsType = {
  children: React.Element<any>
};

const FullScreenLayout = ({
  children,
  centered,
}: PropsType): React.Node => (
  <React.Fragment>
    <style jsx>{
      `
        .container {
          display: flex;
          flex: 1;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          align-items: ${centered ? 'center' : 'unset'}
        }
      `
    }
    </style>
    <div className="container">
      {children}
    </div>
  </React.Fragment>
);

FullScreenLayout.defaultProps = {
};

export default FullScreenLayout;
