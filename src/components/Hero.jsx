import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Hero.css";

const Hero = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create a preview URL for the image
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleDenoise = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsLoading(true);

    try {
      console.log("Sending request to API...");
      const response = await fetch("http://[2409:40e0:2b:97a4:328a:d45f:5c4f:85a3]:8080/predict/", {
        method: "POST",
        body: formData,
      });

      console.log("Response received:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Parsed result:", result);
      
      // Assuming the API returns the base64 image in the 'denoised_image' field
      navigate("/result", { state: { denoisedImage: result.image } });
    } catch (error) {
      console.error("Error during denoising:", error);
      console.error("Error details:", error.message, error.stack);
      alert(`An error occurred while denoising the image: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="hero-container">
        <div className="hero-content">
          <h1>Upload Image to Denoise</h1>
          <label htmlFor="file" className="custum-file-upload">
            {previewUrl ? (
              <img src={previewUrl} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            ) : (
              <>
                <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g  
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                        fill=""
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="text">
                  <span>Click to upload image</span>
                </div>
              </>
            )}
            <input id="file" type="file" onChange={handleFileChange} accept="image/*" />
          </label>
          {selectedFile && (
            <p className="selected-file-name">Selected: {selectedFile.name}</p>
          )}
          <button className="denoise-button" onClick={handleDenoise} disabled={isLoading || !selectedFile}>
            {isLoading ? "Processing..." : "Denoise"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
