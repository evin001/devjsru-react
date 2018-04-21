import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Record } from 'immutable';
import { detailSelector, episodeSelector, errorSelector } from '../ducks/tvmaze';
import Show from './Show';
import Alert from '../styled/Alert';
import BoldTitle from '../styled/BoldTitle';
import ColorTitle from '../styled/ColorTitle';
import EpisodeTable from '../styled/Episode/EpisodeTable';
import EpisodeHeader from '../styled/Episode/EpisodeHeader';
import EpisodeDate from '../styled/Episode/EpisodeDate';
import { EpisodeHeaderCell, EpisodeCell } from '../styled/Episode/EpisodeCell';

class Detail extends PureComponent {
    static propTypes = {
        detail: PropTypes.instanceOf(Record),
        episodes: PropTypes.arrayOf(PropTypes.object),
        error: PropTypes.string,
    };

    static defaultProps = {
        detail: {},
        episodes: [],
        error: null,
    };

    static renderEpisodeName({ season, number, name }) {
        return (
            <Fragment>
                {season}x{number < 10 ? `0${number}` : number}: <ColorTitle>{name}</ColorTitle>
            </Fragment>
        );
    }

    render() {
        const { detail, episodes, error } = this.props;

        return (
            <Fragment>
                {error ? <Alert>{error}</Alert> : null}
                <Show detail={detail} isDetail />
                <EpisodeTable>
                    <thead>
                        <EpisodeHeader>
                            {
                                ['Episode Name', 'Date', 'Url']
                                    .map((header, index) => (
                                        <EpisodeHeaderCell
                                            key={header}
                                            align={index === 0 ? 'left' : 'center'}
                                        >
                                            <BoldTitle>{header}</BoldTitle>
                                        </EpisodeHeaderCell>
                                    ))
                            }
                        </EpisodeHeader>
                    </thead>
                    <tbody>
                        {
                            episodes.map(episode => (
                                <tr key={episode.id}>
                                    <EpisodeCell align="left">
                                        {Detail.renderEpisodeName(episode)}
                                    </EpisodeCell>
                                    <EpisodeCell align="center">
                                        <EpisodeDate>{episode.airdate}</EpisodeDate>
                                    </EpisodeCell>
                                    <EpisodeCell align="center">
                                        <a href={episode.url} target="_blank">Подробнее</a>
                                    </EpisodeCell>
                                </tr>
                            ))
                        }
                    </tbody>
                </EpisodeTable>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    detail: detailSelector(state),
    episodes: episodeSelector(state),
    error: errorSelector(state),
});

export default connect(mapStateToProps)(Detail);
