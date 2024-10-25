import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";

const Education = () => {
    const { resumeData, setResumeData} = useContext(ResumeContext);

    const handleEducation = (e, index) => {
      const newEducation = [...resumeData.education];
      newEducation[index][e.target.name] = e.target.value;
      setResumeData({ ...resumeData, education: newEducation });
    };
  
    const addEducation = () => {
      setResumeData({
        ...resumeData,
        education: [
          ...resumeData.education,
          { school: "", degree: "", startYear: "", endYear: "" },
        ],
      });
    };
  
    const removeEducation = (index) => {
      const newEducation = [...resumeData.education];
      newEducation[index] = newEducation[newEducation.length - 1];
      newEducation.pop();
      setResumeData({ ...resumeData, education: newEducation });
    };
    
    return (
      <div className="flex-col-gap-2 mt-5 p-3 bg-blue-50 rounded-xl">
        <h2 className="input-title text-black underline mb-3 text-3xl">Employer’s Information        </h2>
        {resumeData.education.map((education, index) => (
          <div key={index} className="f-col">
          <div>
          <h1 className="f text-sm text-blue-600 mb-1">Hiring Manager’s Name (If known)</h1>
          <input
              type="text"
              placeholder="School"
              name="school"
              className="w-full other-input rounded-lg"
              value={education.school}
              onChange={(e) => handleEducation(e, index)} />
            </div>
           <div>
       <h1 className="f text-sm text-blue-600 mb-1">Company Name           </h1>
           <input
              type="text"
              placeholder="Degree"
              name="degree"
              className="w-full other-input rounded-lg"
              value={education.degree}
              onChange={(e) => handleEducation(e, index)} />
            </div>
            <div className="flex gap-4">
              <div className="w-full">
             <h1 className="f text-sm text-blue-600 mb-1">Company Address  </h1>
              <input
                type="text"
                placeholder="Company Address"
                name="startYear"
                className="other-input rounded-lg w-full"
                value={education.startYear}
                onChange={(e) => handleEducation(e, index)} />
                </div>
                <div className="w-full">
             <h1 className="f text-sm text-blue-600 mb-1 ">City, State ZIP Code</h1>
             <input
               type="text"
                placeholder="End Year"
                name="endYear"
                className="other-input rounded-lg w-full"
                value={education.endYear}
                onChange={(e) => handleEducation(e, index)} />
              </div>
            </div>
          </div>
        ))}
      
      </div>
    )
  }

export default Education;