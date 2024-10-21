import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const Landingpage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedOption === "create") {
      router.push("/Createletterpage"); // Redirect to create letter page
    } else if (selectedOption === "upload") {
      router.push("/Createletterpage"); // Redirect to upload resume page
    }
  };

  return (
    <>
     <nav className="bg-gray-800 p-10 pe-40" >
    
      
    </nav>
      <div className="text-center  my-20">
     <p className="font-semibold text-3xl mb-4"> How long have you been working?</p>
      <p className="text-xl">We ll find the best templates for your experience level.</p>
      </div>
      

      <div className="flex gap-3 justify-center text-center">
        <div
          className={`border   rounded-md px-8 py-5  text-lg border-gray-700  cursor-pointer ${
            selectedOption === "create" ? "bg-blue-100 border-2 border-blue-500" : ""
          }`}
          onClick={() => setSelectedOption("create")}
        >
        
          No Experience
        </div>

        <div
          className={`border   rounded-md px-8 py-5  text-lg border-gray-700  cursor-pointer ${
            selectedOption === "upload" ? "bg-blue-100 border border-blue-500" : ""
          }`}
          onClick={() => setSelectedOption("upload")}
        >
        
          Less than 3 Years
        </div>

        <div
          className={`border   rounded-md px-14 py-5  text-lg border-gray-700  cursor-pointer ${
            selectedOption === "3year" ? "bg-blue-100 border-2 border-blue-500" : ""
          }`}
          onClick={() => setSelectedOption("3year")}
        >
        
         3-5 Years
        </div>

        <div
          className={`border   rounded-md px-14 py-5  text-lg border-gray-700  cursor-pointer ${
            selectedOption === "5year" ? "bg-blue-100 border-2 border-blue-500" : ""
          }`}
          onClick={() => setSelectedOption("5year")}
        >
        
        5-10 Years
        </div>

       
        <div
          className={`border   rounded-md px-14 py-5  text-lg border-gray-700  cursor-pointer ${
            selectedOption === "10year" ? "bg-blue-100 border-2 border-blue-500" : ""
          }`}
          onClick={() => setSelectedOption("10year")}
        >
        
        10+ Years
        </div>
      </div>

      <div className="flex px-60 my-20 mt-40 justify-between text-center">
        <button className="border-2 rounded-full p-2 px-10 text-lg font-bold border-blue-800 text-blue-800">
         Back
        </button>

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
    </>
  );
};

export default Landingpage;
