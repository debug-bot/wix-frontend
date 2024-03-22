import { useEffect, useState, useContext } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useRouter } from 'next/router';

const DashboardInfo = () => {
    const [profile, setProfile] = useState("");
    const [isLoading, setIsLoading] = useState(true); // Added loading state
    const { user, logoutUser } = useContext(AuthContext);
    const api = useAxios();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const response = await api.get("/account/profile/");
                    setProfile(response.data);
                    console.log(response.data);
                    setIsLoading(false); // Data loaded, set loading to false
                } catch (error) {
                    console.log(error);
                    setProfile("Something went wrong");
                    setIsLoading(false); // Error occurred, set loading to false
                }
            };
            fetchData();
        } else {
            setIsLoading(false); // User not found, set loading to false
        }
    }, [user]);

    useEffect(() => {
        if (!isLoading && !user) {
            // If not loading and user is not found, redirect to the login page
            router.push('/login');
        }
    }, [isLoading, user, router]);

    if (isLoading) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    return (
        <>
            <span className="navbar-text">{user && profile.name}</span>
            <span className="navbar-text">Dashboard</span>
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex">
                <li className="nav-item" onClick={logoutUser}>
                    <a className="nav-link active" aria-current="page" href="#">Logout</a>
                </li>
            </ul>      
        </>
    );
};

export default DashboardInfo;