// @flow
import * as React from 'react';

type PropType = {
  message: string | React.Node
};

export default ({ message }: PropType): React.Node => (
  <aside>
    {message}
    <style jsx>{`
        aside {
          padding: 1.5em;
          font-size: 14px;
          color: white;
          background-color: red;
        }
      `}
    </style>
  </aside>
);
