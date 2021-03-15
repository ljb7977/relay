---
id: graphql-mutations
title: GraphQL Mutations
slug: /guided-tour/updating-data/graphql-mutations/
---

import DocsRating from '@site/src/core/DocsRating';
import {OssOnly, FbInternalOnly} from 'internaldocs-fb-helpers';

In GraphQL, data in the server is updated using [GraphQL Mutations](https://graphql.org/learn/queries/#mutations). Mutations are *read-write* server operations, which both modify data in the backend, and allow querying for the modified data from the server in the same request.


## Writing Mutations

A GraphQL mutation looks very similar to a query, with the exception that it uses the `mutation` keyword:

```graphql
mutation FeedbackLikeMutation($input: FeedbackLikeData!) {
  feedback_like(data: $input) {
    feedback {
      id
      viewer_does_like
      like_count
    }
  }
}
```

* The mutation above modifies the server data to "like" the specified `Feedback` object. `feedback_like` is a *mutation root field* (or just *mutation field*), which takes specific input and will be processed by the server to update the relevant data in the backend.
* A mutation is handled in two separate steps: first, the update is processed on the server, and then the query is executed. This ensures that you only see data that has already been updated as part of your mutation response.
* The mutation field (in this case, `feedback_like`) returns a specific GraphQL type which exposes the data for which we can query in the mutation response.

<FbInternalOnly>

* The fields you can access on the mutation field are not automatically the same fields you can access in a regular query. [It is a best practice](https://fb.workplace.com/groups/644933736023601/?multi_permalinks=823422684841371) to include the `viewer` object and all updated Ents as part of the mutation response.

</FbInternalOnly>

<OssOnly>

* The fields you can access on the mutation field are not automatically the same fields you can access in a regular query. It is a best practice to include the `viewer` object and all updated entities as part of the mutation response.

</OssOnly>

* In this case, we're querying for the *updated* feedback object, including the updated `like_count` and the updated value for `viewer_does_like`, indicating if the current viewer likes the feedback object.

<FbInternalOnly>

* Check out the [Hack documentation on writing mutations](https://www.internalfb.com/intern/wiki/Graphql-for-hack-developers/mutation-root-fields/) for information on how to add a mutation field to your back-end code.

</FbInternalOnly>

An example of a successful response for the above mutation could look like this:

```json
{
  "feedback_like": {
    "feedback": {
      "id": "feedback-id",
      "viewer_does_like": true,
      "like_count": 1,
    }
  }
}
```


In Relay, we can declare GraphQL mutations using the `graphql` tag too:

```js
const {graphql} = require('react-relay');

const feedbackLikeMutation = graphql`
  mutation FeedbackLikeMutation($input: FeedbackLikeData!) {
    feedback_like(data: $input) {
      feedback {
        id
        viewer_does_like
        like_count
      }
    }
  }
`;
```

* Note that mutations can also reference GraphQL [variables](../../rendering/variables/) in the same way queries or fragments do.


In order to *execute* a mutation against the server in Relay, we can use the `commitMutation` and [useMutation](../../../api-reference/use-mutation) APIs. Let's take a look at an example using the `commitMutation` API:

```js
import type {Environment} from 'react-relay';
import type {FeedbackLikeData, FeedbackLikeMutation} from 'FeedbackLikeMutation.graphql';

const {commitMutation, graphql} = require('react-relay');

function commitFeedbackLikeMutation(
  environment: Environment,
  input: FeedbackLikeData,
) {
  return commitMutation<FeedbackLikeMutation>(environment, {
    mutation: graphql`
      mutation FeedbackLikeMutation($input: FeedbackLikeData!) {
        feedback_like(data: $input) {
          feedback {
            id
            viewer_does_like
            like_count
          }
        }
      }
    `,
    variables: {input},
    onCompleted: response => {} /* Mutation completed */,
    onError: error => {} /* Mutation errored */,
  });
}

module.exports = {commit: commitFeedbackLikeMutation};
```

Let's distill what's happening here:

* `commitMutation` takes an environment, the `graphql` tagged  mutation, and the variables to use for sending the mutation request to the server.
* Note that the `input` for the mutation can be Flow typed with the autogenerated type available from the *`FeedbackLikeMutation.graphql`* module. In general, the Relay will generate Flow types for mutations at build time, with the following naming format: `*<mutation_name>*.graphql.js`.
* Note that `variables`, `response` in `onCompleted`, and `optimisticResponse` will be typed by providing a single autogenerated type, such as `FeedbackLikeMutation` from the `FeedbackLikeMutation.graphql` module.
* To also strongly type the `optimisticResponse` field, a `@raw_response_type` directive should be added to the mutation query root.
* `commitMutation` also takes `onCompleted` and `onError` callbacks, which will be called when the request completes successfully or when an error occurs, respectively.
* When the mutation response is received, any objects in the mutation response with `id` fields that match records in the local store will *automatically* be updated with the new field values from the response. In this case, it would automatically find the existing `Feedback` object matching the given id in the store, and update the values for its `viewer_does_like` and `like_count` fields.
* Note that any local data updates caused by the mutation will automatically cause components subscribed to the data to be notified of the change and re-render.

## Updating data once a request is complete

There are four ways in which store data is updated when a request is complete:

* If a field is queried from within the mutation field and includes an id field, that record in the local store will automatically be updated with the new values from the response. In the example, because the query includes `feedback` and `id`, Relay will find the existing `Feedback` object that matches the given ID in the store, and update the values for its `viewer_does_like` and `like_count` fields.
    * Note that instead of refetching a fragment after a mutation completes, you can often spread the fragment into the mutation response in order to update the fragment's data as part of the same request.
* If a field is queried from within the mutation field and includes an id field which has the `@deleteRecord` directive, that field will be removed from the store.
* If an edge field is queried from within the mutation field and includes the `@prependEdge` or `@appendEdge` directives, that edge will be prepended or appended to a connection, respectively.
* Lastly, for all updates not covered by the previous three bullet points, updater functions give you full control over how the data in the local store is updated when the request completes.

See the [order of execution section](#order-of-execution-of-updater-functions) for information on what happens when Relay encounters multiple ways to update the data in the store.

## Updater functions

If the updates you wish to perform on the local data are more complex than just updating the values of fields and cannot be handled by the declarative mutation directives, you can provide an `updater` function to `commitMutation` or `useMutation` for full control over how to update the store:

```js
import type {Environment} from 'react-relay';
import type {CommentCreateData, CreateCommentMutation} from 'CreateCommentMutation.graphql';

const {commitMutation, graphql} = require('react-relay');
const {ConnectionHandler} = require('relay-runtime');

function commitCommentCreateMutation(
  environment: Environment,
  feedbackID: string,
  input: CommentCreateData,
) {
  return commitMutation<CreateCommentMutation>(environment, {
    mutation: graphql`
      mutation CreateCommentMutation($input: CommentCreateData!) {
        comment_create(input: $input) {
          comment_edge {
            cursor
            node {
              body {
                text
              }
            }
          }
        }
      }
    `,
    variables: {input},
    onCompleted: () => {},
    onError: error => {},
    updater: store => {
      const feedbackRecord = store.get(feedbackID);

      // Get connection record
      const connectionRecord = ConnectionHandler.getConnection(
        feedbackRecord,
        'CommentsComponent_comments_connection',
      );

      // Get the payload returned from the server
      const payload = store.getRootField('comment_create');

      // Get the edge inside the payload
      const serverEdge = payload.getLinkedRecord('comment_edge');

      // Build edge for adding to the connection
      const newEdge = ConnectionHandler.buildConnectionEdge(
        store,
        connectionRecord,
        serverEdge,
      );

      // Add edge to the end of the connection
      ConnectionHandler.insertEdgeAfter(
        connectionRecord,
        newEdge,
      );
    },
  });
}

module.exports = {commit: commitCommentCreateMutation};
```

Let's distill this example:

* `updater` takes a *`store`* argument, which is an instance of a [`RecordSourceSelectorProxy`](../../../api-reference/store/);  this interface allows you to *imperatively* write and read data directly to and from the Relay store. This means that you have full control over how to update the store in response to the mutation response: you can *create entirely new records*, or *update or delete existing ones*.
* In our specific example, we're adding a new comment to our local store after it has successfully been added on the server. Specifically, we're adding a new item to a connection; for more details on the specifics of how that works, check out our section on [adding and removing items from a connection](../../list-data/updating-connections/).
    * There is no need for an updater in this example — it would be a great place to use the `@appendEdge` directive instead!
* Note that the mutation response is a *root field* record that can be read from the `store`, specifically using the `store.getRootField` API. In our case, we're reading the `comment_create` root field, which is a root field in the mutation response.
* Note that the `root` field of the mutation is different from the `root` of queries, and `store.getRootField` in the mutation updater can only get the record from the mutation response. To get records from the root that's not in the mutation response, use `store.getRoot().getLinkedRecord` instead.
* Note that any local data updates caused by the mutation `updater` will automatically cause components subscribed to the data to be notified of the change and re-render.

## Optimistic updates

Oftentimes, we don't want to wait for the server response to complete before we respond to user interaction. For example, if a user clicks the "Like" button, we don't want to wait until the mutation response comes back before we show them that the post has been liked; ideally, we'd do that instantly.

More generally, in these cases we want to immediately ** update our local data *optimistically,* in order to improve perceived responsiveness; that is, we want to update our local data to immediately reflect what it would look like after the mutation *succeeds*. If the mutation ends up *not* succeeding, we can roll back the change and show an error message, but we're *optimistically* expecting the mutation to succeed most of the time.

In order to do this, Relay provides two APIs to specify an optimistic update when executing a mutation:

### Optimistic Response

When you can predict what the server response for a mutation is going to be, the simplest way to optimistically update the store is by providing an `optimisticResponse` to `commitMutation`:

```js
import type {Environment} from 'react-relay';
import type {FeedbackLikeData, FeedbackLikeMutation} from 'FeedbackLikeMutation.graphql';

const {commitMutation, graphql} = require('react-relay');

function commitFeedbackLikeMutation(
  environment: Environment,
  feedbackID: string,
  input: FeedbackLikeData,
) {
  return commitMutation<FeedbackLikeMutation>(environment, {
    mutation: graphql`
      mutation FeedbackLikeMutation($input: FeedbackLikeData!)
        @raw_response_type {
        feedback_like(data: $input) {
          feedback {
            id
            viewer_does_like
          }
        }
      }
    `,
    variables: {input},
    optimisticResponse: {
      feedback_like: {
        feedback: {
          id: feedbackID,
          viewer_does_like: true,
        },
      },
    },
    onCompleted: () => {} /* Mutation completed */,
    onError: error => {} /* Mutation errored */,
  });
}

module.exports = {commit: commitFeedbackLikeMutation};
```

Let's see what's happening in this example.

* The `optimisticResponse` is an object matching the shape of the mutation response, and it simulates a successful response from the server. When `optimisticResponse`, is provided, Relay will automatically process the response in the same way it would process the response from the server, and update the data accordingly (i.e. update the values of fields for the record with the matching id).
    * In this case, we would immediately set the `viewer_does_like` field to `true` in our `Feedback` object, which would be immediately reflected in our UI.
* If the mutation *succeeds*, *the optimistic update will be rolled back,* and the server response will be applied.
* If the mutation *fails*, *the optimistic update will be rolled back,* and the error will be communicated via the `onError` callback.
* Note that by adding `@raw_response_type` directive,  the type for `optimisticResponse` is generated.

### Optimistic updater

However, in some cases we can't statically predict what the server response will be, or we need to optimistically perform more complex updates, like deleting or creating new records, or [adding and removing items from a connection](../../list-data/updating-connections/). In these cases we can provide an `optimisticUpdater` function to `commitMutation`. For example, in addition to setting `viewer_does_like` to true, we can increment the `like_count` field by using an `optimisticUpdater` instead of an `optimisticResponse`:

```js
import type {Environment} from 'react-relay';
import type {FeedbackLikeData} from 'FeedbackLikeMutation.graphql';

const {commitMutation, graphql} = require('react-relay');

function commitFeedbackLikeMutation(
  environment: Environment,
  feedbackID: string,
  input: FeedbackLikeData,
) {
  return commitMutation(environment, {
    mutation: graphql`
      mutation FeedbackLikeMutation($input: FeedbackLikeData!) {
        feedback_like(data: $input) {
          feedback {
            id
            like_count
            viewer_does_like
          }
        }
      }
    `,
    variables: {input},
    optimisticUpdater: store => {
      // Get the record for the Feedback object
      const feedbackRecord = store.get(feedbackID);

      // Read the current value for the like_count
      const currentLikeCount = feedbackRecord.getValue('like_count');

      // Optimistically increment the like_count by 1
      feedbackRecord.setValue((currentLikeCount ?? 0) + 1, 'like_count');

      // Optimistically set viewer_does_like to true
      feedbackRecord.setValue(true, 'viewer_does_like');
    },
    onCompleted: () => {} /* Mutation completed */,
    onError: error => {} /* Mutation errored */,
  });
}

module.exports = {commit: commitFeedbackLikeMutation};
```

Let's see what's happening here:

* The `optimisticUpdater` has the same signature and behaves the same way as the regular `updater` function, the main difference being that it will be executed immediately, before the mutation response completes.
* If the mutation succeeds, *the optimistic update will be rolled back,* and the server response will be applied.
    * Note that if we used an `optimisticResponse`, we wouldn't able to statically provide a value for `like_count`, since it requires reading the current value from the store first, which we can do with an `optimisticUpdater`.
    * Also note that when mutation completes, the value from the server might differ from the value we optimistically predicted locally. For example, if other "Likes" occurred at the same time, the final `like_count` from the server might've incremented by more than 1.
* If the mutation *fails*, *the optimistic update will be rolled back,* and the error will be communicated via the `onError` callback.
* Note that we're not providing an `updater` function, which is okay. If it's not provided, the default behavior will still be applied when the server response arrives (i.e. merging the new field values for `like_count` and `viewer_does_like` on the `Feedback` object).



:::note
Remember that any updates to local data caused by a mutation will automatically notify and re-render components subscribed to that data.
:::


## Order of execution of updater functions

In general, execution of the `updater` and optimistic updates will occur in the following order:

* If an `optimisticResponse` is provided, Relay will use it to merge the new field values for the records that match the ids in the `optimisticResponse`.
* If an `optimisticUpdater` is provided, Relay will execute it and update the store accordingly.
* If an `optimisticResponse` was provided, the declarative mutation directives `@deleteRecord`, `@appendEdge` and `@prependEdge` will be processed on the optimistic response.
* If the mutation request succeeds:
    * Any optimistic update that was applied will be rolled back.
    * Relay will use the server response to merge the new field values for the records that match the ids in the response.
    * If an `updater` was provided, Relay will execute it and update the store accordingly. The server payload will be available to the `updater` as a root field in the store.
    * Relay will process any `@deleteRecord`, `@appendEdge` and `@prependEdge` declarative mutation directives.
* If the mutation request fails:
    * Any optimistic update was applied will be rolled back.
    * The `onError` callback will be called.


### Full example

This means that in more complicated scenarios you can still provide many options: `optimisticResponse`, `optimisticUpdater` and `updater`. For example, the mutation to add a new comment could like something like the following (for full details on updating connections, check out our [Updating Connections](../../list-data/updating-connections/) guide):

```js
import type {Environment} from 'react-relay';
import type {CommentCreateData, CreateCommentMutation} from 'CreateCommentMutation.graphql';

const {commitMutation, graphql} = require('react-relay');
const {ConnectionHandler} = require('relay-runtime');

function commitCommentCreateMutation(
  environment: Environment,
  feedbackID: string,
  input: CommentCreateData,
) {
  return commitMutation<CreateCommentMutation>(environment, {
    mutation: graphql`
      mutation CreateCommentMutation($input: CommentCreateData!) {
        comment_create(input: $input) {
          feedback {
            id
            viewer_has_commented
          }
          comment_edge {
            cursor
            node {
              body {
                text
              }
            }
          }
        }
      }
    `,
    variables: {input},
    onCompleted: () => {},
    onError: error => {},

    // Optimistically set the value for `viewer_has_commented`
    optimisticResponse: {
      feedback: {
        id: feedbackID,
        viewer_has_commented: true,
      },
    },

    // Optimistically add a new comment to the comments connection
    optimisticUpdater: store => {
      const feedbackRecord = store.get(feedbackID);
      const connectionRecord = ConnectionHandler.getConnection(
        userRecord,
        'CommentsComponent_comments_connection',
      );

      // Create a new local Comment from scratch
      const id = `client:new_comment:${randomID()}`;
      const newCommentRecord = store.create(id, 'Comment');

      // ... update new comment with content

      // Create new edge from scratch
      const newEdge = ConnectionHandler.createEdge(
        store,
        connectionRecord,
        newCommentRecord,
        'CommentEdge' /* GraphQl Type for edge */,
      );

      // Add edge to the end of the connection
      ConnectionHandler.insertEdgeAfter(connectionRecord, newEdge);
    },
    updater: store => {
      const feedbackRecord = store.get(feedbackID);
      const connectionRecord = ConnectionHandler.getConnection(
        userRecord,
        'CommentsComponent_comments_connection',
      );

      // Get the payload returned from the server
      const payload = store.getRootField('comment_create');

      // Get the edge from server payload
      const newEdge = payload.getLinkedRecord('comment_edge');

      // Add edge to the end of the connection
      ConnectionHandler.insertEdgeAfter(connectionRecord, newEdge);
    },
  });
}

module.exports = {commit: commitCommentCreateMutation};
```

Let's distill this example, according to the execution order of the updaters:

* Given that an `optimisticResponse` was provided, it will be executed *first*. This will cause the new value of `viewer_has_commented` to be merged into the existing `Feedback` object, setting it to `true`.
* Given that an `optimisticUpdater` was provided, it will be executed next. Our `optimisticUpdater` will create new comment and edge records from scratch, simulating what the new edge in the server response would look like, and then add the new edge to the connection.
* When the optimistic updates conclude, components subscribed to this data will be notified.
* When the mutation succeeds, all of our optimistic updates will be rolled back.
* The server response will be processed by relay, and this will cause the new value of `viewer_has_commented` to be merged into the existing `Feedback` object, setting it to `true`.
* Finally, the `updater` function we provided will be executed. The `updater` function is very similar to the `optimisticUpdater` function, however, instead of creating the new data from scratch, it reads it from the mutation payload and adds the new edge to the connection.


## Invalidating data during a mutation

The recommended approach when executing a mutation is to request *all* the relevant data that was affected by the mutation back from the server (as part of the mutation body), so that our local Relay store is consistent with the state of the server.

However, often times it can be unfeasible to know and specify all the possible data the possible data that would be affected for mutations that have large rippling effects (e.g. imagine "blocking a user" or "leaving a group").

For these types of mutations, it's often more straightforward to explicitly mark some data as stale (or the whole store), so that Relay knows to refetch it the next time it is rendered. In order to do so, you can use the data invalidation APIs documented in our [Staleness of Data section](../../reusing-cached-data/staleness-of-data/).

## Mutation queueing

> TBD: Left to be implemented in user space





<DocsRating />