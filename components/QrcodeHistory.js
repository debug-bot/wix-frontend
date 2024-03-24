import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import AuthContext from "../context/AuthContext";
const swal = require("sweetalert2");

export default function QrcodeHistory() {
	const [history, setHistory] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { user } = useContext(AuthContext);
	const userId = user?.user_id || 1;

	useEffect(() => {
		fetchQRCodeHistory();
	}, []);

	const fetchQRCodeHistory = async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				`http://127.0.0.1:8000/store/qrcode-history/?user_id=${userId}`
			);
			setHistory(response.data);
		} catch (error) {
			setError("Error fetching QR code history");
			console.error("Error fetching QR code history:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id) => {
		try {
			const confirmed = await swal.fire({
				title: "Are you sure?",
				text: "This action cannot be undone.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			});

			if (confirmed.isConfirmed) {
				const response = await axios.delete(
					`http://127.0.0.1:8000/store/qrcode-history/?user_id=${userId}&qrcode_id=${id}`
				);
				setHistory(history.filter((item) => item.id !== id));
				swal.fire("Deleted!", response.data.message, "success");
			}
		} catch (error) {
			setError("Error deleting QR code");
			console.error("Error deleting QR code:", error);
		}
	};

	return (
		<div>
			<h1 className="text-center my-5">QR Code Generation History</h1>
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p>{error}</p>
			) : history.length > 0 ? (
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th>#</th>
							<th>URL</th>
							<th>Qrcode</th>
							<th>Created</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{history.map((record, index) => (
							<tr key={record.id}>
								<th>{index + 1}</th>
								<td>
									<a
										href={record.url}
										target="_blank"
										rel="noreferrer"
									>
										{record.url}
									</a>
								</td>
								<td>
									<div className="d-flex justify-content-center">
										<QRCode value={record.url} />
									</div>
								</td>
								<td>{record.time_since_updated} ago</td>
								<td>
									<button
										className="btn btn-danger"
										onClick={() => handleDelete(record.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className="text-center">No QR code history available.</p>
			)}
		</div>
	);
}
