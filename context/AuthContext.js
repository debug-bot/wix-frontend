import { createContext, useState, useEffect } from "react";
import { useRouter } from 'next/router';
const swal = require("sweetalert2");

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
	const [authTokens, setAuthTokens] = useState(null);

	const [user, setUser] = useState(null);

	const [loading, setLoading] = useState(true);

	const history = useRouter()

	const decode = (token) =>{
    try {
        return JSON.parse(window.atob(token.split(".")[1]));
    } catch (e) {
        console.warn("Error decoding token");
    }
}

	const loginUser = async (email, password) => {
		const response = await fetch("http://127.0.0.1:8000/account/login/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});
		const data = await response.json();
		console.log(data);

		if (response.status === 200) {
			console.log("Logged In");
			setAuthTokens(data.token);
			setUser(decode(data.token.access));
			localStorage.setItem("authTokens", JSON.stringify(data.token));
			history.push("/");

			swal.fire({
				title: "Login Successful",
				icon: "success",
				toast: true,
				timer: 6000,
				position: "bottom-right",
				timerProgressBar: true,
				showConfirmButton: false,
			});
		} else {
			console.log(response.status);
			console.log("there was a server issue");
			swal.fire({
				title: "Email or passowrd does not exists",
				icon: "error",
				toast: true,
				timer: 6000,
				position: "bottom-right",
				timerProgressBar: true,
				showConfirmButton: false,
			});
		}
	};

	const registerUser = async (email, name, password, password2) => {
		const response = await fetch(
			"http://127.0.0.1:8000/account/register/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					name,
					password,
					password2,
					tc: true,
				}),
			}
		);
		if (response.status === 201) {
			history.push("/login");
			swal.fire({
				title: "Registration Successful, Login Now",
				icon: "success",
				toast: true,
				timer: 6000,
				position: "bottom-right",
				timerProgressBar: true,
				showConfirmButton: false,
			});
		} else {
			console.log(response.status);
			console.log("there was a server issue");
			swal.fire({
				title: "An Error Occured " + response.status,
				icon: "error",
				toast: true,
				timer: 6000,
				position: "bottom-right",
				timerProgressBar: true,
				showConfirmButton: false,
			});
		}
	};

	const ForgotPasswordUser = async (email) => {
		const response = await fetch(
			"http://127.0.0.1:8000/api/user/send-reset-password-email/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
				}),
			}
		);
		if (response.status === 200) {
			swal.fire({
				title: "Password Reset Link Sent to your Email",
				icon: "success",
				toast: true,
				timer: 6000,
				position: "bottom-right",
				timerProgressBar: true,
				showConfirmButton: false,
			});
		} else {
			console.log(response.status);
			console.log("there was a server issue");
			swal.fire({
				title: "An Error Occured " + response.status,
				icon: "error",
				toast: true,
				timer: 6000,
				position: "bottom-right",
				timerProgressBar: true,
				showConfirmButton: false,
			});
		}
	};

	const ChangePasswordUser = async (password, password2, userId, token) => {
		const response = await fetch(
			`http://127.0.0.1:8000/api/user/reset-password/${userId}/${token}/`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					password,
					password2,
				}),
			}
		);
		if (response.status === 200) {
			history("/login");
			swal.fire({
				title: "Password Changed Successfully",
				icon: "success",
				toast: true,
				timer: 6000,
				position: "bottom-right",
				timerProgressBar: true,
				showConfirmButton: false,
			});
		} else {
			console.log(response.status);
			console.log("there was a server issue");
			swal.fire({
				title: "An Error Occured " + response.status,
				icon: "error",
				toast: true,
				timer: 6000,
				position: "bottom-right",
				timerProgressBar: true,
				showConfirmButton: false,
			});
		}
	};

	const logoutUser = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem("authTokens");
		history.push("/login");

		swal.fire({
			title: "YOu have been logged out...",
			icon: "success",
			toast: true,
			timer: 6000,
			position: "bottom-right",
			timerProgressBar: true,
			showConfirmButton: false,
		});
	};

	const contextData = {
		user,
		setUser,
		authTokens,
		setAuthTokens,
		registerUser,
		loginUser,
		logoutUser,
		ForgotPasswordUser,
		ChangePasswordUser,
	};

	useEffect(() => {
        const tokens = localStorage.getItem("authTokens");
        if (tokens) {
            const parsedTokens = JSON.parse(tokens);
            setAuthTokens(parsedTokens);
            setUser(decode(parsedTokens));
        }
    }, []);

	useEffect(() => {
		if (authTokens) {
			setUser(decode(authTokens.access));
		}
		setLoading(false);
	}, [authTokens, loading]);

	

	return (
		<AuthContext.Provider value={contextData}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};
