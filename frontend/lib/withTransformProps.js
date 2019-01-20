import React from 'react';

export const withTransformProps = mapper => Component =>
  class WithTransformProps extends React.Component {
    render() {
      return (
        <Component
          // TODO - memoize results of mapper...
          {...mapper(this.props)}
        />
      );
    }
  };

export default withTransformProps;
