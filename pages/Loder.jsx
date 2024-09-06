import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook

const UploadResume = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const router = useRouter(); // Initialize the router

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const handleNext = () => {
    if (selectedCard) {
      // Navigate based on the selected card
      if (selectedCard === 'upload') {
        router.push('/UploadResume'); // Redirect to the UploadResume page
      } else if (selectedCard === 'start') {
        router.push('/builder'); // Redirect to the index page
      }
    } else {
      alert('Please select a card before proceeding.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Are you uploading an existing resume?</h1>
      <p className="text-gray-600 mb-8">Just review, edit, and update it with new information</p>
      <div className="flex space-x-4">
        <div
          className={`border ${selectedCard === 'upload' ? 'border-green-500' : 'border-gray-300'} rounded-lg p-6 text-center w-64 shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
          onClick={() => handleCardSelect('upload')}
        >
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4m-2 0v16m-4-8H4M4 8h16" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold mb-2">Yes, upload from my resume</h2>
          <p className="text-gray-500">We’ll give you expert guidance to fill out your info and enhance your resume, from start to finish</p>
        </div>

        <div
          className={`border ${selectedCard === 'start' ? 'border-blue-500' : 'border-gray-300'} rounded-lg p-6 text-center w-64 shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
          onClick={() => handleCardSelect('start')}
        >
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold mb-2">No, start from scratch</h2>
          <p className="text-gray-500">We’ll guide you through the whole process so your skills can shine</p>
        </div>
      </div>
      <div className="flex space-x-4 mt-8">
        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Back</button>
        <button className="px-6 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default UploadResume;
