import { useEffect, useState } from "react";
import axios from "axios";


const AboutUs = ({templateId, userId}) => {

  const [section, setSection] = useState({});

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/store/website/${userId}/${templateId}/`);
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
