import useUser from '../../hooks/useUser';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Loading from '../UI/Loading';

function ProtectedPage({ children }) {
    const { loading, loggedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (loggedIn) {
            router.replace('/');
        }
    }, [loggedIn, router]);

    if (loading || loggedIn) {
        return <Loading />;
    }

    return children;
}

export default ProtectedPage;
