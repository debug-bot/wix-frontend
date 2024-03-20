import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "http://127.0.0.1:8000";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  const decode = (token) =>{
    try {
        return JSON.parse(window.atob(token.split(".")[1]));
    } catch (e) {
        console.warn("Error decoding token");
    }
}

  axiosInstance.interceptors.request.use(async req => {
    const user = decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/account/token/refresh/`, {
      refresh: authTokens.refresh
    });
    localStorage.setItem("authTokens", JSON.stringify(response.data));
    localStorage.setItem("authTokens", JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUser(decode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;