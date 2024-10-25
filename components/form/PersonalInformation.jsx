import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";

const PersonalInformation = ({}) => {
  const { resumeData, setResumeData, handleProfilePicture, handleChange } =
    useContext(ResumeContext);

  // Default dummy image URL (can be replaced with any placeholder image)
  const dummyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlie4MsQ9pJSSKY7DoEpxn3uBAq-rT7in1sA&s"; // URL to the dummy image

  return (
    <div className="flex-col-gap-2 bg-blue-50 p-3 rounded-xl">
      <h2 className="input-title text-black text-3xl underline">Your Information</h2>
      <div className="grid-4">

        {/* Display either the uploaded image or a dummy image */}
     
      
       <div className="">
        <h1 className="fo text-sm text-blue-500">Your Name</h1>
       <input
          type="text"
          placeholder="Full Name"
          name="name"
          className="pi ber w-full"
          value={resumeData.name}
          onChange={handleChange}
        />
        </div>
        <div>
       <h1 className="fo text-sm text-blue-500">Your Address City       </h1>
       <input
          type="text"
          placeholder="Address"
          name="address"
          className="pi er w-full"
          value={resumeData.address}
          onChange={handleChange}
        />
       </div>
       <div>
       <h1 className="f text-sm text-blue-500">Proffesion </h1>
       <input
          type="text"
          placeholder="Job Title"
          name="position"
          className="pi r w-full"
          value={resumeData.position}
          onChange={handleChange}
        />
       </div>
       
       <div>
       <h1 className="font- text-sm text-blue-500">Your Email Address </h1>
       <input
          type="email"
          placeholder="Email"
          name="email"
          className="pi  w-full"
          value={resumeData.email}
          onChange={handleChange}
        />
       </div>
     
        
      </div>

      <div>
      <h2 className="input-title text-black text-2xl mb-2 underline font-bold">Date</h2>
       <input
          type="text"
          placeholder="Contact Information"
          name="contactInformation"
          className="pi  w-80"
          value={resumeData.contactInformation}
          onChange={handleChange}
          minLength="10"
          maxLength="15"
        />
       </div>
    </div>
  );
};

export default PersonalInformation;
