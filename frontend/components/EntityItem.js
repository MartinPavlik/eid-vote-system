import * as React from 'react';
import { isOptimistic } from 'lib/apolloHelpers';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const OptimisticOverlay = () =>
  <div className="overlay">
    <CircularProgress />
    <Typography style={{ marginTop: '1rem' }}>
      Loading...
    </Typography>
    <style jsx>
      {`
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255,255,255,0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          z-index: 999;
        }
      `}
    </style>
  </div>;

const EntityItem = ({ item, children }) =>
  <div className="entity-item">
    {isOptimistic(item) && <OptimisticOverlay />}
    {children}
    <style jsx>
      {`
        .entity-item {
          width: 100%;
          position: relative;
          overflow: ${isOptimistic(item) ? 'hidden' : 'unset'};
          animation-name: fadeIn;
          animation-duration: 0.33s;
          animation-timing-function: ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1, 1);}
          to { opacity: 1; transform: scale(1, 1); }
        }
      `}
    </style>
  </div>;

export default EntityItem;
