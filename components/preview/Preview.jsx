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
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import Skills from "./Skills";
import DateRange from "../utility/DateRange";
import ContactInfo from "./ContactInfo";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { ResumeContext } from "../../pages/builder";
import dynamic from "next/dynamic";
import Language from "./Language";
import Certification from "./Certification";
import { HighlightMenu } from "react-highlight-menu";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
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
        <h1 style={{ color: headerColor }}>Template 1</h1>
        <div className="">
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
                </>
              )}
            />

            <div className="f-col items-center mb-1">
              {resumeData.profilePicture.length > 0 && (
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black">
                  <Image
                    src={resumeData.profilePicture}
                    alt="profile"
                    width={100}
                    height={100}
                    className="object-cover h-full w-full"
                  />
                </div>
              )}
              <h1 className="name" style={{ color: headerColor }}>{resumeData.name}</h1>
              <p className="profession">{resumeData.position}</p>
              <ContactInfo
                mainclass="flex flex-row gap-1 mb-1 contact"
                linkclass="inline-flex items-center gap-1"
                teldata={resumeData.contactInformation}
                emaildata={resumeData.email}
                addressdata={resumeData.address}
                telicon={<MdPhone />}
                emailicon={<MdEmail />}
                addressicon={<MdLocationOn />}
              />
              <div className="grid grid-cols-3 gap-1">
                {resumeData.socialMedia.map((socialMedia, index) => {
                  return (
                    <a
                      href={`http://${socialMedia.link}`}
                      aria-label={socialMedia.socialMedia}
                      key={index}
                      title={socialMedia.socialMedia}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 social-media align-center justify-center "
                    // Prevent text overflowing, If the socialMedia.link string is longer than 32 characters, apply the wordWrap and display styles to this <a> tag.
                    // wordWrap: "break-word" breaks the text onto the next line if it's too long,
                    // display: "inline-block" is necessary for wordWrap to work on an inline element like <a>.

                    >
                      {icons.map((icon, index) => {
                        if (icon.name === socialMedia.socialMedia.toLowerCase()) {
                          return <span key={index}>{icon.icon}</span>;
                        }
                      })}
                      {socialMedia.link}
                    </a>
                  );
                })}
              </div>
            </div>
            <hr className="border-dashed my-2" />
            {/* two column start */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-1 space-y-2">
                {resumeData.summary.length > 0 && (
                  <div className="mb-1">
                    <h2 style={{ color: headerColor }} className="section-title mb-1 border-b-2 border-gray-300">
                      Summary
                    </h2>
                    <p className="content break-words">{resumeData.summary}</p>
                  </div>
                )}
                <div>
                  {resumeData.education.length > 0 && (
                    <div className="mb-1">
                      <h2 style={{ color: headerColor }} className="section-title mb-1 border-b-2 border-gray-300">
                        Education
                      </h2>
                      {resumeData.education.map((item, index) => (
                        <div key={index} className="mb-1">
                          <p className="content i-bold">{item.degree}</p>
                          <p className="content">{item.school}</p>
                          <DateRange
                            startYear={item.startYear}
                            endYear={item.endYear}
                            id={`education-start-end-date`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Droppable droppableId="skills" type="SKILLS">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {resumeData.skills.map((skill, index) => (
                        <Draggable
                          key={`SKILLS-${index}`}
                          draggableId={`SKILLS-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`hover:scale-105 transition-transform duration-300 mb-1 ${
                                snapshot.isDragging ? "outline-dashed outline-2 outline-gray-400 bg-white" : ""
                              }`}
                            >
                              <Skills title={skill.title} skills={skill.skills} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <Language title="Languages" languages={resumeData.languages} />
                <Certification
                  title="Certifications"
                  certifications={resumeData.certifications}
                />
              </div>
              <div className="col-span-2 space-y-2">
                {resumeData.workExperience.length > 0 && (
                  <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <h2
                          className="section-title mb-1 border-b-2 border-gray-300 editable"
                          contentEditable
                          suppressContentEditableWarning
                          style={{ color: headerColor }} >
                          Work Experience
                        </h2>
                        {resumeData.workExperience.map((item, index) => (
                          <Draggable
                            key={`${item.company}-${index}`}
                            draggableId={`WORK_EXPERIENCE-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                  }`}
                              >
                                <div className="flex flex-row justify-between space-y-1">
                                  <p className="content i-bold">{item.company}</p>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <p className="content">{item.position}</p>
                                <p className="content hyphens-auto">
                                  {item.description}
                                </p>
                                <Droppable
                                  droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                  type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
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
                                              key={`${item.company}-${index}-${subIndex}`}
                                              draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={`
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
                {resumeData.projects.length > 0 && (
                  <Droppable droppableId="projects" type="PROJECTS">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <h2
                          className="section-title mb-1 border-b-2 border-gray-300 editable"
                          contentEditable
                          suppressContentEditableWarning
                          style={{ color: headerColor }} >
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
                                className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
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

          </A4PageWrapper>
        </div>
      </div>
    ),

    template2: (
      <div>
        <div className=" border p-2">
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

            <div className="f-col  mb-1">
              {resumeData.profilePicture.length > 0 && (
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black">
                  <Image
                    src={resumeData.profilePicture}
                    alt="profile"
                    width={100}
                    height={100}
                    className="object-cover h-full w-full"
                  />
                </div>
              )}
              <h1 className="name" style={{ color: headerColor }}>{resumeData.name}</h1>
              <p className="profession">{resumeData.position}</p>
              <ContactInfo
                mainclass=" flex-col gap-1 mb-1 contact"
                linkclass=" gap-1"

                teldata={`Phone: ${resumeData.contactInformation}`}

                emaildata={`| Email: ${resumeData.email}`}





              />
              <div className="grid grid-row-3 gap-1">
                {resumeData.socialMedia.map((socialMedia, index) => {
                  return (
                    <a
                      href={`http://${socialMedia.link}`}
                      aria-label={socialMedia.socialMedia}
                      key={index}
                      title={socialMedia.socialMedia}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex  gap-1 social-media align-center  "
                    // Prevent text overflowing, If the socialMedia.link string is longer than 32 characters, apply the wordWrap and display styles to this <a> tag.
                    // wordWrap: "break-word" breaks the text onto the next line if it's too long,
                    // display: "inline-block" is necessary for wordWrap to work on an inline element like <a>.

                    >
                      {icons.map((icon, index) => {
                        if (icon.name === socialMedia.socialMedia.toLowerCase()) {
                          return <span key={index}>{icon.icon}</span>;
                        }
                      })}
                      {socialMedia.link}
                    </a>
                  );
                })}
              </div>
            </div>
            <hr className="border-dashed my-2" />
            {/* two column start */}
            <div className="">
              <div className="col-span-1 space-y-2">
                {resumeData.summary.length > 0 && (
                  <div className="mb-1">
                    <h2 className="section-title mb-1 border-b-2 border-gray-300" style={{ color: headerColor }}>
                      Summary
                    </h2>
                    <p className="content break-words border-l-4 border-l-gray-800 p-2" style={{ background: "#eee" }}>{resumeData.summary}</p>
                  </div>
                )}
                <div>
                  {resumeData.education.length > 0 && (
                    <div className="mb-1">
                      <h2 className="section-title mb-1 border-b-2 border-gray-300" style={{ color: headerColor }}>
                        Education
                      </h2>
                      {resumeData.education.map((item, index) => (
                        <div key={index} className="border-l-4 border-l-gray-800 " style={{ background: "#eee", padding: "10px" }}>
                          <p className="content i-bold">{item.degree}</p>
                          <p className="content">{item.school}</p>
                          <DateRange
                            startYear={item.startYear}
                            endYear={item.endYear}
                            id={`education-start-end-date`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Droppable droppableId="skills" type="SKILLS">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}  >
                      {resumeData.skills.map((skill, index) => (
                        <Draggable
                          key={`SKILLS-${index}`}
                          draggableId={`SKILLS-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`hover:scale-105 transition-transform duration-300 mb-1  ${snapshot.isDragging &&
                                "outline-dashed outline-2 outline-gray-400 bg-white "
                                }`}
                            >
                              {skill.skills.length > 0 && (
                                <>
                                  <h2 className="section-title mb-1 border-b-2 border-gray-300 editable" contentEditable suppressContentEditableWarning >
                                    {skill.title}
                                  </h2>
                                  <p className="sub-content border-l-4 border-l-gray-800 p-2 bg-stone-200 my-2">{skill.skills.join(", ")}</p>
                                </>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                {resumeData.languages.length > 0 && (
                  <div >
                    <h2 className="section-title mb-1 border-b-2 border-gray-300" title="lan" style={{ color: headerColor }}>
                      Language
                    </h2>
                    <p className="sub-content border-l-4 border-l-gray-800 p-2 bg-stone-200 my-2">{resumeData.languages.join(", ")}</p>
                  </div>
                )}
                {resumeData.certifications.length > 0 &&
                  <div>
                    <h2 className="section-title mb-1 border-b-2 border-gray-300" style={{ color: headerColor }}>Certifications</h2>
                    <ul className="sub-content border-l-4 border-l-gray-800 p-2 bg-stone-200 my-2 my-2">
                      {resumeData.certifications.map((certification, index) => (
                        <li key={index}>{certification}</li>
                      ))}
                    </ul>
                  </div>}
              </div>

              <div className="col-span-2 space-y-2">
                {resumeData.workExperience.length > 0 && (
                  <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} >
                        <h2
                          className="section-title mb-1 border-b-2 border-gray-300 editable"
                          contentEditable
                          suppressContentEditableWarning
                          style={{ color: headerColor }} >
                          Work Experience
                        </h2>
                        {resumeData.workExperience.map((item, index) => (
                          <Draggable
                            key={`${item.company}-${index}`}
                            draggableId={`WORK_EXPERIENCE-${index}`}
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
                                  <p className="content i-bold">{item.company}</p>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <p className="content">{item.position}</p>
                                <p className="content hyphens-auto">
                                  {item.description}
                                </p>
                                <Droppable
                                  droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                  type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
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
                                              key={`${item.company}-${index}-${subIndex}`}
                                              draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={`
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
                {resumeData.projects.length > 0 && (
                  <Droppable droppableId="projects" type="PROJECTS">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <h2
                          className="section-title mb-1 border-b-2 border-gray-300 editable"
                          contentEditable
                          suppressContentEditableWarning
                          style={{ color: headerColor }}  >
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
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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

          </A4PageWrapper>
        </div>
      </div>
    ),

    template3: (
      <div className="max-w-4xl mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
        <header className="mb-6">
          <h1 className="text-4sl font-bold text-teal-600" style={{ color: headerColor }}>{resumeData.name}</h1>
          <p className="text-lg text-gray-700">{resumeData.position}</p>
          <ContactInfo
            mainclass="flex flex-row gap-1 mb-1 contact"
            linkclass="inline-flex items-center gap-1"
            teldata={resumeData.contactInformation}
            emaildata={resumeData.email}
            addressdata={resumeData.address}
            telicon={<MdPhone />}
            emailicon={<MdEmail />}
            addressicon={<MdLocationOn />}
          />
        </header>

        <section className="mb-6">
          <p className="text-xm font-semibold text-gray-500 mb-2">{resumeData.summary}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4" style={{ color: headerColor }}>Relevant Work Experience</h2>
          <div className="col-span-2 space-y-2">
            {resumeData.workExperience.length > 0 && (
              <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <h2
                      className="section-title mb-1 border-b-2 border-gray-300 editable"
                      contentEditable
                      suppressContentEditableWarning
                      style={{ color: headerColor }}>
                      Work Experience
                    </h2>
                    {resumeData.workExperience.map((item, index) => (
                      <Draggable
                        key={`${item.company}-${index}`}
                        draggableId={`WORK_EXPERIENCE-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                              "outline-dashed outline-2 outline-gray-400 bg-white"
                              }`}
                          >
                            <div className="flex flex-row justify-between space-y-1">
                              <p className="content i-bold ">{item.company}</p>
                              <DateRange
                                startYear={item.startYear}
                                endYear={item.endYear}
                                id={`work-experience-start-end-date`}
                              />
                            </div>
                            <p className="content">{item.position}</p>
                            <p className="content hyphens-auto text-gray-500">
                              {item.description}
                            </p>
                            <Droppable
                              droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                              type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
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
                                          key={`${item.company}-${index}-${subIndex}`}
                                          draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                          index={subIndex}
                                        >
                                          {(provided, snapshot) => (
                                            <li
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className={`
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
            {resumeData.projects.length > 0 && (
              <Droppable droppableId="projects" type="PROJECTS">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <h2
                      className="section-title mb-1 border-b-2 border-gray-300 editable"
                      contentEditable
                      suppressContentEditableWarning
                      style={{ color: headerColor }} >
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
                            className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
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
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4" style={{ color: headerColor }}>Education</h2>
          {resumeData.education.length > 0 && resumeData.education.map((item, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold text-gray-800">{item.degree}</h3>
              <p className="text-gray-600">{item.school}</p>
              <DateRange
                startYear={item.startYear}
                endYear={item.endYear}
                id={`education-start-end-date-${index}`}
              />
            </div>
          ))}
        </section>


        <Droppable droppableId="skills" type="SKILLS">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {resumeData.skills.map((skill, index) => (
                <Draggable
                  key={`SKILLS-${index}`}
                  draggableId={`SKILLS-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                        "outline-dashed outline-2 outline-gray-400 bg-white"
                        }`}
                    >
                      <p><h3 className='text-teal-600' style={{ color: headerColor }}>{skill.title}</h3>  <span className="text-gray-500">{skill.skills}</span></p>
                      <p > </p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    ),

    template4: (
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto my-5 bg-white shadow-lg">
        <div className="flex-2 p-5 border-r border-gray-300">
          <h1 className="text-2xl font-bold text-blue-500 mb-3" style={{ color: headerColor }}>{resumeData.name}</h1>
          <h2 className="text-xl text-gray-800 mb-5">{resumeData.position}</h2>
          <p className="mb-5 text-xs">{resumeData.summary}</p>

          <h3 className="text-lg font-semibold text-gray-800 mt-7 mb-4 border-b-2 text-[#818cf8] pb-1" style={{ color: headerColor }}>Work Experience</h3>
          {resumeData.workExperience.map((item, index) => (
            <div key={index} className="mb-7">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {item.company}
              </h4>
              <p>{item.position}</p>
              <span className="text-sm text-gray-500 mb-3">
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`work-experience-start-end-date`}
                />
              </span>

              <p className="content hyphens-auto">{item.description}</p>

              <Droppable
                droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
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
                            key={`${item.company}-${index}-${subIndex}`}
                            draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                            index={subIndex}
                          >
                            {(provided, snapshot) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
                        ${snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"}`}
                              >
                                <div
                                  dangerouslySetInnerHTML={{ __html: achievement }}
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
          ))}

        </div>

        <div className="flex-1 p-5 bg-gray-100">
          <div className="mb-6">
            <h4 className="text-lg font-semibold  text-[#818cf8] mb-3 border-b border-gray-300 pb-1" style={{ color: headerColor }}>Contact</h4>
            <ContactInfo
              mainclass=" contact"
              linkclass="inline-flex items-center gap-1"
              teldata={resumeData.contactInformation}
              emaildata={resumeData.email}
              addressdata={resumeData.address}
              telicon={<MdPhone />}
              emailicon={<MdEmail />}
              addressicon={<MdLocationOn />}
            />
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold  text-[#818cf8] mb-3 border-b border-gray-300 pb-1" style={{ color: headerColor }}>Skills</h4>
            <Droppable droppableId="skills" type="SKILLS">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {resumeData.skills.map((skill, index) => (
                    <Draggable
                      key={`SKILLS-${index}`}
                      draggableId={`SKILLS-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                            "outline-dashed outline-2 outline-gray-400 bg-white"
                            }`}
                        >
                          <Skills title={skill.title} skills={skill.skills} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div className="mb-6">
            {resumeData.education.length > 0 && (
              <div className="mb-1">
                <h2 className="section-title mb-1 border-b-2 text-[#818cf8]" style={{ color: headerColor }}>
                  Education
                </h2>
                {resumeData.education.map((item, index) => (
                  <div key={index} className="mb-1">
                    <p className="content i-bold">{item.degree}</p>
                    <p className="content">{item.school}</p>
                    <DateRange
                      startYear={item.startYear}
                      endYear={item.endYear}
                      id={`education-start-end-date`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    ),
    template5: (

      <div className="resume-container  mx-auto  box-border">

        <div className="header text-center mb-6">
          <div className="flex justify-center items-center">
            {resumeData.profilePicture.length > 0 && (
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black">
                <Image
                  src={resumeData.profilePicture}
                  alt="profile"
                  width={100}
                  height={100}
                  className="object-cover h-full w-full"
                />
              </div>
            )}
          </div>
          <h1 className="text-2xl mb-1.5" style={{ color: headerColor }}>{resumeData.name}</h1>
          <p className="text-base m-0 flex justify-center items-center">
            <ContactInfo
              mainclass="flex flex-row gap-4 mb-1 contact"
              linkclass="inline-flex items-center gap-1"
              teldata={resumeData.contactInformation}
              emaildata={resumeData.email}
              addressdata={resumeData.address}
              telicon={<MdPhone />}
              emailicon={<MdEmail />}
              addressicon={<MdLocationOn />}
            />
          </p>

        </div>

        <section className="experience mb-6">
          <h2 className="text-lm mb-2.5 uppercase border-b border-black pb-0.5 fw-bold" style={{ color: headerColor }}>Professional Experience</h2>

          <div className="col-span-2 space-y-2">
            {resumeData.workExperience.length > 0 && (
              <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {resumeData.workExperience.map((item, index) => (
                      <Draggable
                        key={`${item.company}-${index}`}
                        draggableId={`WORK_EXPERIENCE-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                              "outline-dashed outline-2 outline-gray-400 bg-white"
                              }`}
                          >
                            <div className="flex flex-row justify-between space-y-1">
                              <p className="content i-bold">{item.company}</p>
                              <DateRange
                                startYear={item.startYear}
                                endYear={item.endYear}
                                id={`work-experience-start-end-date`}
                              />
                            </div>
                            <p className="content">{item.position}</p>
                            <p className="content hyphens-auto">
                              {item.description}
                            </p>
                            <Droppable
                              droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                              type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
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
                                          key={`${item.company}-${index}-${subIndex}`}
                                          draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                          index={subIndex}
                                        >
                                          {(provided, snapshot) => (
                                            <li
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className={`
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
            {resumeData.projects.length > 0 && (
              <Droppable droppableId="projects" type="PROJECTS">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <h2
                      className="section-title mb-1 border-b-2 border-gray-300 editable"
                      contentEditable
                      suppressContentEditableWarning
                      style={{ color: headerColor }}  >
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
                            className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
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
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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




        </section>

        <section className="education mb-6">
          {resumeData.education.length > 0 && (
            <div className="mb-1">
              <h2 className="text-lm mb-2.5 uppercase border-b border-black pb-0.5 fw-bold" style={{ color: headerColor }}>Education</h2>
              {resumeData.education.map((item, index) => (
                <div key={index} className="mb-1">
                  <div className="flex justify-end text-sm italic">
                    <span>{item.startYear} - {item.endYear}</span>
                  </div>
                  <p className="content i-bold">{item.degree}</p>
                  <p className="content">{item.school}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="skills mb-6">
          <h2 className="text-lg mb-2.5 uppercase border-b border-black pb-0.5" style={{ color: headerColor }}>Skills</h2>

          <Droppable droppableId="skills" type="SKILLS">
            {(provided) => (
              <ul
                className="pl-5 "
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {resumeData.skills.map((skill, index) => (
                  <Draggable
                    key={`SKILLS-${index}`}
                    draggableId={`SKILLS-${index}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`hover:scale-105 transition-transform duration-300 text-sm mb-1.5 ${snapshot.isDragging &&
                          "outline-dashed outline-2 outline-gray-400 bg-white"
                          }`}
                      >
                        <Skills title={skill.title} skills={skill.skills} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </section>

      </div>
    ),
    template6: (

      <div className="bg-gray-100 p-4">
        <div className="container mx-auto flex bg-white shadow-lg">
          {/* Left Column */}
          <div className="left-column w-8/12 p-8 border-r border-gray-300">
            <h3 className="text-4xm text-orange-600 mb-2" style={{ color: headerColor }}>{resumeData.name}</h3>
            <h2 className="text-2xl text-gray-700 mb-8" style={{ color: headerColor }}>{resumeData.position}</h2>

            <h3 className="text-xl text-orange-600 mt-10 mb-2" style={{ color: headerColor }}>WORK EXPERIENCE</h3>

            {/* Job 1 */}
            <div className="job mb-8">
              <div className="col-span-2 space-y-2">
                {resumeData.workExperience.length > 0 && (
                  <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <h2
                          className="section-title mb-1 border-b-2 border-gray-300 editable leading-tight"
                          contentEditable
                          suppressContentEditableWarning
                          style={{ color: headerColor }} >
                          Work Experience
                        </h2>
                        {resumeData.workExperience.map((item, index) => (
                          <Draggable
                            key={`${item.company}-${index}`}
                            draggableId={`WORK_EXPERIENCE-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                  }`}
                              >
                                <div className="flex flex-row justify-between space-y-1">
                                  <p className="content i-bold leading-normal">{item.company}</p>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <p className="content leading-relaxed">{item.position}</p>
                                <p className="content hyphens-auto leading-loose">
                                  {item.description}
                                </p>
                                <Droppable
                                  droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                  type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                                >
                                  {(provided) => (
                                    <ul
                                      className="list-disc ul-padding content leading-snug"
                                      {...provided.droppableProps}
                                      ref={provided.innerRef}
                                    >
                                      {typeof item.keyAchievements === "string" &&
                                        item.keyAchievements
                                          .split("\n")
                                          .map((achievement, subIndex) => (
                                            <Draggable
                                              key={`${item.company}-${index}-${subIndex}`}
                                              draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={`
                                              hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
                {resumeData.projects.length > 0 && (
                  <Droppable droppableId="projects" type="PROJECTS">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <h2
                          className="section-title mb-1 border-b-2 border-gray-300 editable leading-tight"
                          contentEditable
                          suppressContentEditableWarning
                          style={{ color: headerColor }} >
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
                                className={`mb-1 ${snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                  }`}
                              >
                                <div className="flex flex-row justify-between space-y-1">
                                  <p className="content i-bold leading-normal">{item.name}</p>
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
                                  className="content leading-normal"
                                >
                                  {item.link}
                                </Link>
                                <p className="content leading-relaxed">{item.description}</p>
                                <Droppable
                                  droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                                  type="PROJECTS_KEY_ACHIEVEMENT"
                                >
                                  {(provided) => (
                                    <ul
                                      className="list-disc ul-padding content leading-snug"
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
                                              hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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

          {/* Right Column */}
          <div className="right-column w-4/12 bg-gray-100 p-8">
            <div className="contact mb-8">
              <h3 className="text-xl text-orange-600 mb-2" style={{ color: headerColor }}>CONTACT</h3>
              <ContactInfo
                mainclass="  gap-1 mb-1 contact"
                linkclass="inline-flex items-center gap-1"
                teldata={resumeData.contactInformation}
                emaildata={resumeData.email}
                addressdata={resumeData.address}
                telicon={<MdPhone />}
                emailicon={<MdEmail />}
                addressicon={<MdLocationOn />}
              />
            </div>

            <div className="skills mb-8">
              <h3 className="text-xl text-orange-600 mb-2" style={{ color: headerColor }}>SKILLS</h3>
              <Droppable droppableId="skills" type="SKILLS">
                {(provided) => (
                  <ul
                    className=" "
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {resumeData.skills.map((skill, index) => (
                      <Draggable
                        key={`SKILLS-${index}`}
                        draggableId={`SKILLS-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={` hover:scale-105 transition-transform duration-300 text-sm mb-1.5 ${snapshot.isDragging &&
                              "outline-dashed outline-2 outline-gray-400 bg-white"
                              }`}
                          >
                            <Skills title={skill.title} skills={skill.skills} />
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
              <p className="text-gray-700 mt-4 text-orange-600" style={{ color: headerColor }}>Languages:</p>
              <Language languages={resumeData.languages} />
              <Certification
                title="Certifications"
                certifications={resumeData.certifications}
              />
            </div>

            <div className="education mb-8">
              {resumeData.education.length > 0 && (
                <div className="mb-1">
                  <h2 className="section-title mb-1 border-b-2 border-gray-300 text-orange-600" style={{ color: headerColor }}>
                    Education
                  </h2>
                  {resumeData.education.map((item, index) => (
                    <div key={index} className="mb-1">
                      <p className="content i-bold">{item.degree}</p>
                      <p className="content">{item.school}</p>
                      <DateRange
                        startYear={item.startYear}
                        endYear={item.endYear}
                        id={`education-start-end-date`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    ),

    template7: (
      <div className=" mx-auto bg-white p-5">


        <section className="flex justify-between">
          <div className="w-8/12">
            <header className=" border-b-2 border-gray-200 pb-5 mb-5">
              <h1 className="text-4xl text-blue-700" style={{ color: headerColor }}>{resumeData.name}</h1>
              <h2 className="text-2xl text-gray-800 mb-2">{resumeData.position}</h2>
              <p className="text-base text-gray-600">
                {resumeData.summary}
              </p>
            </header>
            <h3 className="text-xl text-blue-700 mb-2" style={{ color: headerColor }}>WORK EXPERIENCE</h3>


            <div className="col-span-2 space-y-2">
              {resumeData.workExperience.length > 0 && (
                <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {resumeData.workExperience.map((item, index) => (
                        <Draggable
                          key={`${item.company}-${index}`}
                          draggableId={`WORK_EXPERIENCE-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                "outline-dashed outline-2 outline-gray-400 bg-white"
                                }`}
                            >
                              <div className="flex flex-row justify-between space-y-1">
                                <p className="content i-bold">{item.company}</p>
                                <DateRange
                                  startYear={item.startYear}
                                  endYear={item.endYear}
                                  id={`work-experience-start-end-date`}
                                />
                              </div>
                              <p className="content">{item.position}</p>
                              <p className="content hyphens-auto">
                                {item.description}
                              </p>
                              <Droppable
                                droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
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
                                            key={`${item.company}-${index}-${subIndex}`}
                                            draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                            index={subIndex}
                                          >
                                            {(provided, snapshot) => (
                                              <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`
                                     hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
                              className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
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
                                      hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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

          <aside className="w-4/12 bg-[#d4d4d8] rounded p-2">
            <div className="mb-5">
              <h3 className="text-lg text-blue-700 mb-2" style={{ color: headerColor }}>CONTACT</h3>
              <ContactInfo
                mainclass=" gap-1 mb-1 contact"
                linkclass="inline-flex items-center gap-1"
                teldata={resumeData.contactInformation}
                emaildata={resumeData.email}
                addressdata={resumeData.address}
                telicon={<MdPhone />}
                emailicon={<MdEmail />}
                addressicon={<MdLocationOn />}
              />
            </div>

            <div className="mb-5">
              <h3 className="text-lg text-blue-700 mb-2" style={{ color: headerColor }}>SKILLS</h3>
              <Droppable droppableId="skills" type="SKILLS">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {resumeData.skills.map((skill, index) => (
                      <Draggable
                        key={`SKILLS-${index}`}
                        draggableId={`SKILLS-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                              "outline-dashed outline-2 outline-gray-400 bg-white"
                              }`}
                          >
                            <Skills title={skill.title} skills={skill.skills} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>


            </div>

            <div className="mb-5">
              <h3 className="text-lg text-blue-700 mb-2" style={{ color: headerColor }}>EDUCATION</h3>
              {resumeData.education.length > 0 && (
                <div className="mb-1">
                  {resumeData.education.map((item, index) => (
                    <div key={index} className="mb-1">
                      <p className="content i-bold">{item.degree}</p>
                      <p className="content">{item.school}</p>
                      <DateRange
                        startYear={item.startYear}
                        endYear={item.endYear}
                        id={`education-start-end-date`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-5">
              <Language title="Languages" languages={resumeData.languages} />
              <Certification
                title="Certifications"
                certifications={resumeData.certifications}
              />
            </div>
          </aside>
        </section>
      </div>
    ),

    template8: (
      <div className="flex max-w-4xl mx-auto bg-white shadow-md p-5">
        <div className="w-1/3 bg-gray-100 p-5 border-r border-gray-300">
          <div >
            {resumeData.profilePicture.length > 0 && (
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black">
                <Image
                  src={resumeData.profilePicture}
                  alt="profile"
                  width={100}
                  height={100}
                  className="object-cover h-full w-full"
                />
              </div>
            )}
          </div>
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1 mb-3" style={{ color: headerColor }}>CONTACT</h3>
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
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1 mb-3" style={{ color: headerColor }}>COMMUNICATION</h3>
            <p>{resumeData.summary}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1 mb-3" style={{ color: headerColor }}>LEADERSHIP</h3>
            <Droppable droppableId="skills" type="SKILLS">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {resumeData.skills.map((skill, index) => (
                    <Draggable
                      key={`SKILLS-${index}`}
                      draggableId={`SKILLS-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                            "outline-dashed outline-2 outline-gray-400 bg-white"
                            }`}
                        >
                          <p><h3 className='font-bold'>{skill.title}</h3>  <span className="text-[#000]">{skill.skills}</span></p>
                          <p > </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
        <div className="w-2/3 p-5">
          <h1 className="text-4xl font-bold text-gray-800 mb-1" style={{ color: headerColor }}>{resumeData.name}</h1>
          <h2 className="text-2xl font-medium text-gray-700 mb-10">{resumeData.position}</h2>
          {resumeData.education.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-1 mb-3" style={{ color: headerColor }}>EDUCATION</h3>
              {resumeData.education.map((item, index) => (
                <div key={index} >
                  <p>{item.degree}</p>
                  <p>{item.school}</p>
                  <DateRange
                    startYear={item.startYear}
                    endYear={item.endYear}
                    id={`education-start-end-date`}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mb-10">
            {/* <h3 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-1 mb-3">EXPERIENCE</h3> */}
            <div className="mb-10">
              {resumeData.workExperience.length > 0 && (
                <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} >
                      <h2
                        className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-1 mb-3"
                        contentEditable
                        suppressContentEditableWarning
                        style={{ color: headerColor }}  >
                        Experience
                      </h2>
                      {resumeData.workExperience.map((item, index) => (
                        <Draggable
                          key={`${item.company}-${index}`}
                          draggableId={`WORK_EXPERIENCE-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                "outline-dashed outline-2 outline-gray-400 bg-white"
                                }`}
                            >
                              <div className="flex flex-row justify-between space-y-1">
                                <p className="content i-bold">{item.company}</p>
                                <DateRange
                                  startYear={item.startYear}
                                  endYear={item.endYear}
                                  id={`work-experience-start-end-date`}
                                />
                              </div>
                              <p className="content">{item.position}</p>
                              <p className="content hyphens-auto">
                                {item.description}
                              </p>
                              <Droppable
                                droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
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
                                            key={`${item.company}-${index}-${subIndex}`}
                                            draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
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
      </div>
    ),

    template9: (
      <div className="bg-gray-100 p-5">
        <div className="max-w-4xl mx-auto bg-white p-5 shadow-lg">
          <div className="mb-5">
            <h1 className="text-4xl font-bold text-left" style={{ color: headerColor }}>{resumeData.name}</h1>
            <p className="text-sm text-gray-600">{resumeData.summary}</p>
          </div>
          <div className="text-right mb-5 text-sm text-gray-600">
            <p>
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
            </p>
          </div>
          <div className="flex justify-between">
            <div className="w-3/5">
              <section className="mb-5">
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3" style={{ color: headerColor }}>Experience</h2>
                <div className="mb-3">
                  <div className="col-span-2 space-y-2">
                    {resumeData.workExperience.length > 0 && (
                      <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            <h2
                              className="section-title mb-1 border-b-2 border-gray-300 editable"
                              contentEditable
                              suppressContentEditableWarning
                              style={{ color: headerColor }} >
                              Work Experience
                            </h2>
                            {resumeData.workExperience.map((item, index) => (
                              <Draggable
                                key={`${item.company}-${index}`}
                                draggableId={`WORK_EXPERIENCE-${index}`}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                      "outline-dashed outline-2 outline-gray-400 bg-white"
                                      }`}
                                  >
                                    <div className="flex flex-row justify-between space-y-1">
                                      <p className="content i-bold">{item.company}</p>
                                      <DateRange
                                        startYear={item.startYear}
                                        endYear={item.endYear}
                                        id={`work-experience-start-end-date`}
                                      />
                                    </div>
                                    <p className="content">{item.position}</p>
                                    <p className="content hyphens-auto p-2">
                                      {item.description}
                                    </p>
                                    <Droppable
                                      droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                      type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
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
                                                  key={`${item.company}-${index}-${subIndex}`}
                                                  draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                                  index={subIndex}
                                                >
                                                  {(provided, snapshot) => (
                                                    <li
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                      className={`
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
                                    className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                      "outline-dashed outline-2 outline-gray-400 bg-white"
                                      }`}
                                  >
                                    <div className="flex flex-row justify-between space-y-1">
                                      <p className="content i-bold text-md font-semibold">{item.name}</p>
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
              </section>
              {/* text-lg font-bold border-b border-gray-300 pb-1 mb-3 */}
              {/* text-sm text-gray-600 */}
              <section className="mb-5">
                {resumeData.education.length > 0 && (
                  <div className="mb-1">
                    <h2 className=" text-lg font-bold border-b border-gray-300 pb-1 mb-3" style={{ color: headerColor }}>
                      Education
                    </h2>
                    {resumeData.education.map((item, index) => (
                      <div key={index} className="mb-1">
                        <p className="text-sm text-gray-600">{item.degree}</p>
                        <p className="text-sm text-gray-600">{item.school}</p>
                        <DateRange
                          startYear={item.startYear}
                          endYear={item.endYear}
                          id={`education-start-end-date`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
            <div className="w-2/5">
              <section className="mb-5">
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3" style={{ color: headerColor }}>Skills</h2>
                <Droppable droppableId="skills" type="SKILLS">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {resumeData.skills.map((skill, index) => (
                        <Draggable
                          key={`SKILLS-${index}`}
                          draggableId={`SKILLS-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                "outline-dashed outline-2 outline-gray-400 bg-white"
                                }`}
                            >
                              <Skills title={skill.title} skills={skill.skills} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </section>



              <section>
                <Language title="Languages" languages={resumeData.languages} />
                <Certification
                  title="Certifications"
                  certifications={resumeData.certifications}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    ),

    template10: (
      <div className="bg-gray-100 p-5">
        <div className="max-w-4xl bg-white p-6 mx-auto shadow-md border-l-4 border-red-600">
          <header className="text-center border-b-2 border-red-600 pb-3 mb-5">
            <h1 className="text-3xl text-gray-800 uppercase tracking-wider" style={{ color: headerColor }}>{resumeData.name}</h1>
            <p className="text-sm text-gray-500 text-center m-0">
              <ContactInfo
                mainclass="flex flex-row gap-1 justify-center items-center mb-1 contact"
                linkclass="inline-flex items-center gap-1"
                teldata={resumeData.contactInformation}
                emaildata={resumeData.email}
                addressdata={resumeData.address}
                telicon={<MdPhone />}
                emailicon={<MdEmail />}
                addressicon={<MdLocationOn />}
              />
            </p>

          </header>

          <section className="mb-5">
            <p className="text-sm text-gray-500 leading-relaxed">{resumeData.summary}</p>
          </section>

          <section className="mb-5">
            <h2 className="text-xl text-red-600 uppercase mb-3" style={{ color: headerColor }}>Experience</h2>
            <div className="mb-5">
              {resumeData.workExperience.map((item, index) => (
                <div key={index} className="mb-7">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.company}
                  </h4>
                  <p>{item.position}</p>
                  <span className="text-sm text-gray-500 mb-3">
                    <DateRange
                      startYear={item.startYear}
                      endYear={item.endYear}
                      id={`work-experience-start-end-date`}
                    />
                  </span>

                  <p className="content hyphens-auto text-gray-500">{item.description}</p>

                  <Droppable
                    droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                    type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                  >
                    {(provided) => (
                      <ul
                        className="list-disc ul-padding content text-gray-500"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {typeof item.keyAchievements === "string" &&
                          item.keyAchievements
                            .split("\n")
                            .map((achievement, subIndex) => (
                              <Draggable
                                key={`${item.company}-${index}-${subIndex}`}
                                draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                index={subIndex}
                              >
                                {(provided, snapshot) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={` hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
                        ${snapshot.isDragging &&
                                      "outline-dashed outline-2 outline-gray-400 bg-white"}`}
                                  >
                                    <div
                                      dangerouslySetInnerHTML={{ __html: achievement }}
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
              ))}
            </div>
          </section>

          <section className="mb-5">
            <h2 className="text-xl text-red-600 uppercase mb-3" style={{ color: headerColor }}>Education</h2>
            {resumeData.education.length > 0 && (
              <div className="mb-1">
                {resumeData.education.map((item, index) => (
                  <div key={index} className="mb-1 text-sm text-gray-500 font-semibold">
                    <p className="content i-bold">{item.degree}</p>
                    <p className="content">{item.school}</p>
                    <DateRange
                      startYear={item.startYear}
                      endYear={item.endYear}
                      id={`education-start-end-date`}
                    />
                  </div>
                ))}
              </div>
            )}

          </section>

          <section>
            <h2 className="text-xl text-red-600 uppercase mb-3" style={{ color: headerColor }}>Skills</h2>
            <ul className="list-none pl-0 text-sm text-gray-500 leading-relaxed">
              <Droppable droppableId="skills" type="SKILLS">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {resumeData.skills.map((skill, index) => (
                      <Draggable
                        key={`SKILLS-${index}`}
                        draggableId={`SKILLS-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                              "  "
                              }`}
                          >
                            <Skills title={skill.title} skills={skill.skills} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </ul>
          </section>
        </div>
      </div>
    ),

    template11: (
      <div className="container mx-auto my-12 bg-white shadow-lg overflow-hidden w-full ">
        <div className="header flex bg-[#2b3d63] text-white p-5 items-center" >
          <div className="profile-pic mr-5">
            {/* <img
            src="profile-pic.jpg"
            alt="Profile Picture"
            className="rounded-full w-24 h-24"
          /> */}
            <Image
              src={resumeData.profilePicture}
              alt="profile"
              width={100}
              height={100}
              className=" w-50 h-24"
            />
          </div>
          <div className="name-title">
            <h1 className="text-3xl m-0" style={{ color: headerColor }}>
              {resumeData.name}
            </h1>
            <p className="mt-1 text-lg">{resumeData.position}</p>
          </div>
        </div>
        <div className="main-content flex p-5">
          <div className="left-column flex-1 p-5">
            <div className="about-me mb-5">
              <h2 className="bg-[#2b3d63] text-white p-3 -mx-5 mb-5" style={{ color: headerColor }}>About Me</h2>
              <p>
                {resumeData.summary}
              </p>
            </div>
            <div className="contact mb-5">
              <ContactInfo
                mainclass=" gap-1 mb-1 contact"
                linkclass="inline-flex items-center gap-1"
                teldata={resumeData.contactInformation}
                emaildata={resumeData.email}
                addressdata={resumeData.address}
                telicon={<MdPhone />}
                emailicon={<MdEmail />}
                addressicon={<MdLocationOn />}
              />
            </div>
            <div className="skills-summary mb-5">
              <h2 className="bg-[#2b3d63] text-white p-3 -mx-5 mb-5" style={{ color: headerColor }}>Skills Summary</h2>
              <ul className="list-none p-0">
                <Droppable droppableId="skills" type="SKILLS">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {resumeData.skills.map((skill, index) => (
                        <Draggable
                          key={`SKILLS-${index}`}
                          draggableId={`SKILLS-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                "outline-dashed outline-2 outline-gray-400 bg-white"
                                }`}
                            >
                              <Skills title={skill.title} skills={skill.skills} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

              </ul>
            </div>
          </div>
          <div className="right-column flex-1 p-5">
            <div className="experience mb-5">
              <h2 className="bg-[#2b3d63] text-white p-3 -mx-5 mb-5" style={{ color: headerColor }}>Experience</h2>
              <div className="experience-item mb-4">
                {resumeData.workExperience.length > 0 && (
                  <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                      
                        {resumeData.workExperience.map((item, index) => (
                          <Draggable
                            key={`${item.company}-${index}`}
                            draggableId={`WORK_EXPERIENCE-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                  }`}
                              >
                                <div className="flex flex-row justify-between space-y-1">
                                  <p className="content i-bold">{item.company}</p>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <p className="content">{item.position}</p>
                                <p className="content hyphens-auto">
                                  {item.description}
                                </p>
                                <Droppable
                                  droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                  type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
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
                                              key={`${item.company}-${index}-${subIndex}`}
                                              draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={`
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
                {resumeData.projects.length > 0 && (
                  <Droppable droppableId="projects" type="PROJECTS">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <h2
                          className="section-title mb-1 border-b-2 border-gray-300 editable"
                          contentEditable
                          suppressContentEditableWarning
                          style={{ color: headerColor }}  >
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
                                className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
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
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
            <div className="education">
              <h2 className="bg-[#2b3d63] text-white p-3 -mx-5 mb-5" style={{ color: headerColor }}>Education</h2>
              {resumeData.education.length > 0 && (
                <div className="mb-1">
                  {resumeData.education.map((item, index) => (
                    <div key={index} className="mb-1">
                      <p className="content i-bold">{item.degree}</p>
                      <p className="content">{item.school}</p>
                      <DateRange
                        startYear={item.startYear}
                        endYear={item.endYear}
                        id={`education-start-end-date`}
                      />
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    ),

    template12: (
      <div className="w-full max-w-3xl mx-auto bg-white p-6 shadow-lg">
        <div className="flex items-center mb-6">
          <Image
            src={resumeData.profilePicture}
            alt="profile"
            width={100}
            height={100}
            className="rounded-full mr-5"
          />
          <div className="flex-grow">
            <h1 className="text-2xl text-gray-800" style={{ color: headerColor }}>{resumeData.name}</h1>
            <h2 className="text-xl text-blue-600 font-semibold">{resumeData.position}</h2>
          </div>
          <div className="text-right">
            <ContactInfo
              mainclass=" gap-1 mb-1 contact"
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

        <div className="mb-6">
          <h3 className="text-xl text-blue-600 border-b-2 border-blue-600 pb-1 mb-4" style={{ color: headerColor }}>Work Experience</h3>
          <div className="mb-4">
            {resumeData.workExperience.length > 0 && (
              <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {resumeData.workExperience.map((item, index) => (
                      <Draggable
                        key={`${item.company}-${index}`}
                        draggableId={`WORK_EXPERIENCE-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                              "outline-dashed outline-2 outline-gray-400 bg-white"
                              }`}
                          >
                            <div className=" justify-between space-y-1">
                              <p className="content i-bold">{item.company}</p>
                              <DateRange
                                startYear={item.startYear}
                                endYear={item.endYear}
                                id={`work-experience-start-end-date`}
                              />
                            </div>
                            <p className="content">{item.position}</p>
                            <p className="content hyphens-auto">
                              {item.description}
                            </p>
                            <Droppable
                              droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                              type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
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
                                          key={`${item.company}-${index}-${subIndex}`}
                                          draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                          index={subIndex}
                                        >
                                          {(provided, snapshot) => (
                                            <li
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className={`
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
            {resumeData.projects.length > 0 && (
              <Droppable droppableId="projects" type="PROJECTS">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <h2
                      className="section-title mb-1 border-b-2 border-gray-300 editable"
                      contentEditable
                      suppressContentEditableWarning
                      style={{ color: headerColor }} >
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
                            className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
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
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
          {/* Add more experience items as needed */}
        </div>

        <div className="mb-6">
          <h3 className="text-xl text-blue-600 border-b-2 border-blue-600 pb-1 mb-4" style={{ color: headerColor }}>Snapshot</h3>
          {resumeData.summary}
          {/* Add more snapshot paragraphs as needed */}
        </div>

        <div className="mb-6">
          <h3 className="text-xl text-blue-600 border-b-2 border-blue-600 pb-1 mb-4" style={{ color: headerColor }}>Technical Skills</h3>
          <div className="bg-blue-600 text-white text-center py-2 rounded-md mb-2 text-sm font-semibold">
            <Droppable droppableId="skills" type="SKILLS">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {resumeData.skills.map((skill, index) => (
                    <Draggable
                      key={`SKILLS-${index}`}
                      draggableId={`SKILLS-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                            "outline-dashed outline-2 outline-gray-400 bg-white text-sm text-gray-800"
                            }`}
                        >
                          <Skills title={skill.title} skills={skill.skills} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          {/* Add more technical skills as needed */}
        </div>

        <div className="mb-6">
          <h3 className="text-xl text-blue-600 border-b-2 border-blue-600 pb-1 mb-4" style={{ color: headerColor }}>Certificates</h3>
          <div className="mb-2">
            <Certification className="text-lg text-gray-800 font-semibold"
              title="Certifications "
              certifications={resumeData.certifications}
            />
          </div>
          {/* Add more certificates as needed */}
        </div>

        <div>
          <h3 className="text-xl text-blue-600 border-b-2 border-blue-600 pb-1 mb-4" style={{ color: headerColor }}>Skills</h3>
          <div className="flex flex-wrap">
            <div className="w-1/2 mb-2">
              <Language title="Languages" languages={resumeData.languages} />
            </div>

            {/* Add more skill items as needed */}
          </div>
        </div>
      </div>
    ),

    template13: (
      <div className="w-4/5 mx-auto my-5 bg-white p-5 shadow-md">
        <h1 className="text-4xl font-bold text-red-800 mb-2" style={{ color: headerColor }}>{resumeData.name}({resumeData.position})</h1>
        <div className="text-sm mb-5">
          <p>
          <ContactInfo
                mainclass="flex flex-row gap-1 mb-1 contact"
                linkclass="inline-flex items-center gap-1"
                teldata={resumeData.contactInformation}
                emaildata={resumeData.email}
                addressdata={resumeData.address}
                telicon={<MdPhone />}
                emailicon={<MdEmail />}
                addressicon={<MdLocationOn />}
              />
            {/* <a href="#" className="text-red-800 no-underline">Online Profile</a> */}
          </p>
        </div>

        <div className="mb-5">
          <div className="text-lg font-semibold text-red-800 border-b-2 border-red-800 pb-1 mb-3" style={{ color: headerColor }}>Professional Summary</div>
          <p>{resumeData.summary}</p>
        </div>

        <div className="mb-5">
          <p>
          {resumeData.socialMedia.map((socialMedia, index) => {
                  return (
                    <a
                      href={`http://${socialMedia.link}`}
                      aria-label={socialMedia.socialMedia}
                      key={index}
                      title={socialMedia.socialMedia}
                      target="_blank"
                      rel="noreferrer"
                      className="text-red-800"
                    // Prevent text overflowing, If the socialMedia.link string is longer than 32 characters, apply the wordWrap and display styles to this <a> tag.
                    // wordWrap: "break-word" breaks the text onto the next line if it's too long,
                    // display: "inline-block" is necessary for wordWrap to work on an inline element like <a>.

                    >
                      {icons.map((icon, index) => {
                        if (icon.name === socialMedia.socialMedia.toLowerCase()) {
                          return <span key={index}>{icon.icon}</span>;
                        }
                      })}
                      {socialMedia.link}
                    </a>
                  );
                })}
          </p>
        </div>

        <div className="mb-5">
          
          <div className="text-lg font-semibold text-red-800 border-b-2 border-red-800 pb-1 mb-3" style={{ color: headerColor }}>Skills</div>
          <ul className="list-disc ml-5">
         
          <Droppable droppableId="skills" type="SKILLS">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {resumeData.skills.map((skill, index) => (
                        <Draggable
                          key={`SKILLS-${index}`}
                          draggableId={`SKILLS-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                "outline-dashed outline-2 outline-gray-400 bg-white"
                                }`}
                            >
                              <Skills title={skill.title} skills={skill.skills} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
        
          </ul>
        </div>

        <div className="mb-5">
          <div className="text-lg font-semibold text-red-800 border-b-2 border-red-800 pb-1 mb-3" style={{ color: headerColor }}>Work History</div>
          <div className="mb-5">
          {resumeData.workExperience.length > 0 && (
                  <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                       
                        {resumeData.workExperience.map((item, index) => (
                          <Draggable
                            key={`${item.company}-${index}`}
                            draggableId={`WORK_EXPERIENCE-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                  }`}
                              >
                                <div className="justify-between space-y-1">
                                  <p className="content i-bold text-2xl" style={{ fontSize: '1.3rem' }}>{item.company}</p>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <p className="content">{item.position}</p>
                                <p className="content hyphens-auto">
                                  {item.description}
                                </p>
                                <Droppable
                                  droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                  type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
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
                                              key={`${item.company}-${index}-${subIndex}`}
                                              draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={`
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
                {resumeData.projects.length > 0 && (
                  <Droppable droppableId="projects" type="PROJECTS">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <h2
                          className="section-title mb-1 border-b-2 border-gray-300 editable"
                          contentEditable
                          suppressContentEditableWarning
                          style={{ color: headerColor }} >
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
                                className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
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
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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

        <div className="mb-5">
          <div className="text-lg font-semibold text-red-800 border-b-2 border-red-800 pb-1 mb-3" style={{ color: headerColor }}>Education</div>
          <ul className="list-none">
          {resumeData.education.length > 0 && (
                    <div className="mb-1">
                      {resumeData.education.map((item, index) => (
                        <div  key={index} className="mb-1 text-lg">
                          <p className="content i-bold " style={{ fontSize: '1.3rem' }}>{item.degree}</p>
                          <p className="content">{item.school}</p>
                          <DateRange className="mb-1 text-lg"
                            startYear={item.startYear}
                            endYear={item.endYear}
                            id={`education-start-end-date`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
          </ul>
        </div>

        <div className="mb-5">
          <div className="text-lg font-semibold text-red-800 border-b-2 border-red-800 pb-1 mb-3" style={{ color: headerColor }}>Languages/Certifications</div>
          <Language  languages={resumeData.languages} />
                <Certification
                  
                  certifications={resumeData.certifications}
                />
        </div>
      </div>
    ),
    template14: (
      <div className="bg-gray-100 min-h-screen p-5">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center border-b-2 border-gray-800 pb-4 mb-6">
          <div className="flex-1">
          <Image
            src={resumeData.profilePicture}
            alt="profile"
            width={100}
            height={100}
            className="rounded-full mr-5"
          />
          </div>
          <div className="flex-3 text-right pl-6">
            <h1 className="text-3xl font-bold text-gray-800 m-0" style={{ color: headerColor }}>{resumeData.name}</h1>
            <h2 className="text-2xl text-gray-600 m-0" style={{ color: headerColor }}>{resumeData.position}</h2>
            <p className="text-gray-500 mt-2">
            <ContactInfo
              mainclass=" gap-1 mb-1 contact"
              linkclass="inline-flex items-center gap-1"
              teldata={resumeData.contactInformation}
              emaildata={resumeData.email}
              addressdata={resumeData.address}
              telicon={<MdPhone />}
              emailicon={<MdEmail />}
              addressicon={<MdLocationOn />}
            />
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold border-b-2 border-gray-800 pb-2 mb-4" style={{ color: headerColor }}>Profile</h3>
          <p>
          {resumeData.summary}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold border-b-2 border-gray-800 pb-2 mb-4" style={{ color: headerColor }}>Education</h3>
          <ul className="list-none p-0">
          {resumeData.education.length > 0 && (
                    <div className="mb-1">
                      {resumeData.education.map((item, index) => (
                        <div  key={index} className="mb-1 text-lg">
                          <p className="content i-bold " style={{ fontSize: '1.3rem' }}>{item.degree}</p>
                          <p className="content">{item.school}</p>
                          <DateRange className="mb-1 text-lg"
                            startYear={item.startYear}
                            endYear={item.endYear}
                            id={`education-start-end-date`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold border-b-2 border-gray-800 pb-2 mb-4" style={{ color: headerColor }}>Skills</h3>
          <ul className="list-none p-0">
          <Droppable droppableId="skills" type="SKILLS">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {resumeData.skills.map((skill, index) => (
                        <Draggable
                          key={`SKILLS-${index}`}
                          draggableId={`SKILLS-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                "outline-dashed outline-2 outline-gray-400 bg-white"
                                }`}
                            >
                              <Skills title={skill.title} skills={skill.skills} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold border-b-2 border-gray-800 pb-2 mb-4" style={{ color: headerColor }}>Projects</h3>
          {resumeData.workExperience.length > 0 && (
                  <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                       
                        {resumeData.workExperience.map((item, index) => (
                          <Draggable
                            key={`${item.company}-${index}`}
                            draggableId={`WORK_EXPERIENCE-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                  }`}
                              >
                                <div className="justify-between space-y-1">
                                  <p className="content i-bold text-2xl" style={{ fontSize: '1.3rem' }}>{item.company}</p>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <p className="content">{item.position}</p>
                                <p className="content hyphens-auto">
                                  {item.description}
                                </p>
                                <Droppable
                                  droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                  type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
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
                                              key={`${item.company}-${index}-${subIndex}`}
                                              draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={`
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
                {resumeData.projects.length > 0 && (
                  <Droppable droppableId="projects" type="PROJECTS">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <h2
                          className="section-title mb-1 border-b-2 border-gray-300 editable"
                          contentEditable
                          suppressContentEditableWarning
                          style={{ color: headerColor }} >
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
                                className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
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
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
        <h3 className="text-xl font-semibold border-b-2 border-gray-800 pb-2 mb-4" style={{ color: headerColor }}>Languages</h3>
        <div className="mb-5">
         
          <Language  languages={resumeData.languages} />
          <h3 className="text-xl font-semibold border-b-2 border-gray-800 pb-2 mb-4" style={{ color: headerColor }}>Certifications</h3>
                <Certification
                  
                  certifications={resumeData.certifications}
                />
        </div>
      </div>
 
    </div>
    ),
    template15: (
<div className="max-w-3xl mx-auto p-5 bg-white shadow-md">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{ color: headerColor }}>{resumeData.name}</h1>
        <h2 className="text-2xl font-semibold mb-3" style={{ color: headerColor }}>{resumeData.position}</h2>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: headerColor }}>ABOUT ME</h2>
        <p>
        {resumeData.summary}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: headerColor }}>EXPERIENCE</h2>
        <div>
          <h3 className="text-xl font-semibold border-b-2 border-gray-800 pb-2 mb-4" style={{ color: headerColor }}>Projects</h3>
          {resumeData.workExperience.length > 0 && (
                  <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                       
                        {resumeData.workExperience.map((item, index) => (
                          <Draggable
                            key={`${item.company}-${index}`}
                            draggableId={`WORK_EXPERIENCE-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                  "outline-dashed outline-2 outline-gray-400 bg-white"
                                  }`}
                              >
                                <div className="justify-between space-y-1">
                                  <p className="content i-bold text-2xl" style={{ fontSize: '1.3rem' }}>{item.company}</p>
                                  <DateRange
                                    startYear={item.startYear}
                                    endYear={item.endYear}
                                    id={`work-experience-start-end-date`}
                                  />
                                </div>
                                <p className="content">{item.position}</p>
                                <p className="content hyphens-auto">
                                  {item.description}
                                </p>
                                <Droppable
                                  droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                                  type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
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
                                              key={`${item.company}-${index}-${subIndex}`}
                                              draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={`
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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
                {resumeData.projects.length > 0 && (
                  <Droppable droppableId="projects" type="PROJECTS">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <h2
                          className="section-title mb-1 border-b-2 border-gray-300 editable"
                          contentEditable
                          suppressContentEditableWarning
                          style={{ color: headerColor }} >
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
                                className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
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
                                          hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400
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

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: headerColor }}>SKILLS</h2>
       
        <Droppable droppableId="skills" type="SKILLS">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {resumeData.skills.map((skill, index) => (
                        <Draggable
                          key={`SKILLS-${index}`}
                          draggableId={`SKILLS-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`hover:scale-105 transition-transform duration-300 mb-1 ${snapshot.isDragging &&
                                "outline-dashed outline-2 outline-gray-400 bg-white"
                                }`}
                            >
                              <Skills title={skill.title} skills={skill.skills} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
        
      
       
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: headerColor }}>LANGUAGE</h2>
        <div className="flex justify-start mb-4 font-bold">
        <Language  languages={resumeData.languages} />
        </div>
      </div>

      

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: headerColor }}>EDUCATION</h2>
        <div className="mb-4">
        <ul className="list-none p-0">
          {resumeData.education.length > 0 && (
                    <div className="mb-1">
                      {resumeData.education.map((item, index) => (
                        <div  key={index} className="mb-1 text-lg">
                          <p className="content i-bold " style={{ fontSize: '1.3rem' }}>{item.degree}</p>
                          <p className="content">{item.school}</p>
                          <DateRange className="mb-1 text-lg"
                            startYear={item.startYear}
                            endYear={item.endYear}
                            id={`education-start-end-date`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
          </ul>
          
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: headerColor }}>CONTACT</h2>
        <ContactInfo
              mainclass=" gap-1 mb-1 contact"
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
