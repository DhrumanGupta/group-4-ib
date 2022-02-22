import useUser from '../../hooks/useUser';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Loading from '../UI/Loading';

function ProtectedPage({ children }) {
    const auth = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!auth.loading && !auth.loggedIn) {
            router.push('/login');
        }
    }, [auth.loggedIn, router, auth.loading]);

    if (auth.loading || !auth.loggedIn) {
        return <Loading />;
    }

    return React.cloneElement(children, { auth });
}

export default ProtectedPage;
