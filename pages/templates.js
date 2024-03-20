import { useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TempNavbar from '../components/TempNavbar';
import TempFooter from '../components/TempFooter';


export default function Templates() {

	const history = useRouter()
	const { user } = useContext(AuthContext);


useEffect(() => {
  if (!user) {
    history.push("/login");
  }
}, []);


const templates = [
    {
        id: "1",
        imageUrl: "https://static-cse.canva.com/blob/1210661/10SimplewaystoenhanceyourimageFeaturedImage1.jpg",
        description: "A versatile template suitable for all types of websites."
    },
    {
        id: "2",
        imageUrl: "https://static-cse.canva.com/blob/1210661/10SimplewaystoenhanceyourimageFeaturedImage1.jpg",
        description: "Perfect for blogs and personal pages."
    },
    {
        id: "3",
        imageUrl: "https://static-cse.canva.com/blob/1210661/10SimplewaystoenhanceyourimageFeaturedImage1.jpg",
        description: "Ideal for e-commerce sites with a modern feel."
    },
    // Add more templates as needed
];


  

  return (
   <>
   <TempNavbar />
   
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
                    <h5 className="card-title">{`Template ${template.id}`}</h5>
                    <p className="card-text">{template.description}</p>
                    <div className="d-flex justify-content-between">
                        <Link href={`/editor/${template.id}/`}>
                            <a className="btn btn-light">Edit</a>
                        </Link>
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


<TempFooter />
   </>

  );
}
