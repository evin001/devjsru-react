import { all, takeLatest, takeEvery, put } from 'redux-saga/effects';
import { Record, List } from 'immutable';
import { createSelector } from 'reselect';
import fetch from 'isomorphic-unfetch';
import es6promise from 'es6-promise';
import { getEntityField, getEntitiesField, dataToEntities } from './utils';

es6promise.polyfill();

export const moduleName = 'tvmaze';

export const SEARCH_SHOW = `${moduleName}/SEARCH_SHOW`;
export const SEARCH_SHOW_SUCCESS = `${moduleName}/SEARCH_SHOW_SUCCESS`;
export const FETCH_DETAIL_SHOW = `${moduleName}/FETCH_DETAIL_SHOW`;
export const SET_DETAIL_SHOW = `${moduleName}/SET_DETAIL_SHOW`;
export const APP_ERROR = `${moduleName}/APP_ERROR`;

export const SearchRecord = Record({
    id: null,
    genres: null,
    image: null,
    name: null,
    summary: null,
});

export const EpisodeRecord = Record({
    id: null,
    airdate: null,
    name: null,
    number: null,
    season: null,
    url: null,
});

export const ReducerRecord = Record({
    shows: new List(),
    episodes: new List(),
    detail: new EpisodeRecord(),
    error: null,
});

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload, error } = action;

    switch (type) {
    case SEARCH_SHOW_SUCCESS: {
        const clearShows = getEntitiesField(payload, 'show', SearchRecord);
        const showList = dataToEntities(clearShows, SearchRecord);

        return state.set('shows', showList);
    }

    case SET_DETAIL_SHOW: {
        const clearEpisodes = getEntitiesField(payload.episodes, null, EpisodeRecord);
        const episodeList = dataToEntities(clearEpisodes, EpisodeRecord);

        const clearDetail = getEntityField(payload.detail, SearchRecord);
        const detail = new SearchRecord(clearDetail);

        return state
            .set('episodes', episodeList)
            .set('detail', detail);
    }

    case APP_ERROR: {
        return state.set('error', error);
    }

    default:
        return state;
    }
}

export const stateSelector = state => state[moduleName];
export const showSelector = createSelector(stateSelector, state => state.shows.toArray());
export const episodeSelector = createSelector(stateSelector, state => state.episodes.toArray());
export const detailSelector = createSelector(stateSelector, state => state.detail);
export const errorSelector = createSelector(stateSelector, state => state.error);

export function searchShow(query) {
    return {
        type: SEARCH_SHOW,
        payload: query,
    };
}

export function searchShowSuccess(shows) {
    return {
        type: SEARCH_SHOW_SUCCESS,
        payload: shows,
    };
}

export function fetchDetailShow(id) {
    return {
        type: FETCH_DETAIL_SHOW,
        payload: id,
    };
}

export function setDetailShow(detail, episodes) {
    return {
        type: SET_DETAIL_SHOW,
        payload: { detail, episodes },
    };
}

export function appError(error) {
    return {
        type: APP_ERROR,
        error,
    };
}

export function* searchShowSaga(action) {
    const { payload } = action;

    try {
        const shows = yield fetch(`http://api.tvmaze.com/search/shows?q=${payload}`);
        const data = yield shows.json();

        yield put(searchShowSuccess(data));
    } catch (error) {
        yield put(appError(`Поисковый запрос: ${error.message}`));
    }
}

export function* fetchDetailShowSaga(action) {
    const { payload } = action;

    try {
        const fetchDetail = yield fetch(`http://api.tvmaze.com/shows/${payload}`);
        const fetchEpisodes = yield fetch(`http://api.tvmaze.com/shows/${payload}/episodes`);
        const detail = yield fetchDetail.json();
        const episodes = yield fetchEpisodes.json();

        yield put(setDetailShow(detail, episodes));
    } catch (error) {
        yield put(appError(`Детальная информация: ${error.message}`));
    }
}

export function* saga() {
    yield all([
        takeLatest(SEARCH_SHOW, searchShowSaga),
        takeEvery(FETCH_DETAIL_SHOW, fetchDetailShowSaga),
    ]);
}
