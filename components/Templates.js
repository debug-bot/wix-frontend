import { useEffect, useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
const swal = require('sweetalert2');


export default function Templates({loggedIn}) {

    const [templates, setTemplates] = useState([]);

	const history = useRouter()
	const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/store/templates/");
                setTemplates(response.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        }
        fetchData();
    }, []);

    const handleAddTemp = async (id) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/store/post-user-template/', {
                user: user?.user_id || 1,
                template: id
            });
            console.log(response.data);
            swal.fire({
                title: 'Success!',
                text: 'Template added to your site.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
            history.push('/mysite');
        }
        catch (error) {
            console.error('There was an error!', error);
        }
    }


if (templates.length === 0) {
            return (
                <div className="text-center mt-5">
                    <h1 className='mb-2'>Templates</h1>
                    <h3>No Templates Found</h3>
                </div>
            );
    }


// const templates = [
//     {
//         id: "1",
//         title: "Modern Business Suite",
//         imageUrl: "./t2.webp",
//         description: "Sleek, professional layout for businesses, featuring dynamic portfolio, intuitive navigation, and integrated contact solutions."
//     },
//     {
//         id: "2",
//         title: "Tech Innovator",
//         imageUrl: "./t1.webp",
//         description: "Cutting-edge, interactive design for tech startups, emphasizing product showcases, innovation timelines, and bold graphics."
//     },
//     {
//         id: "3",
//         title: "Urban Real Estate",
//         imageUrl: "./t3.webp",
//         description: "Elegant, clean template for real estate, with advanced property search, interactive maps, and detailed listings."
//     },
//     // Add more templates as needed
// ];


  

  return (
   <>
   
   <div className="container w-100">
    <h1 className="text-center my-5">Templates</h1>
    <div className="row mb-5">
    {templates.map((template) => (
        <div className="col-sm-3 mb-4" key={template.id}>
            <div className="card h-100 template-card">
                {template.image ? (
                    <>
                    <img 
                    src={`http://127.0.0.1:8000${template.image}`} 
                    className="card-img-top" 
                    alt={`Template ${template.title}`}
                />
                    </>
                ): (
                    <>
                    <img 
                    src="./t1.webp" 
                    className="card-img-top" 
                    alt={`Template ${template.title}`}
                />
                    </>
                )}
                
                <div className="card-body">
                    <h5 className="card-title">{template.title}</h5>
                    <p className="card-text">{template.description}</p>
                    <div className="d-flex justify-content-between">
                        {user ? (
                            <>
                            {loggedIn === true ? (
                                <a className="btn btn-dark btn-sm" onClick={() => handleAddTemp(template.id)}>Add</a>                                
                            ) : (
                                <Link href="/mysite">
                                    <a className="btn btn-light btn-sm">Use Template</a>
                                </Link>
                                
                            )}
                            
                            </>
                        ) : (
                            <Link href="/login">
                                <a className="btn btn-light btn-sm">Use Template</a>
                            </Link>
                        )}
                        
                        <Link href={`/preview/${template.id}`}>
                        <a 
                            className="btn btn-light btn-sm"
                        >
                              Preview
                        </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    ))}
</div>

</div>


   </>

  );
}
