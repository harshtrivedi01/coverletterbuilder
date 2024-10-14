import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";

const PersonalInformation = ({}) => {
  const { resumeData, setResumeData, handleProfilePicture, handleChange } =
    useContext(ResumeContext);

  // Default dummy image URL (can be replaced with any placeholder image)
  const dummyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlie4MsQ9pJSSKY7DoEpxn3uBAq-rT7in1sA&s"; // URL to the dummy image

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title text-black text-3xl">Personal Information</h2>
      <div className="grid-4">

        {/* Display either the uploaded image or a dummy image */}
     

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
          className="pi border-black border "
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
        
      </div>
    </div>
  );
};

export default PersonalInformation;
