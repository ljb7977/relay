/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @oncall relay
 *
 * @generated SignedSource<<de6b523b80f1c9eaf9156c5a20a5b336>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ClientRequest, ClientQuery } from 'relay-runtime';
import type { LiveState } from "relay-runtime/store/experimental-live-resolvers/LiveResolverStore";
import type { TodoDescription____relay_model_instance$data } from "./../../../relay-runtime/store/__tests__/resolvers/__generated__/TodoDescription____relay_model_instance.graphql";
import {live_todo_description as queryLiveTodoDescriptionResolver} from "../../../relay-runtime/store/__tests__/resolvers/TodoModel.js";
// Type assertion validating that `queryLiveTodoDescriptionResolver` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(queryLiveTodoDescriptionResolver: (
  args: {|
    todoID: string,
  |}, 
) => LiveState<?Query__live_todo_description$normalization['__relay_model_instance']>);
import {color as todoDescriptionColorResolver} from "../../../relay-runtime/store/__tests__/resolvers/TodoDescription.js";
// Type assertion validating that `todoDescriptionColorResolver` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(todoDescriptionColorResolver: (
  __relay_model_instance: TodoDescription____relay_model_instance$data['__relay_model_instance'], 
) => mixed);
import {text as todoDescriptionTextResolver} from "../../../relay-runtime/store/__tests__/resolvers/TodoDescription.js";
// Type assertion validating that `todoDescriptionTextResolver` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(todoDescriptionTextResolver: (
  __relay_model_instance: TodoDescription____relay_model_instance$data['__relay_model_instance'], 
) => ?string);
import type { Query__live_todo_description$normalization } from "./../../../relay-runtime/store/__tests__/resolvers/__generated__/Query__live_todo_description$normalization.graphql";
export type RelayResolverModelTestWeakLiveFieldQuery$variables = {|
  id: string,
|};
export type RelayResolverModelTestWeakLiveFieldQuery$data = {|
  +live_todo_description: ?{|
    +color: ?$Call<<R>((...empty[]) => R) => R, typeof todoDescriptionColorResolver>,
    +text: ?string,
  |},
|};
export type RelayResolverModelTestWeakLiveFieldQuery = {|
  response: RelayResolverModelTestWeakLiveFieldQuery$data,
  variables: RelayResolverModelTestWeakLiveFieldQuery$variables,
|};
*/

var node/*: ClientRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "todoID",
    "variableName": "id"
  }
],
v2 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "TodoDescription____relay_model_instance"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": {
      "hasClientEdges": true
    },
    "name": "RelayResolverModelTestWeakLiveFieldQuery",
    "selections": [
      {
        "kind": "ClientEdgeToClientObject",
        "concreteType": "TodoDescription",
        "backingField": {
          "alias": null,
          "args": (v1/*: any*/),
          "fragment": null,
          "kind": "RelayLiveResolver",
          "name": "live_todo_description",
          "resolverModule": require('relay-runtime/experimental').weakObjectWrapperLive(require('./../../../relay-runtime/store/__tests__/resolvers/TodoModel').live_todo_description, '__relay_model_instance', false),
          "path": "live_todo_description",
          "normalizationInfo": {
            "concreteType": "TodoDescription",
            "plural": false,
            "normalizationNode": require('./../../../relay-runtime/store/__tests__/resolvers/__generated__/Query__live_todo_description$normalization.graphql')
          }
        },
        "linkedField": {
          "alias": null,
          "args": (v1/*: any*/),
          "concreteType": "TodoDescription",
          "kind": "LinkedField",
          "name": "live_todo_description",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*: any*/),
              "kind": "RelayResolver",
              "name": "text",
              "resolverModule": require('relay-runtime/experimental').resolverDataInjector(require('./../../../relay-runtime/store/__tests__/resolvers/__generated__/TodoDescription____relay_model_instance.graphql'), require('./../../../relay-runtime/store/__tests__/resolvers/TodoDescription').text, '__relay_model_instance', false),
              "path": "text"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*: any*/),
              "kind": "RelayResolver",
              "name": "color",
              "resolverModule": require('relay-runtime/experimental').resolverDataInjector(require('./../../../relay-runtime/store/__tests__/resolvers/__generated__/TodoDescription____relay_model_instance.graphql'), require('./../../../relay-runtime/store/__tests__/resolvers/TodoDescription').color, '__relay_model_instance', false),
              "path": "color"
            }
          ],
          "storageKey": null
        }
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelayResolverModelTestWeakLiveFieldQuery",
    "selections": [
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "name": "live_todo_description",
            "args": (v1/*: any*/),
            "fragment": null,
            "kind": "RelayResolver",
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "20a23dad2084a9bb9138f137a764c9e4",
    "id": null,
    "metadata": {},
    "name": "RelayResolverModelTestWeakLiveFieldQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "e3e60c655cd9eed2036fe61aa72f4402";
}

module.exports = ((node/*: any*/)/*: ClientQuery<
  RelayResolverModelTestWeakLiveFieldQuery$variables,
  RelayResolverModelTestWeakLiveFieldQuery$data,
>*/);