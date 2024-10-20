import React, { useState, useRef, createContext } from "react";
import Language from "../components/form/Language";
import Meta from "../components/meta/Meta";
import LoadUnload from "../components/form/LoadUnload";
import dynamic from "next/dynamic";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import SocialMedia from "../components/form/SocialMedia";
import WorkExperience from "../components/form/WorkExperience";
import Skill from "../components/form/Skill";
import PersonalInformation from "../components/form/PersonalInformation";
import Summary from "../components/form/Summary";
import Projects from "../components/form/Projects";
import Education from "../components/form/Education";
import Certification from "../components/form/certification";
import ColorPicker from './ColorPicker';
import ColorPickers from "./ColorPickers";
import Preview from "../components/preview/Preview";
import TemplateSelector from "../components/preview/TemplateSelector";
import { FaDownload } from "react-icons/fa";
import { ImFont } from "react-icons/im";

const html2pdf = dynamic(() => import("html2pdf.js"), { ssr: false });

const ResumeContext = createContext(DefaultResumeData);

const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function Builder(props) {
  const [resumeData, setResumeData] = useState(DefaultResumeData);
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedFont, setSelectedFont] = useState("Ubuntu");
  const [headerColor, setHeaderColor] = useState('');
  const [backgroundColorss, setBgColor] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const previewRef = useRef();

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({ ...resumeData, profilePicture: event.target.result });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const sections = [
    // { label: "Details", component: <PersonalInformation /> },
    // { label: "Social Media", component: <SocialMedia /> },
    // { label: "Summary", component: <Summary /> },
    // { label: "Education", component: <Education /> },
    // { label: "Work Experience", component: <WorkExperience /> },
    // { label: "Projects", component: <Projects /> },
    // { label: "Skills", component: Array.isArray(resumeData?.skills) ? resumeData.skills.map((skill, index) => <Skill title={skill.title} key={index} />) : <p>No skills available</p> },
    // { label: "Language", component: <Language /> },
    // { label: "Certification", component: <Certification /> },

    { label: "Name & contact", component: <PersonalInformation /> },
    { label: "Date", component: <Education />},
    { label: "Summary", component: <Summary /> },
    { label: "Recipient",  component:  <Language />   },
    { label: "Subject",  },
    { label: "Greeting", },
    { label: "Opening",  },
    { label: "Letter Body",},
    { label: "Call To Action",  },
    { label: "Closing", }, 
    { label: "Call To Action",  },
  ];

  const handleNext = () => {
    if (currentSection === sections.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const handleSectionClick = (index) => {
    setCurrentSection(index);
    setIsPopupOpen(true);
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const downloadAsPDF = async () => {
    const element = previewRef.current;
    const html2pdfModule = (await import("html2pdf.js")).default;
    const opt = {
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      html2canvas: { scale: 2 },
    };
    html2pdfModule()
      .from(element)
      .set(opt)
      .toPdf()
      .get('pdf')
      .then(pdf => {
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(10);
          pdf.text(`Page ${i} of ${totalPages}`, 10, pdf.internal.pageSize.height - 10);
        }
      })
      .save();
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData,
          handleProfilePicture,
          handleChange,
          headerColor,
          backgroundColorss,
        }}
      >
        <Meta
          title="ATSResume | Get hired with an ATS-optimized resume"
          description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
          keywords="ATS-friendly, Resume optimization..."
        />

        {!isFinished && (
          <>
   <nav className="bg-blue-950 p-7 pe-40 mb-5" ></nav>

            {/*<LoadUnload /> 
            <div className="flex justify-between bg-gray-200 p-2 px-5">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="rounded-lg border-2 bg-blue-950 text-white px-10 py-1"
              >
                Previous
              </button>
              <div className="flex gap-3 justify-between bg-gray-200 p-1 px-5">
                <select
                  value={selectedFont}
                  onChange={handleFontChange}
                  className="rounded-lg border-2 border-blue-800 px-8 p- font-bold text-blue-800"
                >
                  <option value="Ubuntu">Ubuntu</option>
                  <option value="Calibri">Calibri</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                </select>
                <ColorPicker selectedColor={headerColor} onChange={setHeaderColor} />
                <ColorPickers selectmultiplecolor={backgroundColorss} onChange={setBgColor} />
                <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate}/>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="rounded-lg px-10 font-bold bg-yellow-500 text-black p-1"
              >
                {currentSection === sections.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
*/}
            <div className={`flex px-40 gap-2 md:flex-row justify-evenly md:mx-auto md:h-screen overflow-y-auto`} style={{ fontFamily: selectedFont }}>
              <aside className="w-2/12 p-4 exclude-print h-screen overflow-y-auto">
                <p className="border-b-2 border-black font-bold py-4">Letter Sections</p>
                <ul className="space-y-2 text-center mt-5">
                  {sections.map((section, index) => (
                    <li
                      key={index}
                      style={{ fontFamily: 'ubuntu' }}
                      className={`p-2 cursor-pointer ${currentSection === index ? "border-dashed border-2 border-blue-400 text-blue-900" : "text-blue-800"}`}
                      onClick={() => handleSectionClick(index)}
                    >
                      {section.label}
                    </li>
                  ))}
                  <li className="border-t-2 border-black font-bold py-4">+ Add Section</li>
                </ul>
              </aside>
              <div id="preview-section" className="bg-white" ref={previewRef}>
                <Preview selectedTemplate={selectedTemplate} />
              </div>
              <div className="w-2/12 flex-col  px-3">
             

              <button
                type="button"
                onClick={downloadAsPDF}
                className="flex font-bold"
              >
              <FaDownload />  Download 
              </button> 
              <br/>
             
              <Print /> <br/>
                <ColorPicker selectedColor={headerColor} onChange={setHeaderColor} /> <br/>
                <ColorPickers selectmultiplecolor={backgroundColorss} onChange={setBgColor} /> <br/>
                <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate}/><br/>
                <button className="rounded-3xl border-2 border-blue-800 px-7 py-2 font-bold bg-white text-blue-800"> Finsh Letter</button>
            
              </div>

            
              
            </div>
            

            {isPopupOpen && (
              <div className="fixed overflow-scroll inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 pt-40 w-4/6  rounded shadow overflow-scroll">
                  {/* Render all forms in a single popup */}
                  {sections.map((section, index) => (
                    <div key={index}>
                    
                      {section.component}
                    </div>
                  ))}
                  <button
                    className="mt-4 w-full bg-yellow-500 font-semibold text-white rounded py-2"
                    onClick={handleClosePopup}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </>
        )}

{isFinished && (
          <div className="p-">
            <div className="flex justify-between bg-gray-200 p-2 px-5">
              {/* Font Selection Dropdown */}
              

              <div className="flex gap-2 justify-center bg-gray-200  ">
              <select
                value={selectedFont}
                onChange={handleFontChange}
              className="rounded-lg border-2 border-blue-800 px-8 p-2 font-bold  bg-white text-blue-800"
              >
                <option value="Ubuntu">Ubuntu</option>
                <option value="Calibri">Calibri</option>
                <option value="Georgia">Georgia</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
              </select>
                <ColorPicker selectedColor={headerColor} onChange={setHeaderColor} />
                <ColorPickers selectmultiplecolor={backgroundColorss} onChange={setBgColor} />
                <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate}/>
                <button
                type="button"
                onClick={downloadAsPDF}
                className="rounded-lg border-2 border-blue-800 px-8 p-2 font-bold  bg-white text-blue-800"
              >
                Download 
              </button>
              <Print />
              </div>

              {/* Download PDF Button */}
              
            </div>

           

            {/* Show only the preview */}
            <div className="mt-5 bg-white" ref={previewRef}>
            <Preview selectedTemplate={selectedTemplate} />
            </div>
          </div>
        )}
      </ResumeContext.Provider>
    </>
  );
}
export { ResumeContext };