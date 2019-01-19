import * as React from 'react';
import fMap from 'lodash/fp/map';
import PropTypes from 'prop-types';
import fIsEmpty from 'lodash/fp/isEmpty';
import fLast from 'lodash/fp/last';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'components/Link';


const styles = (theme) => ({
  base: {
    display: 'block',
    margin: '-2rem -2rem 1rem',
    padding: '1rem 2rem',
    background: 'white',
  },
  breadcrumbs: {
    marginTop: theme.spacing.unit / 2,
  },
  breadcrumb: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing.unit / 2,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  divider: {
    marginRight: theme.spacing.unit / 2,
    color: theme.palette.grey[600],
  },
});


const LayoutHeader = ({ title, classes, breadcrumbs }) => (
  <div className={classes.base}>
    <Typography variant="headline">
      {title}
    </Typography>
    {!fIsEmpty(breadcrumbs) &&
      <div className={classes.breadcrumbs}>
        {fMap(
          breadcrumb => {
            return (
              <React.Fragment key={breadcrumb.href}>
                <Link href={breadcrumb.href} className={classes.breadcrumb}>
                  {breadcrumb.title}
                </Link>
                {
                  fLast(breadcrumbs) !== breadcrumb &&
                    <span className={classes.divider}> / </span>
                }
              </React.Fragment>
            );
          },
        )(breadcrumbs)}
      </div>
    }
  </div>
);

LayoutHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
  })),
};

LayoutHeader.defaultProps = {
  title: null,
  breadcrumbs: [],
};

export default withStyles(styles)(LayoutHeader);
