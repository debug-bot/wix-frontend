import { useState } from 'react';
import QRCode from 'qrcode.react';
import Link from 'next/link';
import TempNavbar from '../components/TempNavbar';
import TempFooter from '../components/TempFooter';

export default function Qrcode() {
  const [url, setUrl] = useState('');
  const [generate, setGenerate] = useState(false);

  const handleGenerateQR = (e) => {
    e.preventDefault();
    if(url) {
      setGenerate(true);
    }
  };

  return (
    <>

   <div className="container" style={{marginBottom: "100px"}}>
    <h1 className="text-center my-5">QR Code Generator</h1>
  <div className="row justify-content-center">
    <div className="col-md-6">
        <form 
          onSubmit={handleGenerateQR}
        
        >
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Enter URL" 
          value={url}
          onChange={(e) => setUrl(e.target.value)} 
        />
        <button 
          className="btn btn-light" 
          type="submit" 
        >
          Generate QR Code
        </button>
      </div>
</form>
      {generate ? (
        <div className="text-center pt-3">
          <QRCode value={url} renderAs="canvas" />
        </div>
      ) : (
        <>
        <div className="text-center pt-3">
            <p>Enter URL to generate QR code</p>
        </div>
        </>
      )}
    </div>
  </div>
</div>
</>
  );
}
