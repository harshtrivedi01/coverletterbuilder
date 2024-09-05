import React, { useState, useContext } from "react";
import { ResumeContext } from "./builder";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    if (selectedFile.size > 5000000) { // Example: limit file size to 5MB
      console.error("File too large.");
      return;
    }

    setFile(selectedFile); // Set the file for display

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target.result);
        setResumeData(parsedData);
      } catch (error) {
        console.error("Error parsing the resume file", error);
      }
    };

    reader.onerror = () => {
      console.error("File could not be read.");
    };

    reader.readAsText(selectedFile); // Read the file as text
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];

      if (!droppedFile) {
        console.error("No file dropped.");
        return;
      }

      if (droppedFile.size > 5000000) {
        console.error("Dropped file too large.");
        return;
      }

      setFile(droppedFile); // Set the dropped file for preview

      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const parsedData = JSON.parse(event.target.result);
          setResumeData(parsedData);
        } catch (error) {
          console.error("Error parsing the dropped file", error);
        }
      };

      reader.onerror = () => {
        console.error("Dropped file could not be read.");
      };

      reader.readAsText(droppedFile); // Read the dropped file as text
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Trigger file input when Browse button is clicked
  const handleBrowseClick = () => {
    document.getElementById("fileUpload").click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-screen-lg border border-dashed border-blue-500 p-8 rounded-lg bg-white shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6">How do you want to upload your resume?</h1>

        <div className="flex flex-col md:flex-row justify-around items-center">
          <div className="w-full mb-4 md:w-2/3 md:mb-0">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border border-dashed border-blue-500 p-6 rounded-lg h-40 flex items-center justify-center cursor-pointer hover:bg-blue-50 w-full"
            >
              {file ? (
                <span className="text-gray-500">{file.name}</span>
              ) : (
                <span className="text-gray-500">Drag and drop a file here</span>
              )}
            </div>

            <input
              type="file"
              id="fileUpload"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              onClick={handleBrowseClick}
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse
            </button>
          </div>

          <div className="flex flex-col space-y-4 w-full md:w-1/3">
            <button className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 w-full">
              <img src="/google-drive-icon.png" alt="" className="w-6 h-6 mr-2" />
              <span className="text-gray-700 whitespace-nowrap">Google Drive</span>
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 w-full">
              <img src="/dropbox-icon.png" alt="" className="w-6 h-6 mr-2" />
              <span className="text-gray-700 whitespace-nowrap">Dropbox</span>
            </button>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-4">Files we can read: DOC, DOCX, PDF, HTML, RTF, TXT</p>
      </div>

      <div className="mt-6 w-full max-w-screen-lg px-4 flex justify-between">
        <button className="w-1/3 px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
          Back
        </button>
        <button className="w-1/3 px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500">
          Next
        </button>
      </div>
    </div>
  );
};

export default UploadResume;
