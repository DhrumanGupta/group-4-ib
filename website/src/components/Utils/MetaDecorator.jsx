import Head from 'next/head'

function MetaDecorator({title, description}) {
    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="description" content={description} />
        </Head>
    );
}

export default MetaDecorator;
