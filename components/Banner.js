import { useEffect, useState } from "react";
import axios from "axios";

const Banner = ({ templateId, userId }) => {
  const [section, setSection] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/store/website/${userId}/${templateId}/`
        );
        setSection(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: section.section1 }} />
    </>
  );
};

export default Banner;
