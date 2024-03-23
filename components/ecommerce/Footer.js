import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Footer() {
	const router = useRouter();
	const [section, setSection] = useState({});
	const [loading, setLoading] = useState(true);
	const { id } = router.query;

	useEffect(() => {
		if (!router.isReady || !id) return;

		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:8000/store/templates/${id}/`
				);
				setSection(response.data);
			} catch (error) {
				console.error("There was an error!", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [router.isReady, id]);

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
