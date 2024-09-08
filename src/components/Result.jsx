import { useLocation } from "react-router-dom";
import "./css/Result.css";

const Result = () => {
  const location = useLocation();
  const denoisedImage = location.state?.denoisedImage;

  if (!denoisedImage) {
    return <div>No denoised image available. Please try again.</div>;
  }

  const handleDownload = () => {
    // Create a link element
    const link = document.createElement('a');
    
    // Set the href to the data URL
    link.href = `data:image/jpeg;base64,${denoisedImage}`;
    
    // Set the download attribute with a filename
    link.download = 'denoised_image.jpg';
    
    // Append to the body
    document.body.appendChild(link);
    
    // Programmatically click the link to trigger the download
    link.click();
    
    // Remove the link from the document
    document.body.removeChild(link);
  };

  return (
    <div className="result-container">
      <h2>Denoised Image</h2>
      <img src={`data:image/jpeg;base64,${denoisedImage}`} alt="Denoised" className="denoised-image" />
      <button onClick={handleDownload} className="download-button">Download Denoised Image</button>
    </div>
  );
};

export default Result;
