import { getAuthorizedUser } from '../components/jwt';

const withAuth = (handler) =>
  async (parent, args, context, info) => {
    const { user } = context;
    if (user) {
      // Looks like user was already injected...
      return handler(parent, args, context, info);
    }
    // console.log('with auth / req: ', context);
    try {
      // console.log('context: ', context); // eslint-disable-line
      console.log('withAuth: context.authToken: ', context.authToken); // eslint-disable-line
      const currentUser = await getAuthorizedUser(context.authToken);
      console.log('withAuth: currentUser: ', currentUser); // eslint-disable-line
      return handler(
        parent,
        args,
        { ...context, user: currentUser },
        info,
      );
    } catch (e) {
      console.log('withAuth error: ', e); // eslint-disable-line
      // Not interested in the error anyway
    }

    throw new Error('Not authorized');
  };

export default withAuth;
