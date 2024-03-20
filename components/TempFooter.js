
import Link from "next/link";

const TempFooter = () => {

  


  return (
    <>
  
<footer class="bg-light text-dark py-4 mt-auto">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h5>About Market Master</h5>
                <p>Your Website Builder makes it easy and fun to create professional websites without any technical skills. Our mission is to empower everyone to bring their ideas to life online.</p>
            </div>
            <div class="col-md-3">
                <h5>Quick Links</h5>
                <ul class="list-unstyled">
                    <Link href="/">
                    <li><a href="#" class="text-dark">Home</a></li>
                    </Link>
                    <Link href="/#features">
                    <li><a href="#" class="text-dark">Features</a></li>
                    </Link>
                    <Link href="/#faqAccordion">

                    <li><a href="#" class="text-dark">FAQs</a></li>
                    </Link>
                </ul>
            </div>
            <div class="col-md-3">
                <h5>Contact Us</h5>
                <p>Email: support@yourwebsitebuilder.com</p>
                <p>Phone: +123 456 7890</p>
                <p>Address: 123 Builder Lane, Web City, WB 12345</p>
            </div>
        </div>
        <div class="text-center mt-4">
            <p>&copy; 2024 Market Master. All rights reserved.</p>
        </div>
    </div>
</footer>

    </>
  );
};

export default TempFooter;
