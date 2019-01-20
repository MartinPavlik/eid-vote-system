import * as React from 'react';
import { any, curry } from 'ramda';
import { withRouter } from 'next/router';
import { Router } from 'routes';
import classNames from 'classnames';


const isLinkActive = curry((router, href, alternativeExactPaths = []) =>
  router.asPath.indexOf(href) === 0 || any(p => router.asPath === p, alternativeExactPaths),
);

const Link = ({
  router, children, href, activeClassName, className, alternativeExactPaths = [], ...props
}) => {
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        Router.pushRoute(href);
      }}
      href={href}
      className={classNames(className, {
        [activeClassName]: isLinkActive(router, href, alternativeExactPaths),
      })}
      {...props}
    >
      {children}
    </a>
  );
};

export default withRouter(Link);
