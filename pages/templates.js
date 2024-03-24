import { useState } from "react";
import DashboardInfo from "../components/DashboardInfo";
import Sidebar from "../components/Sidebar";
import Templates from "../components/Templates";

export default function DasboardMySites() {
	const [isSidebarActive, setIsSidebarActive] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarActive(!isSidebarActive);
	};

	return (
		<>
			
			<div className="main-container d-flex">
				<Sidebar
					isSidebarActive={isSidebarActive}
					toggleSidebar={toggleSidebar}
				/>
				<div class="content">
					<DashboardInfo toggleSidebar={toggleSidebar} />
					<div class="dashboard-content px-3 pb-3">
						<Templates loggedIn={true} />
					</div>
				</div>
			</div>
		</>
	);
}
