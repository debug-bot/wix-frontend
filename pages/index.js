import TempNavbar from '../components/TempNavbar';
import TempFooter from '../components/TempFooter';
import Templates from '../components/Templates';
import Qrcode from '../components/Qrcode';


export default function Index() {
 
 

  return (
  <>
  <TempNavbar />
<section class="hero-section mt-4">
    <div class="container">
        <div class="row align-items-center justify-content-md-between">
            <div class="col-md-6">
                <h1 class="display-3 fw-bold">Build Your Dream Website Easily</h1>
                <p class="lead my-4">
                    Create stunning websites with our easy-to-use, drag-and-drop website builder. No coding required!
                </p>
                <a href="/templates" class="btn btn-light btn-lg">Get Started</a>
            </div>
            <div class="col-md-6">
                <img src="https://www.hostaway.net.au/wp-content/uploads/2017/03/web-design.png" class="img-fluid float-end" alt="Website Builder Image" />
            </div>
        </div>
    </div>
</section>
<section id="features" class="py-5">
    <div class="container">
        <div class="row text-center">
            <div class="col-12">
                <h2 class="mb-4">Amazing Features</h2>
                <p class="lead mb-5">Discover the incredible functionalities that make our website builder stand out.</p>
            </div>
        </div>

        <div class="row text-center">
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <i class="fa-solid fa-laptop mb-3" style={{ fontSize: "2rem"}}></i>
                        <h5 class="card-title">Drag & Drop Editor</h5>
                        <p class="card-text">Effortlessly create stunning websites with our intuitive drag and drop interface.</p>
                    </div>
                </div>
            </div>

            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <i class="fa-solid fa-palette mb-3" style={{ fontSize: "2rem"}}></i>
                        <h5 class="card-title">Customizable Templates</h5>
                        <p class="card-text">Choose from a vast collection of professionally designed templates.</p>
                    </div>
                </div>
            </div>

            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <i class="fa-solid fa-gear mb-3" style={{ fontSize: "2rem"}}></i>
                        <h5 class="card-title">Advanced SEO Tools</h5>
                        <p class="card-text">Optimize your site with advanced SEO tools for higher search engine rankings.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section id="templates" class="py-3 bg-light">
    <Templates />
    </section>
<section class="container my-5" id="faqse">
    <h2 class="text-center mb-4">Frequently Asked Questions</h2>
    <div class="accordion" id="faqAccordion">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-controls="collapseOne">
                    What is Market Master?
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>Market Master is a user-friendly online platform that allows you to create, design, and publish your own website without needing any coding skills. With our intuitive drag-and-drop interface, you can easily customize your website to suit your personal or business needs.</p>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    How much does it cost to use Market Master?
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <p>We offer various pricing plans to fit your needs, including a free plan with basic features. Our premium plans offer additional features like custom domain hosting, advanced SEO tools, and e-commerce capabilities. Please visit our pricing page for detailed information on each plan.</p>
                </div>
            </div>
        </div>
        
    </div>
</section>
<section id="qrcode">

<Qrcode />

</section>
<TempFooter />

  </>

  );
}
