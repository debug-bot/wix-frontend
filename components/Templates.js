import { useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Templates() {

	const history = useRouter()
	const { user } = useContext(AuthContext);



const templates = [
    {
        id: "1",
        title: "Modern Business Suite",
        imageUrl: "./t2.webp",
        description: "Sleek, professional layout for businesses, featuring dynamic portfolio, intuitive navigation, and integrated contact solutions."
    },
    {
        id: "2",
        title: "Tech Innovator",
        imageUrl: "./t1.webp",
        description: "Cutting-edge, interactive design for tech startups, emphasizing product showcases, innovation timelines, and bold graphics."
    },
    {
        id: "3",
        title: "Urban Real Estate",
        imageUrl: "./t3.webp",
        description: "Elegant, clean template for real estate, with advanced property search, interactive maps, and detailed listings."
    },
    // Add more templates as needed
];


  

  return (
   <>
   
   <div className="container">
    <h1 className="text-center my-5">Templates</h1>
    <div className="row mb-5">
    {templates.map((template) => (
        <div className="col-sm-4 mb-4" key={template.id}>
            <div className="card h-100 template-card">
                <img 
                    src={template.imageUrl} 
                    className="card-img-top" 
                    alt={`Template ${template.id}`}
                    onClick={() => history.push(`/template/${template.id}/`)}
                />
                <div className="card-body">
                    <h5 className="card-title">{template.title}</h5>
                    <p className="card-text">{template.description}</p>
                    <div className="d-flex justify-content-between">
                        {user ? (
                            <Link href={`/editor/${template.id}/`}>
                            <a className="btn btn-light">Edit</a>
                        </Link>
                        ) : (
                            <Link href="/login">
                                <a className="btn btn-light">Use Template</a>
                            </Link>
                        )}
                        
                        <Link href={`/template/${template.id}/`}>
                        <a 
                            className="btn btn-light"
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
