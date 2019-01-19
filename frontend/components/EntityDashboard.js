import * as React from 'react';
import { graphql, withApollo, compose } from 'react-apollo';
import ErrorMessage from 'components/ErrorMessage';
import Link from 'components/Link';
import BasicFormInPopover from 'components/Form/BasicFormInPopover';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

class FileList extends React.Component<PropsType, StateType> {
  render() {
    const { data: { loading, error, Scenes }, onCreate } = this.props;

    if (error) return <ErrorMessage message="Error loading data." />;

    if (!Scenes && loading) {
      return 'Loading...';
    }

    return (
      <section>
        <BasicFormInPopover
          fields={[
            {
              name: 'name',
              type: 'text',
              validate: () => true,
              label: 'Name',
            },
          ]}
          onSubmit={onCreate}
          submitButtonText="Create scene"
          triggerButtonText="Create scene"
        />
        <div className="file-list">
          {[...Scenes].reverse().map((scene) =>
            (
              <div key={scene._id} className="file">
                <Card>
                  <CardHeader title={scene.name} />
                  <CardContent>
                    todo - preview here
                  </CardContent>
                  <CardActions>
                    <Button component={Link} href={`/scenes/${scene._id}`} flat>
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ))
          }
        </div>
        <style jsx>
          {`
            .file-list {
              display: flex;
              flex-wrap: wrap;
              margin-top: 1rem;
            }
            .file {
              width: calc(33.3% - 2rem);
              display: flex;
              margin: 0 2rem 2rem 0;
            }
          `}
        </style>
      </section>
    );
  }
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (FileList)
export default (query, mutation, fields, renderItem) =>
  compose(
    withApollo,
    graphql(query, {
      options: {
        variables: {},
      },
      props: ({ data }) => ({
        data,
        renderItem,
        fields,
      }),
    }),
    graphql(mutation, {
      props: ({ mutate }) => ({
        onCreate: sceneInput => mutate({
          variables: { input: sceneInput },
          update: (proxy, { data: { updateScene } }) => {
            // Read the data from our cache for this query.
            const data = proxy.readQuery({ query });

            // Add our todo from the mutation to the end.
            data.Scenes.push(updateScene);

            // Write our data back to the cache.
            proxy.writeQuery({ query, data });
          },
        }),
      }),
    }),
  )(FileList);
