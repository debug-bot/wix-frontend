import React, { useContext, useEffect } from 'react';
import GrapesJSEditor from '../../components/Editor';
import { useRouter } from 'next/router';
import AuthContext from '../../context/AuthContext';



const HomePage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { user } = useContext(AuthContext);
     

    const userId = user ? user.user_id : 1;



    if (!id) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <GrapesJSEditor templateId={id} userId={userId}/>
        </div>
    );
};

export default HomePage;
