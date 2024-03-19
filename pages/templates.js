import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Templates() {
    const [appliedTemplateId, setAppliedTemplateId] = useState(null);


  

useEffect(() => {
    const templateId = localStorage.getItem('templateId') || "1";

    if (templateId) {
        setAppliedTemplateId(templateId);
    }
}, []);


 const handleApply = (id) => () => {
    localStorage.setItem('templateId', id);
    setAppliedTemplateId(id);
};


  

  return (
   <>
   <div className="container">
    <div className="d-flex justify-content-center">
    <Link href="/">

    <img class="img-fluid" width="120px" style={{cursor: 'pointer'}} src="./logos/mylogo.png" alt="..." />
    </Link>
    </div>
    
   <h1 class="text-center mb-5">Templates</h1>
    <Link href="/">
   <button type="button" class="btn btn-secondary mb-3">Website</button>
   </Link>
<div className="row mb-5">
  <div className="col-sm-4">
    <div className="card">
          <img src="https://static-cse.canva.com/blob/1210661/10SimplewaystoenhanceyourimageFeaturedImage1.jpg" class="card-img-top" alt="..." />

      <div className="card-body">
        <h5 className="card-title">Template 1</h5>
        <p className="card-text"></p>
        
        <Link href="/editor/1/">
        <a href="#" className="btn btn-secondary me-2">Edit</a>
        </Link>
<a href="#" className="btn btn-secondary" onClick={handleApply('1')}>
    {appliedTemplateId === '1' ? 'Applied' : 'Apply'}
</a>

      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="card">
          <img src="https://static-cse.canva.com/blob/1210661/10SimplewaystoenhanceyourimageFeaturedImage1.jpg" class="card-img-top" alt="..." />

      <div className="card-body">
        <h5 className="card-title">Template 2</h5>
        <p className="card-text"></p>
        
        <Link href="/editor/2/">
        <a href="#" className="btn btn-secondary me-2">Edit</a>
        </Link>
        
<a href="#" className="btn btn-secondary" onClick={handleApply('2')}>
    {appliedTemplateId === '2' ? 'Applied' : 'Apply'}
</a>

      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="card">
          <img src="https://static-cse.canva.com/blob/1210661/10SimplewaystoenhanceyourimageFeaturedImage1.jpg" class="card-img-top" alt="..." />

      <div className="card-body">
        <h5 className="card-title">Template 3</h5>
        <p className="card-text"></p>
        
        <Link href="/editor/3/">
        <a href="#" className="btn btn-secondary me-2">Edit</a>
        </Link>
        <a href="#" className="btn btn-secondary" onClick={handleApply('3')}>
    {appliedTemplateId === '3' ? 'Applied' : 'Apply'}
</a>


      </div>
    </div>
  </div>
</div>
</div>
   </>

  );
}
