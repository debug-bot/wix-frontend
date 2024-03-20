import React, { useContext, useEffect, useState } from 'react';
import GrapesJSEditor from '../../components/Editor';
import { useRouter } from 'next/router';
import AuthContext from '../../context/AuthContext';

const HomePage = () => {
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const [isRouterReady, setIsRouterReady] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            setIsRouterReady(true);
        }
    }, [router.isReady]);

    const userId = user ? user.user_id : 1;

    // Wait for the router to be ready before rendering the GrapesJSEditor
    if (!isRouterReady) {
        return <div>Loading...</div>;
    }

    // Now you can safely access router.query
    const { id } = router.query;

    // Handle the case where id is still not available
    if (!id) {
        return <div>Error: Template ID is missing.</div>;
    }

    return (
        <div>
            <GrapesJSEditor templateId={id} userId={userId} />
        </div>
    );
};

export default HomePage;
