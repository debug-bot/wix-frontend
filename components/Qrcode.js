import { useState, useContext } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
const swal = require("sweetalert2");

export default function Qrcode() {
	const [url, setUrl] = useState("");
	const [qrurl, setQrUrl] = useState("");
	const [generate, setGenerate] = useState(false);
	const { user } = useContext(AuthContext);

	const user_id = user?.user_id || 1;

	const handleGenerateQR = (e) => {
		e.preventDefault();
		if (url) {
			setGenerate(true);
			setQrUrl(url);
			try {
				const response = axios.post(
					"http://127.0.0.1:8000/store/qrcode-history/",
					{
						user: user_id,
						url: url,
					}
				);
				console.log(response.data);
				swal.fire({
					title: "Your QR code saved successfully!",
					icon: "success",
					toast: true,
					timer: 3000,
					position: "bottom-right",
					timerProgressBar: true,
					showConfirmButton: false,
				});
			} catch (error) {
				console.error("There was an error!", error);
				swal.fire({
					title: "Something went wrong!",
					icon: "error",
					toast: true,
					timer: 3000,
					position: "bottom-right",
					timerProgressBar: true,
					showConfirmButton: false,
				});
			}
		}
	};

	return (
		<>
			<div className="container" style={{ marginBottom: "200px" }}>
				<h1 className="text-center my-5">QR Code Generator</h1>
				<div className="row justify-content-center">
					<div className="col-md-6">
						<form onSubmit={handleGenerateQR}>
							<div className="input-group mb-3">
								<input
									type="url"
									className="form-control"
									placeholder="Enter URL"
									value={url}
									onChange={(e) => setUrl(e.target.value)}
									required
								/>
								<button className="btn btn-light" type="submit">
									Generate QR Code
								</button>
							</div>
						</form>
						{generate ? (
							<div className="d-flex flex-column justify-content-center align-items-center">
								<p>
									<strong>Your link: </strong>
									<a href={qrurl} target="_blank">
										{qrurl}
									</a>
								</p>
								<div className="text-center p-3 bg-light rounded">
									<QRCode value={qrurl} renderAs="canvas" />
								</div>
							</div>
						) : (
							<>
								<div className="text-center pt-3">
									<p>Enter URL to generate QR code</p>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
