import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showSelector, errorSelector } from '../ducks/tvmaze';
import Show from './Show';
import ResultWrapper from '../styled/ResultWrapper';
import Alert from '../styled/Alert';

class SearchList extends PureComponent {
    static propTypes = {
        shows: PropTypes.arrayOf(PropTypes.object),
        error: PropTypes.string,
    };

    static defaultProps = {
        shows: [],
        error: null,
    };

    render() {
        const { shows, error } = this.props;

        return (
            <ResultWrapper>
                {error ? <Alert>{error}</Alert> : null}
                {
                    shows.map(show => (
                        <Show
                            key={show.id}
                            detail={show}
                            link={`/detail?id=${show.id}`}
                        />
                    ))
                }
            </ResultWrapper>
        );
    }
}

const mapStateToProps = state => ({
    shows: showSelector(state),
    error: errorSelector(state),
});

export default connect(mapStateToProps)(SearchList);
