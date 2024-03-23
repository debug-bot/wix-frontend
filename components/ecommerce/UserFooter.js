import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import AuthContext from "../../context/AuthContext";

export default function Footer() {
	const router = useRouter();
	const { user } = useContext(AuthContext);
	const [section, setSection] = useState({});
	const [loading, setLoading] = useState(true);
	const userId = user?.user_id || 1;
	const { id } = router.query;

	useEffect(() => {
		if (!router.isReady || !id) return;

		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:8000/store/editor-template/${userId}/${id}/`
				);
				setSection(response.data);
			} catch (error) {
				console.error("There was an error!", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [router.isReady, id, userId]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!id) {
		return <div>Error: Template ID is missing.</div>;
	}
	return (
		<div>
			<div dangerouslySetInnerHTML={{ __html: section.html_content3 }} />
		</div>
	);
}
