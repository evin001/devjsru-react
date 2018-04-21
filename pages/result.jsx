import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withReduxSaga } from '../redux';
import { searchShow } from '../ducks/tvmaze';
import SearchList from '../components/SearchList';
import Header from '../styled/Header';
import Layout from '../styled/Layout';

class ResultPage extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func,
        url: PropTypes.shape({
            query: PropTypes.object,
        }),
    };

    static defaultProps = {
        dispatch: null,
        url: null,
    };

    static async getInitialProps({ store, query }) {
        const { q } = query;

        if (q) {
            store.dispatch(searchShow(q));
        }
    }

    componentWillMount() {
        const { url, dispatch } = this.props;
        const { q } = url.query;

        if (q) {
            dispatch(searchShow(q));
        }
    }

    render() {
        return (
            <Layout>
                <Header>Результат поиска по запросу {this.props.url.query.q}</Header>
                <SearchList />
            </Layout>
        );
    }
}

export default withReduxSaga(ResultPage);
