import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorMessage from 'components/ErrorMessage';
import EntityItem from './EntityItem';


class EntityList extends React.Component {
  render() {
    const { data: { loading, error, items = [] }, renderItem } = this.props;

    if (error) return <ErrorMessage message="Error loading data." />;

    if (!items && loading) {
      return (
        <div className="loading">
          <CircularProgress />
          <Typography style={{ paddingTop: '1rem' }}>
            Loading...
          </Typography>
          <style jsx>
            {`
              .loading {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 3rem;
                flex-direction: column;
              }
            `}
          </style>
        </div>
      );
    }

    return (
      <section>
        <div className="item-list">
          {[...items].reverse().map(item =>
            <div key={item._id} className="item">
              <EntityItem item={item}>
                {renderItem(item)}
              </EntityItem>
            </div>,
          )}
        </div>
        <style jsx>
          {`
            .item-list {
              display: flex;
              flex-wrap: wrap;
              margin-top: 1rem;
            }
            .item {
              width: 100%;
              display: flex;
              margin-top: 2rem;
            }

            @media (min-width: 800px) {
              .item {
                width: calc(50% - 2rem);
                margin-rigth: 2rem;
              }
            }

            @media (min-width: 1200px) {
              .item {
                width: calc(33% - 2rem);
                margin-rigth: 2rem;
              }
            }

            @media (min-width: 1600px) {
              .item {
                width: calc(25% - 2rem);
                margin-right: 2rem;
              }
            }
          `}
        </style>
      </section>
    );
  }
}

export default EntityList;
