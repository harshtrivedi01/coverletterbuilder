import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { ResumeContext } from "../../pages/builder";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Import Quill's styling

const Summary = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext) || { resumeData: {}, setResumeData: () => {} };

  const handleQuillChange = (value) => {
    // Directly store the HTML in the state if needed
    setResumeData((prevData) => ({
      ...prevData,
      summary: value, // Store the HTML directly if you want to keep formatting
    }));
  };

  return (
    <div className="flex-col-gap-2 mt-10">
      <div className="flex justify-between mb-2">
        <h2 className="input-title text-black text-3xl">Greeting</h2>
        <button
          type="button"
          className="border bg-black text-white px-3 rounded-3xl"
        >
          + AI Assist
        </button>
      </div>

      <div className="grid-4">
        <ReactQuill
          theme="snow"
          value={resumeData.summary || ""} // Ensure this is a string
          onChange={handleQuillChange}
          placeholder="Summary"
          className="h-40"
        />
      </div>
    </div>
  );
};

export default Summary;
