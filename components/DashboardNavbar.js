import { useEffect, useState, useContext } from "react";
import Link from 'next/link';
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

const DashboardNavbar = () => {
    const [profile, setProfile] = useState("");
    const { user, logoutUser } = useContext(AuthContext);
    const api = useAxios();

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const response = await api.get("/account/profile/");
                    setProfile(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.log(error);
                    setProfile("Something went wrong");
                }
            };
            fetchData();
        }
    }, [user]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand mt-1" href="/">
                        <img className="img-fluid" width="50px" style={{ cursor: 'pointer' }} src="./logos/mylogo.png" alt="..." />
                        <span className="ms-1">Market Master Dashboard</span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                              <li className="nav-item">
                                      <a className="nav-link" aria-current="page" href="#mysite">My Site</a>
                              </li>

                              <li className="nav-item">
                                      <a className="nav-link" aria-current="page" href="#templates">Templates</a>
                              </li>
                                
                            
                            {user ? (
                              <>
                             
                              
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={logoutUser}>Logout</a>
                                </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link href="/login/">
                                            <a className="nav-link" href="#">Login</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/register/">
                                            <a className="nav-link" href="#">Register</a>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                        <span className="navbar-text">
                            {user && profile.name}
                        </span>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default DashboardNavbar;
