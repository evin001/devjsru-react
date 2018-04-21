import { all } from 'redux-saga/effects';
import { saga as tvMazeSaga } from '../ducks/tvmaze';

export default function* rootSaga() {
    yield all([
        tvMazeSaga(),
    ]);
}
