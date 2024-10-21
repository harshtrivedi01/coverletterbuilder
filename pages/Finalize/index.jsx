import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbarcoverletter from "../../components/coverletter/Navbarcoverletter";
import Link from "next/link";
const Finalize = () => {

  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedOption === "create") {
      router.push("/builder"); // Redirect to create letter page
    } else if (selectedOption === "upload") {
      router.push("/builder"); // Redirect to upload resume page
    }
  };
  return (
    <>
    <Navbarcoverletter/>
      <div className="text-center my-16">
     <h3 className=" font-semibold text-3xl"> Do you have a gap in your work history that you <br/> want to explain in your letter?</h3>
    
     
      <p className="text-xl my-3 font-light"> If you were out of work due to COVID-19 or another reason, we ll help explain it in your letter.</p>
      </div>

      <div className="flex gap-10 justify-center text-center mb-60">
        <div
          className={`border p-5 px-20 rounded-2xl border-blue-700 bg-stone-50 cursor-pointer ${
            selectedOption === "create" ? "bg-blue-100 border-2 border-blue-800 font-semibold" : ""
          }`}
          onClick={() => setSelectedOption("create")}
        >
         Yes
        </div>

        <div
          className={`border p-5 px-20 rounded-2xl border-blue-700 bg-stone-50 cursor-pointer ${
            selectedOption === "upload" ? "bg-blue-100 border-2 border-blue-800 font-semibold" : ""
          }`}
          onClick={() => setSelectedOption("upload")}
        >
         No
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
    </>
  );
};

export default Finalize;
