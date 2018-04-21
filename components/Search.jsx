import React, { PureComponent } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Input from '../styled/Input';
import Button from '../styled/Button';
import SearchWrapper from '../styled/SearchWrapper';

class Search extends PureComponent {
    state = {
        query: '',
    };

    onChangeQuery = (event) => {
        this.setState({ query: event.target.value });
    };

    onKeyUpQuery = (event) => {
        if (event.key === 'Enter') {
            Router.push({ pathname: '/result', query: { q: this.state.query } });
        }
    };

    render() {
        const { query } = this.state;

        return (
            <SearchWrapper>
                <Input value={query} onChange={this.onChangeQuery} onKeyUp={this.onKeyUpQuery} />
                <Link href={{ pathname: '/result', query: { q: query } }}>
                    <Button>Искать</Button>
                </Link>
            </SearchWrapper>
        );
    }
}

export default Search;
