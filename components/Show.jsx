import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { stripTags, escapeHtml } from '../utils/helper';
import ColorTitle from '../styled/ColorTitle';
import BoldTitle from '../styled/BoldTitle';
import Genres from '../styled/Genres';
import ShowWrapper from '../styled/Show/ShowWrapper';
import ShowName from '../styled/Show/ShowName';
import ShowImage from '../styled/Show/ShowImage';
import ShowContent from '../styled/Show/ShowContent';
import ShowSummary from '../styled/Show/ShowSummary';

function renderShowName(name) {
    return <ShowName><ColorTitle>{name}</ColorTitle></ShowName>;
}

const Show = ({ detail, link, isDetail }) => {
    if (!detail) {
        return null;
    }

    const {
        image, name, genres, summary,
    } = detail;

    return (
        <ShowWrapper isDetail={isDetail}>
            <ShowImage>
                {image ?
                    <img src={isDetail ? image.original : image.medium} alt={name} /> : null
                }
            </ShowImage>
            <ShowContent>
                {!isDetail && link ?
                    <Link href={link}>
                        {renderShowName(name)}
                    </Link> :
                    renderShowName(name)
                }
                <Genres>
                    {genres ?
                        <Fragment>
                            <BoldTitle>Жанры</BoldTitle> <ColorTitle>{genres.join(', ')}</ColorTitle>
                        </Fragment> : null
                    }
                </Genres>
                <ShowSummary>
                    {isDetail ? stripTags(escapeHtml(summary)) : null}
                </ShowSummary>
            </ShowContent>
        </ShowWrapper>
    );
};

Show.propTypes = {
    detail: PropTypes.shape({
        image: PropTypes.object,
        name: PropTypes.string,
        summary: PropTypes.string,
        genres: PropTypes.arrayOf(PropTypes.string),
    }),
    link: PropTypes.string,
    isDetail: PropTypes.bool,
};

Show.defaultProps = {
    detail: null,
    link: '',
    isLarge: false,
    isDetail: false,
};

export default Show;
