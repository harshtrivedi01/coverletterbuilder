import React, { useState, createContext, useContext } from "react";
import Language from "../components/form/Language";
import Meta from "../components/meta/Meta";
import FormCP from "../components/form/FormCP";
import LoadUnload from "../components/form/LoadUnload";
import Preview from "../components/preview/Preview";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import SocialMedia from "../components/form/SocialMedia";
import WorkExperience from "../components/form/WorkExperience";
import Skill from "../components/form/Skill";
import PersonalInformation from "../components/form/PersonalInformation";
import Summary from "../components/form/Summary";
import Projects from "../components/form/Projects";
import Education from "../components/form/Education";
import dynamic from "next/dynamic";
import Certification from "../components/form/certification";
import ColorPicker from './ColorPicker';
import ColorPickers from "./ColorPickers";

const ResumeContext = createContext(DefaultResumeData);

// server side rendering false
const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function Builder(props) {
  // resume data
  const [resumeData, setResumeData] = useState(DefaultResumeData);

  // form hide/show
  const [formClose, setFormClose] = useState(false);

  // current section index
  const [currentSection, setCurrentSection] = useState(0);

  // selected font
  const [selectedFont, setSelectedFont] = useState("Ubuntu");
  const [headerColor, setHeaderColor] = useState('');
  const [backgroundColorss, setBgColor] = useState('');
  // profile picture
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
    console.log(resumeData);
  };

  const sections = [
    { label: "Load/Unload", component: <LoadUnload /> },
    { label: "Personal Information", component: <PersonalInformation /> },
    { label: "Social Media", component: <SocialMedia /> },
    { label: "Summary", component: <Summary /> },
    { label: "Education", component: <Education /> },
    { label: "Work Experience", component: <WorkExperience /> },
    { label: "Projects", component: <Projects /> },
    { label: "Skills", component: resumeData.skills.map((skill, index) => <Skill title={skill.title} key={index} />) },
    { label: "Language", component: <Language /> },
    { label: "Certification", component: <Certification /> },
  ];

  const handleNext = () => {
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const handleSectionClick = (index) => {
    setCurrentSection(index);
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
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
          description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes. Our platform uses the latest technology to analyze and optimize your resume for maximum visibility and success with applicant tracking systems. Say goodbye to frustration and wasted time spent on manual resume formatting. Create your winning resume with ATSResume today and get noticed by employers."
          keywords="ATS-friendly, Resume optimization, Keyword-rich resume, Applicant Tracking System, ATS resume builder, ATS resume templates, ATS-compliant resume, ATS-optimized CV, ATS-friendly format, ATS resume tips, Resume writing services, Career guidance, Job search in India, Resume tips for India, Professional resume builder, Cover letter writing, Interview preparation, Job interview tips, Career growth, Online job applications, resume builder, free resume builder, resume ats, best free resume builder, resume creator, resume cv, resume design, resume editor, resume maker"
        />
        <div className="flex justify-between bg-gray-200 p-2 px-5">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="rounded-3xl px-10 bg-blue-950 text-white p-3"
          >
            Previous
          </button>

          {/* Font Selection Dropdown */}
          <select
            value={selectedFont}
            onChange={handleFontChange}
            className="rounded-3xl px-10 font-bold bg-white text-black p-3"
          >
            <option value="Ubuntu">Ubuntu</option>
            <option value="Calibri">Calibri</option>
            <option value="Georgia">Georgia</option>
            <option value="Roboto">Roboto</option>
            <option value="Poppins">Poppins</option>
          </select>
          <div className="flex justify-between bg-gray-200 p-2 px-5">
            {/* Add the ColorPicker component here */}
            <ColorPicker selectedColor={headerColor} onChange={setHeaderColor} />
            <ColorPickers selectmultiplecolor={backgroundColorss} onChange={setBgColor} />
          </div>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentSection === sections.length - 1}
            className="rounded-3xl px-10 font-bold bg-yellow-500 text-black p-3"
          >
            Next
          </button>
        </div>

        <div className={`f-col gap-2 md:flex-row justify-evenly md:mx-auto md:h-screen overflow-y-auto`} style={{ fontFamily: selectedFont }}>
          {!formClose && (
            <div className="flex w-full md:w-3/5">
              <aside className="w-3/5 p-4 bg-gray-100 exclude-print h-screen overflow-y-auto">
                <ul className="space-y-2">
                  {sections.map((section, index) => (
                    <li
                      key={index}
                      className={`p-2 cursor-pointer ${
                        currentSection === index
                          ? "bg-blue-950 rounded-lg text-white"
                          : "bg-gray-200 text-black rounded-lg"
                      }`}
                      onClick={() => handleSectionClick(index)}
                    >
                      {section.label}
                    </li>
                  ))}
                </ul>
              </aside>
              <form className="p-4 bg-gray-200 exclude-print w-4/5 h-screen overflow-y-auto">
                {sections[currentSection].component}
              </form>
            </div>
          )}
          <Preview />
        </div>
        <FormCP formClose={formClose} setFormClose={setFormClose} />
        <Print />
      </ResumeContext.Provider>
    </>
  );
}

export { ResumeContext };
