import { useEffect, useState } from "react";
import axios from "axios";


const Banner = () => {

  const [section, setSection] = useState({});

  useEffect(() => {
    const templateId = localStorage.getItem('templateId') || "1";

    console.log(templateId);

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
       <div
            dangerouslySetInnerHTML={{__html: section.section1 }}
    />
    </>
  );
};

export default Banner;
