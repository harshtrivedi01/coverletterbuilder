import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Import Quill's styling

const Summary = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // Function to strip HTML tags
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const handleQuillChange = (value) => {
    const plainText = stripHtml(value); // Get plain text without HTML
    setResumeData((prevData) => ({
      ...prevData,
      summary: plainText, // Store plain text in resumeData
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
          value={resumeData.summary}
          onChange={handleQuillChange}
          placeholder="Summary"
          className="h-40"
        />
      </div>
    </div>
  );
};

export default Summary;
