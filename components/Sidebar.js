import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

const Sidebar = ({ isSidebarActive, toggleSidebar }) => {
	const router = useRouter();

	const isActive = (pathname) => router.pathname === pathname;
	return (
		<>
			<Head>
				<style>
					{`
                    #navbarSupportedContent {
                        visibility: visible;
                    }

                    .navb-text {
                        display: flex;
                        align-items: center;

                        
                    }

                    @media (max-width: 768px) {
                        #navbarSupportedContent {
                            visibility: hidden;
                        }
                    }
                    `}
				</style>
			</Head>
			<div
				className={`sidebar ${isSidebarActive ? "active" : ""}`}
				id="side_nav"
			>
				<div class="header-box px-2 pt-3 pb-4 d-flex justify-content-between">
					<Link href="/">
						<h1 class="fs-4 navb-text cursor-pointer">
							<span class="bg-white text-dark rounded shadow px-2 me-2">
								<img
									className="img-fluid"
									width="50px"
									style={{ cursor: "pointer" }}
									src="./logos/mylogo.png"
									alt="..."
								/>
							</span>{" "}
							<span class="text-white">Market Master</span>
						</h1>
					</Link>
					<button
						class="btn d-md-none d-block close-btn px-1 py-0 text-white"
						onClick={toggleSidebar}
					>
						<i class="fa-solid fa-stream"></i>
					</button>
				</div>

				<ul class="list-unstyled px-2">
					<Link href="/mysite">
						<li className={isActive("/mysite") ? "active" : ""}>
							<a
								href="#"
								class="text-decoration-none px-3 py-2 d-block mb-2"
							>
								<i class="fa-solid fa-home me-1"></i> My Sites
							</a>
						</li>
					</Link>
					<Link href="/templates">
						<li className={isActive("/templates") ? "active" : ""}>
							<a
								href="#"
								class="text-decoration-none px-3 py-2 d-block mb-2"
							>
								<i class="fa-solid fa-boxes-stacked me-1"></i>{" "}
								Templates
							</a>
						</li>
					</Link>
					<Link href="/qrcode">
						<li className={isActive("/qrcode") ? "active" : ""}>
							<a
								href="#"
								class="text-decoration-none px-3 py-2 d-block mb-2"
							>
								<i class="fa-solid fa-qrcode me-1"></i> QR code
							</a>
						</li>
					</Link>
					<Link href="/qrcode-history">
						<li
							className={
								isActive("/qrcode-history") ? "active" : ""
							}
						>
							<a
								href="#"
								class="text-decoration-none px-3 py-2 d-block mb-2"
							>
								<i class="fa-solid fa-database me-1"></i> QR Code
								History
							</a>
						</li>
					</Link>
					<hr class="text-white bg-white" />
				</ul>
			</div>
		</>
	);
};

export default Sidebar;
