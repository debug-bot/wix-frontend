import { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import Homepage from "./views/Homepage";
import Registerpage from "./views/Registerpage";
import Loginpage from "./views/Loginpage";
import Editor from "./views/Editor";
import Navbar from "./views/Navbar";
import ForgotPassword from "./views/ForgotPassword";
import ChangePassword from "./views/ChangePassword";
import Sidebar from "./views/Sidebar";
import jwt_decode from "jwt-decode";
import Dashboard from "./views/dashboard/Dashboard";

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("authTokens");
		if (token) {
			const decoded = jwt_decode(token);
			setUser({
				user_id: decoded.user_id,
				// Add other user details as needed
			});
		} else {
			setUser(null);
		}
	}, []);
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/editor/:id" element={<Editor />} />
					<Route path="/login" element={<Loginpage />} />
					<Route path="/register" element={<Registerpage />} />
					<Route
						path="/forgotpassword"
						element={<ForgotPassword />}
					/>
					<Route
						path="/changepassword/:userId/:token"
						element={<ChangePassword />}
					/>
					<Route path="/" element={<Homepage />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
