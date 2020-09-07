---
author: "Andryo Marzuki"
title: "React State Management With Redux (and More)"
date: "2020-07-05"
description: "A comprehensive tutorial on using Redux, Thunk, Immer, Redux Persist with React to have more robust state management."
tags: [
    "ReactJS", "TypeScript", "Redux"
]
---

`ReactJS` is an awesome library to use for frontends. It's super fast to use when you want to get a really interactive and intuitive application up and running.

`ReactJS` comes prepackaged with its own way to manage state locally within a component. When the value within a state needs to be shared with other components, it is passed down through usage of `props`. The stored value can be mutated within lower level components with usage using callback functions. In essence, using `ReactJS` prepackaged state system allows you to asynchronously write and read values from various components at different depths of the application.

I then like to pair `redux-react` with `redux-thunk`, `immer` and `redux-persist`.

* `redux-thunk` is middleware which will greatly expand the capability of the `redux-react` state by allowing the use of asynchronous logic and actions.
* `immer` will allow us to take advantage of immutability, in particular we'll make our `redux-react` state immutable.
* `redux-persist` will allow us to persist in our state.

__Note__: This article's code samples are in `TypeScript`. If you use `JavaScript`, you'll need to adjust it accordingly.

## Redux

The clear downside of using `redux-react` is the corresponding code overhead which is attached to implement it, you'll need to have the following elements in your store (or sub-stores):

1. Types
2. State
3. Reducer
4. Actions
5. Selector

In general, you'll have multiple 'sub-stores' mapped into one state. As your application reaches a certain size, it becomes almost a necessity to split out your stores to avoid cluttered code.

Luckily, this is easily achievable by using `combineReducers()` to combine our reducers and a `RootState` to map out our relevant states.

### Folder Structure

I normally create a `store` folder in my application root to contain all its various sub-stores.

```
store/
    users/
        index.ts
        actions.ts
        selectors.ts
        reducers.ts
        state.ts
        types.ts
    types.ts
    state.ts
    index.ts
```

### Types

For our store's types, we will need to define a basic type and a corresponding action. In general, my actions are categorized into three segments:

1. Request
2. Response
3. Failure

With this in mind, we start by defining our types as such:

```typescript
// store/users/types.ts

export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST';
export const AUTHENTICATE_RESPONSE = 'AUTHENTICATE_RESPONSE';
export const AUTHENTICATE_FAILED = 'AUTHENTICATE_FAILED';
```

Next, we need to define the corresponding action types which will specify which type to use, and what payload should be expected.

```typescript
// store/users/types.ts

export interface AuthenticateRequestAction {
    type: typeof AUTHENTICATE_REQUEST;
    payload: {
        username: string;
        password: string;
    }
};

export interface AuthenticateResponseAction {
    type: typeof AUTHENTICATE_RESPONSE;
    payload: {
        user: User;
    }
};

export interface AuthenticateFailedAction {
    type: typeof AUTHENTICATE_FAILED;
    payload: {
        error: Error;
    }
};
```

Lastly, you'll need to export your store's action types by doing something like below:

```typescript
// store/users/types.ts

export type UserAction = AuthenticateRequestAction | AuthenticateResponseAction | AuthenticateFailedAction;
```

### State

```typescript
// store/users/state.ts

export interface UserState {
    data: User;
    loading: boolean;
    error?: Error;
};
```

Our `UserState` will be encompassed by our `RootState` which is discussed further down this article.

The above interface is very simple:

1. I have a `data` object which will capture the API response.
2. I have a `loading` boolean which I will use to implement load checks to prevent double queries.
3. I have an optional `error` which will only have a value if an `Error` is returned.

### Reducer

Our reducer is where the action (no pun intended) happens. You can think of the reducer as a switchboard operator who is directing callers to their intended target. Once the target is known, the state can be changed.

It's really important to note that we are working with immutable states here, when I say 'change' I refer to replacing the state in its entirety with the relevant values adjusted.

The flow of action would be something as follows:

1. The application dispatches a public action.
2. The application invokes the relevant functions, these functions will have a type assigned to it (covered next section).
3. The reducer receives the current state, and the action being invoked (which contains the type).
4. A state reducer is then called which will create a copy of the state and change the relevant values based on a switch.
5. A new state is returned from the reducer which has been adjusted based on the action.

Below is a working example of how we would define our reducer and state reducer.

```typescript
// store/users/reducers.ts

import produce from 'immer';

import { Reducer } from 'redux';

import {
    AUTHENTICATE_REQUEST,
    AUTHENTICATE_RESPONSE,
    AUTHENTICATE_FAILED,
} from './types';

import { UserState } from './state';

import { UserAction } from './types';

export const initialState: UserState = {
    data: {
        id: -9999,
        username: ''
    },
    loading: false,
    error: undefined,
};

export const userReducer: Reducer<UserState, UserAction> = (state, action) => {
    let userState: UserState = state || initialState;
    return {
        ...userState,
        ...userStateReducer(state, action)
    };
};

export const userStateReducer = produce((
    draftState: UserState,
    action: UserAction
    ) => {
        switch (action.type) {
            case AUTHENTICATE_REQUEST:
                draftState.loading = true;
                return;
            case AUTHENTICATE_RESPONSE:
                draftState.loading = false;
                draftState.data = action.payload.user;
                return;
            case AUTHENTICATE_FAILED:
                draftState.loading = false;
                draftState.error = action.payload.error;
                return;
            default:
                return;
    };
});
```

### Actions

In the previous section we talk about dispatching a public action from our application to trigger our reducer.

Since we're using `Thunk`, we need to define the appropriate types for our public actions.

```typescript
// store/types.ts

import { ThunkAction } from 'redux-thunk';

export interface Action {
    type: string;
};

export type AppThunk<A extends Action = Action, E = null> = ThunkAction<void, RootState, E, A>;
```

Once the above is created, our actions can be really simply defined. Below is a working example of how this is done:

```typescript
// store/users/actions.ts

import {
    AUTHENTICATE_REQUEST,
    AUTHENTICATE_RESPONSE,
    AUTHENTICATE_FAILED,
    AuthenticateRequestAction,
    AuthenticateResponseAction,
    AuthenticateFailedAction,
} from './types';

import { User } from '../../types';
import { AppThunk } from '../types';

import { api } from '../../api';

const authenticateRequest = (username: string, password: string): AuthenticateRequestAction => {
    return {
        type: AUTHENTICATE_REQUEST,
        payload: {
            username,
            password
        }
    }
};

const authenticateResponse = (user: User): AuthenticateResponseAction => {
    return {
        type: AUTHENTICATE_RESPONSE,
        payload: {
            user
        }
    }
};

const authenticateFailed = (error: Error): AuthenticateFailedAction => {
    return {
        type: AUTHENTICATE_FAILED,
        payload: {
            error
        }
    }
};

export const authenticate = (username: string, password: string): AppThunk => async dispatch => {
    dispatch(authenticateRequest(username, password));
    try {
        let result = await api.authenticate(username, password);
        dispatch(authenticateResponse(result));
    } catch (error) {
        dispatch(authenticateFailed(error));
    }
};
```

In above, we would dispatch `authenticate(username, password)` which would then dispatch the other functions containing the relevant type.

### Selectors

Lastly, in order to access our values we need to define selectors which will point to somewhere in our state.

This will mean that the state value used in multiple parts of our application will be simultaneously updated when our state is changed.

```typescript
// store/users/selectors.ts

export const getUser = createSelector(
    userState,
    (state: UserState) => {
        return state.data;
    }
);
```

## Putting It All Together

Now that we've got our sub-store's individual components put together, we need to make it easy to access.

First we can group and export our actions, selectors and reducers as follows:

```typescript
// store/users/index.ts

import * as userActions from './actions';
import * as userSelectors from './selectors';
import { userReducer } from './reducers';

export { userActions, userReducer, userSelectors };
```

Now, when we want to access our actions, reducers or selectors we can import `userActions`, etc.

We need to define a `RootState` which will include all our sub-states. This is defined simply as:

```typescript
// store/state.ts

export interface RootState {
    user: UserState;
}
```

Lastly, we need an `index.ts` which will create our store itself.

The below code sample shows how we can persist our state, aswell as apply our `Thunk` middleware.

```typescript
// store/index.ts

import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './user';

const reducer = combineReducers({
    user: userReducer,
});

const persistConfig = { key: 'root', storage, };
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
```

The below is an example of how you can access the store's value using the selector and actions you set up above.

```typescript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userSelectors, userActions } from '../store/user';
import { RootState } from '../store/types';

const selector = (state: RootState) => {
    return {
        user: userSelectors.getUser(state)
    }
};

export const ExampleComponent = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state: RootState) => selector(state));

    useEffect(() => {
        dispatch(userActions.fetchUser());
    }, [dispatch]);

    console.log(user);

    return <div>;
};
```

## Closing Thoughts

Once you've set this all up, you'll have a very clear and explicit way of interacting with your state. In general, debugging issues related to the state is much easier while working with an immutable state.

Of course, the code overhead of implementing the above means that you'll need to balance it based on the complexity of your application.

If you have a really simple CRUD API and all you need to do is represent that data, you may not need a fully fledged state system.

If you're new to working with `ReactJS` the above may be rather overwhelming, however the logic and purpose of using something like `Redux` becomes intuitive as your application increases in size and complexity.
