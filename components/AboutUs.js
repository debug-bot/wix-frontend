import { useEffect, useState } from "react";
import axios from "axios";


const AboutUs = () => {

  const [section, setSection] = useState({});

  useEffect(() => {
    const templateId = localStorage.getItem('templateId') || "1";

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/store/website/${templateId}/`);
        setSection(response.data);
      }
      catch (error) {
        console.error('There was an error!', error);
      }
    }
    fetchData();
  }, []);


  return (
    <>
    <div id="about_store">
       <div
            dangerouslySetInnerHTML={{__html: section.section2 }}
    />
    </div>
    </>
  );
};

export default AboutUs;
