import { FaCloudUploadAlt, FaCloudDownloadAlt } from "react-icons/fa";
import React, { useContext, useState } from "react";
import axios from 'axios';
import { ResumeContext } from "../../pages/builder";
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';

const LoadUnload = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3R5cGVfaWQiOjEsImlkIjoyNCwiZW1haWwiOiJ0ZXN0dXNlckBnbWFpbC5jb20iLCJleHAiOjE3MzExNDc2MDd9.b9OyMqxVCxpzrwnESn5hNruKzbElCh0xFR30h9q0VFI";

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
      const response = await axios.post('https://api.sentryspot.co.uk/api/jobseeker/resume-upload', formData, {
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
      console.log("Parsed Resume Data:", parsedData);

      setResumeData(parsedData.templateData);
      localStorage.setItem('resumeData', JSON.stringify(parsedData.templateData));
      localStorage.setItem('resumeId', resumeData.id);
      localStorage.setItem('location', resumeData.file_path);

      toast.success("File uploaded successfully");
      setLoading(false);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("File upload failed");
      setLoading(false);
    }
  };

  const handleLoad = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    if (file.type === "application/json") {
      reader.onload = (event) => {
        try {
          const parsedData = JSON.parse(event.target.result);
          setResumeData(parsedData);
          toast.success('JSON data loaded successfully!');
        } catch (error) {
          toast.error('Failed to load JSON data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    } else if (file.type === "application/pdf") {
      reader.onload = (event) => {
        const text = event.target.result;
        const parsedData = {
          name: extractDataFromText(text, 'Name:'),
          position: extractDataFromText(text, 'Position:'),
          contactInformation: extractDataFromText(text, 'Contact Information:')
        };
        setResumeData(parsedData);
        toast.success('PDF data loaded successfully!');
      };
      reader.readAsText(file);
    } else {
      toast.error("Unsupported file type. Please upload a JSON or PDF file.");
    }
  };

  const extractDataFromText = (text, keyword) => {
    const lines = text.split("\n");
    for (const line of lines) {
      if (line.startsWith(keyword)) {
        return line.replace(keyword, '').trim();
      }
    }
    return '';
  };

  const handleDownload = (data, filename, event) => {
    event.preventDefault();
    try {
      const doc = new jsPDF();
      doc.text('Resume Data:', 10, 10);
      doc.text(JSON.stringify(data, null, 2), 10, 20);
      doc.save(filename);
      toast.success('Data saved successfully!');
    } catch (error) {
      toast.error('Failed to save data. Please try again.');
    }
  };

  const filename = resumeData.name ? `${resumeData.name} by ATSResume.pdf` : 'resumeData.pdf';

  return (
    <div className="flex flex-wrap gap-4 mb-2 justify-center">
      <div className="inline-flex flex-row items-center gap-2">
        <h2 className="text-[1.2rem] text-black">Upload resume</h2>
        <label className="p-2 text-black bg-yellow-500 rounded cursor-pointer">
          <FaCloudUploadAlt className="text-[1.2rem] text-black" />
          <input
            aria-label="Load Data"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".json, .pdf"
          />
        </label>
        <button
          aria-label="Upload Data"
          className="p-2 text-black bg-green-500 rounded"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      <div className="inline-flex flex-row items-center gap-2">
        <h2 className="text-[1.2rem] text-black">Save Data</h2>
        <button
          aria-label="Save Data"
          className="p-2 text-black bg-yellow-500 rounded"
         
        >
          <FaCloudDownloadAlt className="text-[1.2rem] text-black" />
        </button>
      </div>
    </div>
  );
};

export default LoadUnload;
