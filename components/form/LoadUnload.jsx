import { FaCloudUploadAlt } from "react-icons/fa";
import React, { useContext, useState } from "react";
import axios from 'axios';
import { ResumeContext } from "../../pages/builder";
import { toast } from 'react-toastify';
import Navbarcoverletter from "../coverletter/Navbarcoverletter";
import { useRouter } from "next/router";
import Link from "next/link";

const LoadUnload = () => {
  const { setResumeData } = useContext(ResumeContext);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [activeTab, setActiveTab] = useState("none"); // New state to track the active tab
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option for continue button
  const router = useRouter();
  const token = "YOUR_TOKEN_HERE";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    if (file.type !== 'application/pdf') {
      toast.error("Please upload a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append('files', file);

    setLoading(true);
    try {
      const response = await axios.post('https://api.novajobs.us/resume-builder/resume-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          toast.info(`Upload progress: ${percentCompleted}%`);
        }
      });

      const resumeData = response.data.data[0];
      if (!resumeData || !resumeData.resume_parse_data) {
        toast.error("Resume data not found in API response");
        setLoading(false);
        return;
      }

      const parsedData = JSON.parse(resumeData.resume_parse_data);
      setResumeData(parsedData.templateData);
      localStorage.setItem('resumeData', JSON.stringify(parsedData.templateData));
      localStorage.setItem('resumeId', resumeData.id);
      localStorage.setItem('location', resumeData.file_path);

      toast.success("File uploaded successfully");
      setIsUploaded(true); // Hide overlay after successful upload
      setShowOverlay(false); // Close the popup
      setLoading(false);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("File upload failed");
      setLoading(false);
    }
};

  const handleUploadResumeClick = () => {
    setActiveTab("uploadResume");
  };

  const handleBack = () => {
    setActiveTab("none");
  };

  const handleContinue = () => {
    if (selectedOption === "create") {
     
      localStorage.setItem('startFromScratch', 'true');
      router.push("/Landingpage"); 

    } else if (selectedOption === "upload") {
      setActiveTab("uploadResume"); // Show upload resume tab
    }
  };

  
  return (
    <>
    
      {showOverlay && !isUploaded && activeTab === "none" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white justify-center  w-full h-full rounded-lg shadow-lg text-center">
          <nav className="bg-gray-800 p-10 pe-40" ></nav>
            <h1 className="text-3xl font-bold mb-4 mt-20">How do you want to start your cover letter?</h1>
            <div className="flex justify-center gap-5 pt-5">
              <div   
              
              className={`px-36 p-10 border border-black rounded-lg shadow-lg shadow-blue-100 ${
                selectedOption === "create" ? "bg-blue-100 border-2 border-blue-800 font-semibold" : ""
              }`}
              onClick={() => setSelectedOption("create")}
              
              >
                <div>
                  <div className="mb-4 text-6xl">📝</div>
                  <h2 className="text-2xl font-semibold mb-2">Create a new letter</h2>
                  <p className="text-gray-500">Walk me through each step.</p>
                </div>
              </div>
              <div 
              className={` p-10 border border-black rounded-lg shadow-lg shadow-blue-100 ${
                selectedOption === "upload" ? "bg-blue-100 border-2 border-blue-800 font-semibold" : ""
              }`}
               onClick={() => {
                setSelectedOption("upload");
                handleContinue();
              }}
              >
                <div className="mb-4 text-6xl">📤</div>
                <h2 className="text-lg font-semibold mb-2">Upload from resume</h2>
                <p className="text-gray-500 mb-5">Create my Cover-Letter with info from an existing resume</p>
             
              </div>
            </div>

            <div className="flex px-60 my-20 justify-between text-center">
        <Link  href="/Landingpage">
        <button className="border-2 rounded-full p-2 px-10 text-lg font-bold border-blue-800 text-blue-800">
         Back
        </button>
        </Link>
        

        <button
          className={`rounded-full p-2 px-10 text-lg font-bold text-black ${
            selectedOption ? "bg-yellow-500 cursor-pointer" : "bg-gray-300"
          }`}
          disabled={!selectedOption}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
          </div>
        </div>
      )}

      {activeTab === "uploadResume" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white justify-center p-4 w-full h-full rounded-lg shadow-lg text-center">
            <button
              className="border-2 rounded-full p-2 px-10 mb-4 text-lg font-bold border-blue-800 text-blue-800"
              onClick={handleBack}
            >
              Back
            </button>
            <label className="p-2 text-white bg-gray-500 rounded cursor-pointer hover:bg-blue-600 transition">
              <FaCloudUploadAlt className="inline-block mr-2 text-gray-" />
              <span>Select Cover-Letter (PDF)</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf"
              />
            </label>
            <button
              className={`p-2 mt-4 w-full text-blue-800 bg-white border-blue-800 border rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600 transition'}`}
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Cover-Letter'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadUnload;
