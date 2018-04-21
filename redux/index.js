import { createStore, applyMiddleware } from 'redux';
import withRedux from 'next-redux-wrapper';
import nextReduxSaga from 'next-redux-saga';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware);

export function configureStore() {
    const store = createStore(reducer, enhancer);

    store.runSagaTask = () => {
        store.sagaTask = sagaMiddleware.run(rootSaga);
    };

    store.runSagaTask();

    return store;
}

export function withReduxSaga(BaseComponent) {
    return withRedux(configureStore)(nextReduxSaga(BaseComponent));
}
