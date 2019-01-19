import { connect } from 'react-redux';


export const withTransformProps = transformProps => connect(
  null,
  undefined,
  (stateProps, dispatchProps, ownProps) => transformProps(ownProps),
);

export default withTransformProps;
