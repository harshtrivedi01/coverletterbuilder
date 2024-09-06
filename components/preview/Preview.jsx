/* eslint-disable react/jsx-no-undef */
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube, FaBold, FaItalic, FaPlus, FaMinus, FaAlignLeft, FaAlignCenter, FaAlignRight,FaLink,
  FaUnderline,
} from "react-icons/fa";

import { CgWebsite } from "react-icons/cg";

import React, { useContext, useState } from "react";
import { ResumeContext } from "../../pages/builder";
import dynamic from "next/dynamic";

import { HighlightMenu } from "react-highlight-menu";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";
import Template6 from "./Template6";
import Template7 from "./Template7";
import Template8 from "./Template8";
import Template9 from "./Template9";
import Template10 from "./Template10";
import Template11 from "./Template11";
import Template12 from "./Template12";
import Template13 from "./Template13";
import Template14 from "./Template14";
import Template15 from "./Template15";

// Importing draggable components dynamically
const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext), { ssr: false });
const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false });

const Preview = () => {
  const { resumeData, setResumeData,headerColor } = useContext(ResumeContext);
  const [content, setContent] = useState(resumeData);
  const [selectedTemplate, setSelectedTemplate] = useState('template1'); // State to hold the selected template

  const icons = [
    { name: "github", icon: <FaGithub /> },
    { name: "linkedin", icon: <FaLinkedin /> },
    { name: "twitter", icon: <FaTwitter /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "instagram", icon: <FaInstagram /> },
    { name: "youtube", icon: <FaYoutube /> },
    { name: "website", icon: <CgWebsite /> },
  ];

  // Sample templates
  const templates = {
    template1: (
  <div>
    <Template1/>
  </div>
    ),

    template2: (
      <div>
      <Template2/>
      </div>
    ),

    template3: (
     <div><Template3/></div>
    ),

    template4: (
     <div>
      <Template4/>
     </div>
    ),
    template5: (

      <div><Template5/></div>
    ),
    template6: (
<div><Template6/></div>
      
    ),

    template7: (
     <div><Template7/></div>
    ),

    template8: (
      <div><Template8/></div>
    ),

    template9: (
      <div><Template9/></div>
    ),

    template10: (
      <div><Template10/></div>
    ),

    template11: (
     <div><Template11/></div>
    ),

    template12: (
      <div><Template12/></div>
    ),

    template13: (
     <div><Template13/></div>
    ),
    template14: (
      <div><Template14/></div>
    ),
    template15: (
<div><Template15/></div>
    ),
    // Add more templates here
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (source.droppableId === "work-experience") {
      const newWorkExperience = [...resumeData.workExperience];
      const [removed] = newWorkExperience.splice(source.index, 1);
      newWorkExperience.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, workExperience: newWorkExperience });
    }

    if (source.droppableId.includes("WORK_EXPERIENCE_KEY_ACHIEVEMENT")) {
      const newWorkExperience = [...resumeData.workExperience];
      const workExperienceIndex = parseInt(source.droppableId.split("-")[1]);
      const keyAchievements =
        newWorkExperience[workExperienceIndex].keyAchievements.split("\n");
      const [removed] = keyAchievements.splice(source.index, 1);
      keyAchievements.splice(destination.index, 0, removed);
      newWorkExperience[workExperienceIndex].keyAchievements =
        keyAchievements.join("\n");
      setResumeData({ ...resumeData, workExperience: newWorkExperience });
    }

    if (source.droppableId === "skills") {
      const newSkills = [...resumeData.skills];
      const [removed] = newSkills.splice(source.index, 1);
      newSkills.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, skills: newSkills });
    }

    if (source.droppableId.includes("projects")) {
      const newProjects = [...resumeData.projects];
      const [removed] = newProjects.splice(source.index, 1);
      newProjects.splice(destination.index, 0, removed);
      setResumeData({ ...resumeData, projects: newProjects });
    }

    if (source.droppableId.includes("PROJECTS_KEY_ACHIEVEMENT")) {
      const newProjects = [...resumeData.projects];
      const projectIndex = parseInt(source.droppableId.split("-")[1]);
      const keyAchievements =
        newProjects[projectIndex].keyAchievements.split("\n");
      const [removed] = keyAchievements.splice(source.index, 1);
      keyAchievements.splice(destination.index, 0, removed);
      newProjects[projectIndex].keyAchievements = keyAchievements.join("\n");
      setResumeData({ ...resumeData, projects: newProjects });
    }
  };

  const MenuButton = ({ title, icon, onClick }) => (
    <button
      onClick={onClick}
      title={title}
      className="flex items-center justify-center p-3 hover:bg-gray-200 rounded font-semibold text-lg"
    >
      {icon}
    </button>
  );
  
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };
  
  const toggleBold = () => formatText('bold');
  const toggleItalic = () => formatText('italic');
  const toggleUnderline = () => formatText('underline');
  const changeFontSize = (size) => formatText('fontSize', size);
  const alignText = (alignment) => formatText(`justify${alignment}`);
  const toggleLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      formatText('createLink', url);
    }
  };
  
  useKeyboardShortcut('b', true, toggleBold);
  useKeyboardShortcut('i', true, toggleItalic);
  useKeyboardShortcut('u', true, toggleUnderline);
  
  return (
    <div className="md:max-w-[60%] sticky top-0 preview rm-padding-print p-6 md:overflow-y-scroll md:h-screen">
      <div className="mb-4">
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="p-2 border rounded"
        >
          {Object.keys(templates).map((templateKey) => (
            <option key={templateKey} value={templateKey}>
              {templateKey}
            </option>
          ))}
        </select>
      </div>
  
      <A4PageWrapper>
        <HighlightMenu
          styles={{
            borderColor: "#C026D3",
            backgroundColor: "#C026D3",
            boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.15)",
            zIndex: 10,
             borderRadius: "5px",
            padding: "3px",
          }}
          target="body"
          menu={() => (
            <>
              <MenuButton
                title="Bold (Ctrl+B)"
                icon={<FaBold />}
                onClick={toggleBold}
              />
              <MenuButton
                title="Italic (Ctrl+I)"
                icon={<FaItalic />}
                onClick={toggleItalic}
              />
              <MenuButton
                title="Underline (Ctrl+U)"
                icon={<FaUnderline />}
                onClick={toggleUnderline}
              />
              <MenuButton
                title="Increase Font Size"
                icon={<FaPlus />}
                onClick={() => changeFontSize(4)}
              />
              <MenuButton
                title="Decrease Font Size"
                icon={<FaMinus />}
                onClick={() => changeFontSize(2)}
              />
              <MenuButton
                title="Align Left"
                icon={<FaAlignLeft />}
                onClick={() => alignText('Left')}
              />
              <MenuButton
                title="Align Center"
                icon={<FaAlignCenter />}
                onClick={() => alignText('Center')}
              />
              <MenuButton
                title="Align Right"
                icon={<FaAlignRight />}
                onClick={() => alignText('Right')}
              />
              <MenuButton className="mx-3"
                title="Add Link"
                icon={<FaLink />}
                onClick={toggleLink}
              />
            </>
          )}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          {templates[selectedTemplate]}
        </DragDropContext>
      </A4PageWrapper>
    </div>
  );
};

const A4PageWrapper = ({ children }) => {
  const alertA4Size = () => {
    const preview = document.querySelector(".preview");
    const previewHeight = preview.offsetHeight;
    console.log(previewHeight);
    if (previewHeight > 1122) {
      alert("A4 size exceeded");
    }
  };

  return (
    <div className="w-8.5in border p-3" onLoad={alertA4Size}>
      {children}
    </div>
  );

};




export default Preview;
