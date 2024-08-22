import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
const PersonalInformation = ({}) => {
  const { resumeData, setResumeData, handleProfilePicture, handleChange } =
    useContext(ResumeContext);

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title text-black">Personal Information</h2>
      <div className="grid-4">
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          className="pi border-black border"
          value={resumeData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Job Title"
          name="position"
         className="pi border-black border"
          value={resumeData.position}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Contact Information"
          name="contactInformation"
         className="pi border-black border"
          value={resumeData.contactInformation}
          onChange={handleChange}
          minLength="10"
          maxLength="15"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
         className="pi border-black border"
          value={resumeData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
         className="pi border-black border"
          value={resumeData.address}
          onChange={handleChange}
        />
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          className="profileInput bg-gray-300 text-white border-black border"
          onChange={handleProfilePicture}
          placeholder="Profile Picture"
        />
      </div>
    </div>
  );
};

export default PersonalInformation;
