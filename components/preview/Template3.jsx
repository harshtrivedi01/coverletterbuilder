
import {useContext} from "react";
import { ResumeContext } from "../../pages/builder";
import { HighlightMenu } from "react-highlight-menu";
import ContactInfo from "./ContactInfo";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Certification from "./Certification";
import Image from "next/image";
import Link from "next/link";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaYoutube, FaBold, FaItalic, FaPlus, FaMinus, FaAlignLeft, FaAlignCenter, FaAlignRight,FaLink,
    FaUnderline,
    FaSpellCheck,
  } from "react-icons/fa";
  import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
  import dynamic from "next/dynamic";
  // Importing draggable components dynamically
const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext), { ssr: false });
const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false })

const checkGrammar = () => {
  const selectedText = window.getSelection().toString();

  if (selectedText) {
    // API call to the grammar correction service (example using LanguageTool API)
    fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        language: "en-US",
        text: selectedText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.matches.length > 0) {
          alert("Grammar issues found: " + data.matches.length);
          // Extend this to show grammar correction suggestions to the user
        } else {
          alert("No grammar issues found!");
        }
      })
      .catch((error) => console.error("Error:", error));
  } else {
    alert("Please select some text to check for grammar.");
  }
};



const Template3 = () => {
    const { resumeData, setResumeData,headerColor,backgroundColorss } = useContext(ResumeContext);
    const icons = [
        { name: "github", icon: <FaGithub /> },
        { name: "linkedin", icon: <FaLinkedin /> },
        { name: "twitter", icon: <FaTwitter /> },
        { name: "facebook", icon: <FaFacebook /> },
        { name: "instagram", icon: <FaInstagram /> },
        { name: "youtube", icon: <FaYoutube /> },
        { name: "website", icon: <CgWebsite /> },
      ];
      const MenuButton = ({ title, icon, onClick }) => (
        <button
          onClick={onClick}
          title={title}
          className="flex items-center justify-center p-3 hover:bg-gray-200 rounded font-semibold text-lg"
        >
          {icon}
        </button>
      );

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
  return (
    <div className="flex max-w-4xl mx-auto bg-white shadow-md p-5">
   
    <div className="w-2/3 p-5">
    
      {resumeData.education.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700  border-gray-300 pb-1 mb-3" style={{ color: headerColor }}>
             <ContactInfo
          mainclass="gap-1 mb-1 contact"
          linkclass="inline-flex items-center gap-1"
          teldata={resumeData.contactInformation}
     
        /></h3>
          {resumeData.education.map((item, index) => (
            <div key={index} >
               <p>{item.school}</p>
            
             
              <DateRange
                startYear={item.startYear}
                endYear={item.endYear}
                id={`education-start-end-date`}
              /><br/>

<p> Dear,{" "}{item.degree}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mb-10">
        {/* <h3 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-1 mb-3">EXPERIENCE</h3> */}
        <div className="mb-10">
        <p>{resumeData.summary}</p>
          {resumeData.projects.length > 0 && (
            <Droppable droppableId="projects" type="PROJECTS">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <h2
                    className="section-title mb-1 border-b-2 border-gray-300 editable"
                    contentEditable
                    suppressContentEditableWarning
                    style={{ color: headerColor }}   >
                    Projects
                  </h2>
                  {resumeData.projects.map((item, index) => (
                    <Draggable
                      key={`${item.name}-${index}`}
                      draggableId={`PROJECTS-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`hover:scale-105 transition-transform duration-300 mb-1 border-l-4 border-l-gray-800 p-2 bg-stone-200 my-2 ${snapshot.isDragging &&
                            "outline-dashed outline-2 outline-gray-400 bg-white"
                            }`}
                        >
                          <div className="flex flex-row justify-between space-y-1">
                            <p className="content i-bold">{item.name}</p>
                            <DateRange
                              startYear={item.startYear}
                              endYear={item.endYear}
                              id={`work-experience-start-end-date`}
                            />
                          </div>

                          <Link
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="content"
                          >
                            {item.link}
                          </Link>
                          <p className="content">{item.description}</p>
                          <Droppable
                            droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                            type="PROJECTS_KEY_ACHIEVEMENT"
                          >
                            {(provided) => (
                              <ul
                                className="list-disc ul-padding content"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                {typeof item.keyAchievements === "string" &&
                                  item.keyAchievements
                                    .split("\n")
                                    .map((achievement, subIndex) => (
                                      <Draggable
                                        key={`${item.name}-${index}-${subIndex}`}
                                        draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                        index={subIndex}
                                      >
                                        {(provided, snapshot) => (
                                          <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`
                                      hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                      ${snapshot.isDragging &&
                                              "outline-dashed outline-2 outline-gray-400 bg-white"
                                              }`}
                                          >
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: achievement,
                                              }}
                                              contentEditable
                                            />
                                          </li>
                                        )}
                                      </Draggable>
                                    ))}
                                {provided.placeholder}
                              </ul>
                            )}
                          </Droppable>
                        </div>

                      )}

                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>

      </div>
    </div>
    <div className="w-1/3 bg-gray-100 p-5 border-r border-gray-300" style={{ backgroundColor: backgroundColorss }}>
      
      <div className="mb-10" >
        
        <h1 className="text-2xl font-bold text-gray-800 mb-1" style={{ color: headerColor }}>{resumeData.name}</h1><br/>
        <h2 className="text-2xl font-medium text-gray-700 mb-10">{resumeData.position}</h2><br/><br/>
        <ContactInfo
          mainclass="gap-1 mb-1 contact"
          linkclass="inline-flex items-center gap-1"
          teldata={resumeData.contactInformation}
          emaildata={resumeData.email}
          addressdata={resumeData.address}
          telicon={<MdPhone />}
          emailicon={<MdEmail />}
          addressicon={<MdLocationOn />}
        />
      </div>
      
     
    </div>
  </div>
  );
};

const A4PageWrapper = ({ children }) => {
  const alertA4Size = () => {
    const preview = document.querySelector(".preview");
    if (preview) {
      const previewHeight = preview.offsetHeight;
      console.log(previewHeight);
      if (previewHeight > 1122) {
        alert("A4 size exceeded");
      }
    } else {
      console.error("Element with class 'preview' not found.");
    }
  };
  
  
    return (
      <div className="w-8.5in border p-3" onLoad={alertA4Size}>
        {children}
      </div>
    );
  
  };

export default Template3;

