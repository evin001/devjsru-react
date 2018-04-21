import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withReduxSaga } from '../redux';
import { fetchDetailShow } from '../ducks/tvmaze';
import Detail from '../components/Detail';
import Layout from '../styled/Layout';

class DetailPage extends PureComponent {
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
        const { id } = query;

        if (id) {
            store.dispatch(fetchDetailShow(id));
        }
    }

    componentWillMount() {
        const { url, dispatch } = this.props;
        const { id } = url.query;

        if (id) {
            dispatch(fetchDetailShow(id));
        }
    }

    render() {
        return (
            <Layout>
                <Detail />
            </Layout>
        );
    }
}

export default withReduxSaga(DetailPage);
