import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet, injectGlobal } from 'styled-components';

injectGlobal([`
  html {
    font-family: "Open Sans", sans-serif;
    font-size: 16px;    
  }
  body {
    margin: 0;   
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
`]);

export default class MyCustomDocument extends Document {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
        const styleTags = sheet.getStyleElement();

        return { ...page, styleTags };
    }

    render() {
        return (
            <html lang="en">
                <Head>
                    <title>My Page Title</title>
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
                    {this.props.styleTags}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
