// // import React, { useState } from 'react';
// // import { useRouter } from 'next/router'; // Import the useRouter hook

// // const UploadResume = () => {
// //   const [selectedCard, setSelectedCard] = useState(null);
// //   const router = useRouter(); // Initialize the router

// //   const handleCardSelect = (card) => {
// //     setSelectedCard(card);
// //   };

// //   const handleNext = () => {
// //     if (selectedCard) {
// //       // Navigate based on the selected card
// //       if (selectedCard === 'upload') {
// //         router.push('/UploadResume'); // Redirect to the UploadResume page
// //       } else if (selectedCard === 'start') {
// //         router.push('/builder'); // Redirect to the index page
// //       }
// //     } else {
// //       alert('Please select a card before proceeding.');
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center  bg-gray-100">
// //       <h1 className="text-2xl font-bold mb-4 mt-32">Are you uploading an existing resume?</h1>
// //       <p className="text-gray-600 mb-5">Just review, edit, and update it with new information</p>
// //       <div className="flex space-x-4 my-10">
// //         <div
// //           className={`border ${selectedCard === 'upload' ? 'border-blue-500' : 'border-gray-300'} bg-white rounded-lg p-6 h-60 text-center w- shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
// //           onClick={() => handleCardSelect('upload')}
// //         >
// //           <div className="mb-4">
// //             <svg className="mx-auto h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4m-2 0v16m-4-8H4M4 8h16" />
// //             </svg>
// //           </div>
// //           <h2 className="text-lg font-semibold mb-2">Yes, upload from my resume</h2>
// //           <p className="text-gray-500">We’ll give you expert guidance to fill out your info and enhance your resume,<br/> from start to finish</p>
// //         </div>

// //         <div
// //           className={`border ${selectedCard === 'start' ? 'border-blue-500' : 'border-gray-300'} bg-white rounded-lg p-6 h-60 text-center  shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
// //           onClick={() => handleCardSelect('start')}
// //         >
// //           <div className="mb-4">
// //             <svg className="mx-auto h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// //             </svg>
// //           </div>
// //           <h2 className="text-lg font-semibold mb-2">No, start from scratch</h2>
// //           <p className="text-gray-500">We’ll guide you through the whole process so your skills can shine</p>
// //         </div>
// //       </div>
// //       <div className="flex justify-between my-8 w-full px-40 mb-28">
// //         <button className="px-16 py-1 border-2 bg-white text-lg border-blue-800 text-blue-700 rounded-3xl hover:bg-gray-300">Back</button>
// //         <button className="px-16 py-2 bg-yellow-400 text-lg rounded-3xl hover:bg-yellow-500" onClick={handleNext}>Next</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UploadResume;


// import React, { useState } from 'react';
// import { useRouter } from 'next/router'; // Import the useRouter hook

// const UploadResume = () => {
//   const [selectedCard, setSelectedCard] = useState(null);
//   const router = useRouter(); // Initialize the router

//   const handleCardSelect = (card) => {
//     setSelectedCard(card);
//   };

//   const handleNext = () => {
//     if (selectedCard) {
//       // Navigate based on the selected card
//       if (selectedCard === 'upload') {
//         router.push('/UploadResume'); // Redirect to the UploadResume page
//       } else if (selectedCard === 'start') {
//         router.push('/builder'); // Redirect to the index page
//       }
//     } else {
//       alert('Please select a card before proceeding.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center  bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4 mt-32">Are you uploading an existing resume?</h1>
//       <p className="text-gray-600 mb-5">Just review, edit, and update it with new information</p>
//       <div className="flex space-x-4 my-10">
//         <div
//           className={`border ${selectedCard === 'upload' ? 'border-blue-500' : 'border-gray-300'} bg-white rounded-lg p-6 h-60 text-center w- shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
//           onClick={() => handleCardSelect('upload')}
//         >
//           <div className="mb-4">
//             <svg className="mx-auto h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4m-2 0v16m-4-8H4M4 8h16" />
//             </svg>
//           </div>
//           <h2 className="text-lg font-semibold mb-2">Yes, upload from my resume</h2>
//           <p className="text-gray-500">We’ll give you expert guidance to fill out your info and enhance your resume,<br/> from start to finish</p>
//         </div>

//         <div
//           className={`border ${selectedCard === 'start' ? 'border-blue-500' : 'border-gray-300'} bg-white rounded-lg p-6 h-60 text-center  shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
//           onClick={() => handleCardSelect('start')}
//         >
//           <div className="mb-4">
//             <svg className="mx-auto h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//             </svg>
//           </div>
//           <h2 className="text-lg font-semibold mb-2">No, start from scratch</h2>
//           <p className="text-gray-500">We’ll guide you through the whole process so your skills can shine</p>
//         </div>
//       </div>
//       <div className=" my-8 w-full px-40 mb-28">
       
//         <button className="px-16 py-2 bg-yellow-400 text-lg rounded-3xl hover:bg-yellow-500 float-end" onClick={handleNext}>Next</button>
//       </div>

      
//     </div>
//   );
// };

// export default UploadResume;


// import Link from 'next/link';
// import React from 'react';  
// import { useRouter } from 'next/router';
// const UploadResume = () => {  

//   const router = useRouter();
//   const handleNext = () => {
       
//             router.push('/Landingpage'); // Redirect to the index page
         
//       };
//   return (  
//    <div className="h-screen bg-gray-100 flex justify-center items-center">  
//     <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">  
//       <h1 className="text-3xl font-bold text-gray-900">Welcome to our AI Cover-Letter Builder!</h1>  
//       <p className="text-lg text-gray-600">Discover the Power of AI Cover-Letter Builder</p>  

//       <button  
//        className="bg-orange-500 hover:bg-orange-700 mt-5 text-white font-bold py-2 px-4 rounded"  
//       onClick={handleNext}
//       >  
//        Get Started  
//       </button> 
//     </div>  
//    </div>  
//   );  
// };  
  
// export default UploadResume;



import { FaCloudUploadAlt } from "react-icons/fa";
import React, { useContext, useState } from "react";
import axios from 'axios';
import { ResumeContext } from "../pages/builder";
import { toast } from 'react-toastify';
import Navbarcoverletter from "../components/coverletter/Navbarcoverletter";
import { useRouter } from "next/router";
import Link from "next/link";

const UploadResume = () => {
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
              <div   className=" p-10 border border-black rounded-lg shadow-lg shadow-blue-100"          
              >
                  {/*  className={` p-10 border border-black rounded-lg shadow-lg shadow-blue-100 ${
                selectedOption === "upload" ? "bg-blue-100 border-2 border-blue-800 font-semibold" : ""
              }`}
               onClick={() => {
                setSelectedOption("upload");
                handleContinue();
              }} */}
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

export default UploadResume;
