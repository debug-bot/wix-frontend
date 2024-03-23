import { useState } from "react";
import axios from "axios";
const swal = require("sweetalert2");

const ProductModal = ({ showPModal, setPShowModal, userId }) => {
	const [formData, setFormData] = useState({
		name: "",
		brand: "",
		description: "",
		rating: "",
		numReviews: "",
		price: "",
		countInStock: "",
		image: null,
	});

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		setFormData({ ...formData, image: e.target.files[0] });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = new FormData();
		Object.keys(formData).forEach((key) => {
			data.append(key, formData[key]);
		});
		try {
			const response = await axios.post(
				`http://127.0.0.1:8000/product/create/?user_id=${userId}`,
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log(response.data);
            // form reset
            document.getElementById("productForm").reset();
            swal.fire({
                title: "Success",
                text: "Product added successfully",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
            setPShowModal(false);

		} catch (error) {
			console.log(error);
            swal.fire({
                title: "Error",
                text: "An error occurred. Please try again later",
                icon: "error",
                timer: 2000,
                showConfirmButton: false,
            });
		}
	};

	return (
		<div
			className={`modal ${showPModal ? "show" : ""}`}
			style={{ display: showPModal ? "block" : "none" }}
			tabIndex="-1"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Product Form</h5>
						<button
							type="button"
							className="btn-close"
							onClick={() => setPShowModal(false)}
						></button>
					</div>
					<div className="modal-body">
						<form onSubmit={handleSubmit} id="productForm">
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									Title
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter product title"
									id="name"
									name="name"
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="image" className="form-label">
									Image
								</label>
								<input
									type="file"
									className="form-control"
									id="image"
									name="image"
									onChange={handleFileChange}
									required
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="brand" className="form-label">
									Brand
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter product brand"
									id="brand"
									name="brand"
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="mb-3">
								<label
									htmlFor="description"
									className="form-label"
								>
									Description
								</label>
								<textarea
									className="form-control"
									placeholder="Enter product description"
									id="description"
									name="description"
									onChange={handleInputChange}
									required
								></textarea>
							</div>
							<div className="mb-3">
								<label htmlFor="rating" className="form-label">
									Rating
								</label>
								<input
									type="number"
									className="form-control"
									placeholder="Enter product rating"
									id="rating"
									name="rating"
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="mb-3">
								<label
									htmlFor="numReviews"
									className="form-label"
								>
									Number of Reviews
								</label>
								<input
									type="number"
									className="form-control"
									placeholder="Enter number of reviews"
									id="numReviews"
									name="numReviews"
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="price" className="form-label">
									Price
								</label>
								<input
									type="number"
									className="form-control"
									placeholder="Enter product price"
									id="price"
									name="price"
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="mb-3">
								<label
									htmlFor="countInStock"
									className="form-label"
								>
									Count in Stock
								</label>
								<input
									type="number"
									className="form-control"
									placeholder="Enter count in stock"
									id="countInStock"
									name="countInStock"
									onChange={handleInputChange}
									required
								/>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							onClick={() => setPShowModal(false)}
						>
							Close
						</button>
						<button
							type="submit"
							className="btn btn-primary"
							form="productForm"
						>
							Save changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductModal;
