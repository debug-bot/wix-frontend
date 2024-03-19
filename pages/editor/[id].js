// pages/index.js
import GrapesJSEditor from '../../components/Editor';
import { useRouter } from 'next/router';


const HomePage = () => {
    const router = useRouter();
    const { id } = router.query;

    if (!id) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <GrapesJSEditor templateId={id} />
        </div>
    );
};

export default HomePage;
