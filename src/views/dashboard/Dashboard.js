import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import useAxios from "../../utils/useAxios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import jwt_decode from "jwt-decode";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
const swal = require("sweetalert2");

export default function Dashboard() {
	const [websites, setWebsites] = useState([]);
	const [newWebsite, setNewWebsite] = useState({ name: "" });
	const api = useAxios();
	const [open, setOpen] = useState(false);
	const token = localStorage.getItem("authTokens");
	const navigate = useNavigate();
	if (token) {
		var decoded = jwt_decode(token);
	}

	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	}, [token, navigate]);

	const userID = decoded?.user_id || null;

	useEffect(() => {
		// Fetch websites from the backend
		const fetchWebsites = async () => {
			try {
				const response = await api.get(
					`/app/websites?user_id=${userID}`
				); // Adjust the API endpoint as needed
				setWebsites(response.data);
			} catch (error) {
				console.error("Error fetching websites", error);
			}
		};

		fetchWebsites();
	}, []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = async () => {
		try {
			const response = await api.post("/app/websites/", {
				...newWebsite,
				user: userID,
			}); // Adjust the API endpoint as needed
			setWebsites([...websites, response.data]);
			setNewWebsite({ name: "" });
			setOpen(false);
			// if request 200 show success message
			if (response.status === 201) {
				swal.fire({
					title: "Website Created",
					icon: "success",
					toast: true,
					timer: 6000,
					position: "bottom-right",
					timerProgressBar: true,
					showConfirmButton: false,
				});
			} else {
				swal.fire({
					title: "Error",
					text: "Error creating website",
					icon: "error",
					toast: true,
					timer: 6000,
					position: "bottom-right",
					timerProgressBar: true,
					showConfirmButton: false,
				});
			}
		} catch (error) {
			swal.fire({
				title: "Error",
				text: "Error creating website",
				icon: "error",
				toast: true,
				timer: 6000,
				position: "bottom-right",
				timerProgressBar: true,
				showConfirmButton: false,
			});
			console.error("Error creating website", error);
		}
	};

	const handleInputChange = (e) => {
		setNewWebsite({ ...newWebsite, [e.target.name]: e.target.value });
	};

	const handleEdit = (websiteInfo) => async () => {
		navigate(`/editor/${websiteInfo.id}`, { websiteInfo });
	};

	const handleDelete = (id) => async () => {
		try {
			const response = await api.delete(`/app/websites/${id}`); // Adjust the API endpoint as needed
			setWebsites(websites.filter((website) => website.id !== id));
			// if request 200 show success message
			if (response.status === 204) {
				swal.fire({
					title: "Website Deleted",
					icon: "success",
					toast: true,
					timer: 6000,
					position: "bottom-right",
					timerProgressBar: true,
					showConfirmButton: false,
				});
			} else {
				swal.fire({
					title: "Error",
					text: "Error deleting website",
					icon: "error",
					toast: true,
					timer: 6000,
					position: "bottom-right",
					timerProgressBar: true,
					showConfirmButton: false,
				});
			}
		} catch (error) {
			swal.fire({
				title: "Error",
				text: "Error deleting website",
				icon: "error",
				toast: true,
				timer: 6000,
				position: "bottom-right",
				timerProgressBar: true,
				showConfirmButton: false,
			});
			console.error("Error deleting website", error);
		}
	};

	return (
		<Box sx={{ display: "flex" }}>
			<SideBar />
			<Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
				<Typography variant="h4" className="my-4 text-center">
					Websites
				</Typography>
				<Grid container spacing={2}>
					{websites.map((website) => (
						<Grid item xs={12} sm={6} md={4} key={website.id}>
							<Card sx={{ maxWidth: 345, m: 2 }}>
								<CardMedia
									component="img"
									height="194"
									image="https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
									alt="Paella dish"
								/>
								<CardContent>
									<Typography variant="h5" component="div">
										{website.name}
									</Typography>
									{/* Other details you want to show */}
								</CardContent>
								<CardActions>
									<Button size="small">View</Button>
									<Button
										size="small"
										onClick={handleEdit(website)}
									>
										Edit
									</Button>
									<Button
										size="small"
										onClick={handleDelete(website.id)}
									>
										Delete
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}

					<Grid item xs={12} sm={6} md={4}>
						<Card
							sx={{ maxWidth: 345, m: 2 }}
							style={{ cursor: "pointer", textAlign: "center" }}
							onClick={handleClickOpen}
						>
							<CardMedia
								component="img"
								height="194"
								image="https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
								alt="Paella dish"
							/>
							<CardContent>
								<Typography variant="h5">Add New</Typography>
							</CardContent>
							<CardActions style={{ justifyContent: "center" }}>
								<i class="fa-solid fa-circle-plus fs-2 text-primary"></i>
							</CardActions>
						</Card>
					</Grid>

					<Dialog open={open} onClose={handleClose}>
						<DialogTitle>Add New Website</DialogTitle>
						<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								name="name"
								label="Website Name"
								type="text"
								fullWidth
								variant="standard"
								value={newWebsite.name}
								onChange={handleInputChange}
							/>
							{/* Add other input fields as necessary */}
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button onClick={handleSave}>Save</Button>
						</DialogActions>
					</Dialog>
				</Grid>
				<Typography variant="h4" className="my-4 text-center">
					Templates
				</Typography>
				<Grid item xs={12} sm={6} md={4}>
					<Card
						sx={{ maxWidth: 345, m: 2 }}
						style={{ textAlign: "center" }}
					>
						<CardMedia
							component="img"
							height="194"
							image="https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
							alt="Paella dish"
						/>
						<CardContent>
							<Typography variant="h5">
								Default Template
							</Typography>
						</CardContent>
						<CardActions style={{ justifyContent: "center" }}>
							<Button
								size="small"
								onClick={() => {
									navigate("/editor/1/");
								}}
							>
								Edit
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Box>
		</Box>
	);
}
