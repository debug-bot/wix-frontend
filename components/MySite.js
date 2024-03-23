import { useEffect, useContext, useState } from "react";
import QRCode from "qrcode.react";
import AuthContext from "../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import ProductModal from "./ecommerce/ProductModal";
const swal = require("sweetalert2");

export default function MySite() {
	const [templates, setTemplates] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [showPModal, setPShowModal] = useState(false);
	const [qrCodeData, setQrCodeData] = useState("");
	const [error, setError] = useState(null);
	const router = useRouter();
	const { user } = useContext(AuthContext);
	const userId = user?.user_id || 1;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:8000/store/user-template/${userId}/`
				);
				setTemplates(response.data);
				setIsLoading(false);
			} catch (error) {
				console.error("There was an error!", error);
				setError(error);
				setIsLoading(false);
			}
		};
		fetchData();
	}, [userId]);

	const handleDeleteTemp = async (id) => {
		try {
			const result = await swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			});

			if (result.isConfirmed) {
				const response = await axios.delete(
					`http://127.0.0.1:8000/store/user-template-detail/${userId}/${id}/`
				);
				console.log(response.data);
				setTemplates(
					templates.filter((template) => template.id !== id)
				);
				swal.fire({
					title: "Deleted!",
					text: "Your file has been deleted.",
					icon: "success",
					timer: 2000,
					showConfirmButton: false,
				});
			}
		} catch (error) {
			console.error("There was an error!", error);
			swal.fire(
				"Error!",
				"There was a problem deleting your template.",
				"error"
			);
		}
	};

	const handleQrCode = (previewLink) => {
		setQrCodeData(previewLink);
		setShowModal(true);
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error loading templates!</p>;
	}

	if (templates.length === 0) {
		return (
			<div className="text-center mt-5">
				<h3>No Templates Found</h3>
				<p>It looks like you haven't added any templates yet.</p>
				<Link href="/templates">
					<a className="btn btn-light">Add Your First Template</a>
				</Link>
			</div>
		);
	}

	return (
		<>
			<div className="container">
				<h1 className="text-center my-5">My Sites</h1>
				<div className="row mb-5">
					{templates.map((template) => (
						<div className="col-md-3 mb-4" key={template.id}>
							<div className="card h-100 template-card">
								<img
									src={
										template.template.image
											? `http://127.0.0.1:8000${template.template.image}`
											: "./t1.webp"
									}
									className="card-img-top"
									alt={`Template ${template.template.title}`}
								/>
								<div className="card-body">
									<h5 className="card-title">
										{template.template.title}
									</h5>
									<p className="card-text">
										{template.template.description}
									</p>
									<div className="d-flex justify-content-between">
										{template.ecommerce ? (
											<Link
												href={`/ecommerce-editor/${template.id}`}
											>
												<a className="btn btn-dark btn-sm">
													Edit
												</a>
											</Link>
										) : (
											<Link
												href={`/editor/${template.id}`}
											>
												<a className="btn btn-dark btn-sm">
													Edit {template.ecommerce}
												</a>
											</Link>
										)}
										{template.ecommerce && (
											<span className="badge bg-info pt-2">
												Ecommerce
											</span>
										)}
										{template.ecommerce ? (
											<Link
												href={`/ecommerce-user/${template.id}`}
											>
												<a className="btn btn-light btn-sm">
													Preview
												</a>
											</Link>
										) : (
											<Link
												href={`/user-preview/${template.id}`}
											>
												<a className="btn btn-light btn-sm">
													Preview
												</a>
											</Link>
										)}
									</div>
								</div>
								<div className="card-footer d-flex justify-content-between align-items-center">
									<small className="text-muted text-truncate">
										{template.time_since_updated} ago
									</small>
									<span>
										{template.ecommerce ? (
											<>
												<span
													title="Add Product"
													className="text-success"
													style={{
														cursor: "pointer",
													}}
													onClick={() =>
														setPShowModal(true)
													}
												>
													<i className="fa-solid fa-add"></i>
												</span>
												<span
													title="Qrcode preview link"
													className="text-primary mx-3"
													style={{
														cursor: "pointer",
													}}
													onClick={() =>
														handleQrCode(
															`http://localhost:3000/ecommerce-user/${template.id}/`
														)
													}
												>
													<i className="fa-solid fa-qrcode"></i>
												</span>
											</>
										) : (
											<>
												<span
													title="Qrcode preview link"
													className="text-primary mx-3"
													style={{
														cursor: "pointer",
													}}
													onClick={() =>
														handleQrCode(
															`http://localhost:3000/user-preview/${template.id}/`
														)
													}
												>
													<i className="fa-solid fa-qrcode"></i>
												</span>
											</>
										)}

										<span
											title="Delete"
											className="text-danger"
											style={{ cursor: "pointer" }}
											onClick={() =>
												handleDeleteTemp(template.id)
											}
										>
											<i className="fa-solid fa-trash"></i>
										</span>
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			{showModal && (
				<div className="modal fade show" style={{ display: "block" }}>
					<div className="modal-dialog modal-dialog-centered">
						<div
							className="modal-content"
							style={{
								border: "1px solid #dee2e6",
								borderRadius: "10px",
								boxShadow: "0 5px 15px rgba(0,0,0,.5)",
							}}
						>
							<div
								className="modal-header d-flex justify-content-between align-items-center"
								style={{
									borderBottom: "1px solid #dee2e6",
									backgroundColor: "#f8f9fa",
								}}
							>
								<h5
									className="modal-title text-truncate"
									style={{
										fontSize: "1.25rem",
										fontWeight: "500",
										color: "#495057",
									}}
								>
									Preview Link
								</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setShowModal(false)}
								></button>
							</div>
							<div
								className="modal-body"
								style={{ backgroundColor: "#fff" }}
							>
								<div className="text-center">
									<h6
										className="text-truncate"
										style={{
											fontSize: "1.1rem",
											color: "#495057",
										}}
									>
										Scan QR Code to get link
									</h6>
									<a href={qrCodeData} target="_blank">
										<span
											className="text-truncate"
											style={{
												fontSize: "1rem",
												color: "#495057",
											}}
										>
											{qrCodeData}
										</span>
									</a>
								</div>
								<div className="d-flex justify-content-center align-items-center">
									<div className="text-center pt-3">
										<div
											style={{
												padding: "10px",
												backgroundColor: "#f8f9fa",
												borderRadius: "5px",
												boxShadow:
													"0 4px 8px rgba(0,0,0,.1)",
											}}
											title="scan qr code to get link"
										>
											<QRCode value={qrCodeData} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			<ProductModal
				showPModal={showPModal}
				setPShowModal={setPShowModal}
				userId={userId}
			/>
		</>
	);
}
