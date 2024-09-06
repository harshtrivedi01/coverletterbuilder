import { FaCloudUploadAlt, FaCloudDownloadAlt } from "react-icons/fa";
import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import jsPDF from 'jspdf';

const LoadUnload = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // Load backup resume data
  const handleLoad = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target.result);
        setResumeData(parsedData);
        alert('Data loaded successfully!');
      } catch (error) {
        alert('Failed to load data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  // Download resume data as PDF
  const handleDownload = (data, filename, event) => {
    event.preventDefault();
    try {
      const doc = new jsPDF();
      doc.text('Resume Data:', 10, 10);
      doc.text(JSON.stringify(data, null, 2), 10, 20);
      doc.save(filename);
      alert('Data saved successfully!');
    } catch (error) {
      alert('Failed to save data. Please try again.');
    }
  };

  const filename = resumeData.name ? `${resumeData.name} by ATSResume.pdf` : 'resumeData.pdf';

  return (
    <div className="flex flex-wrap gap-4 mb-2 justify-center">
      <div className="inline-flex flex-row items-center gap-2">
        <h2 className="text-[1.2rem] text-black">Load Data</h2>
        <label className="p-2 text-black bg-yellow-500 rounded cursor-pointer">
          <FaCloudUploadAlt className="text-[1.2rem] text-black" />
          <input
            aria-label="Load Data"
            type="file"
            className="hidden"
            onChange={handleLoad}
            accept=".json"
          />
        </label>
      </div>
      <div className="inline-flex flex-row items-center gap-2">
        <h2 className="text-[1.2rem] text-black">Save Data</h2>
        <button
          aria-label="Save Data"
          className="p-2 text-black bg-yellow-500 rounded"
          onClick={(event) =>
            handleDownload(resumeData, filename, event)
          }
        >
          <FaCloudDownloadAlt className="text-[1.2rem] text-black" />
        </button>
      </div>
    </div>
  );
};

export default LoadUnload;
