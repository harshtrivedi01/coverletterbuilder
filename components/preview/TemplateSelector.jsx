import React, { useState } from 'react';
import Image from "next/image";
import template1 from './template/template1.png'
import template2 from './template/template2.png'
import template3 from './template/template3.png'
import template4 from './template/template4.png'
import template5 from './template/template5.png'
import template6 from './template/template6.png'
import template7 from './template/template7.png'
import template8 from './template/template8.png'
import template9 from './template/template9.png'
import template10 from './template/template10.png'
import template11 from './template/template11.png'
import template12 from './template/template12.png'
import template13 from './template/template13.png'
import template14 from './template/template14.png'
import template15 from './template/template15.png'
import template16 from './template/template16.png'
import template17 from './template/template17.png'
import template18 from './template/template18.png'
import template19 from './template/template19.png'
import template20 from './template/template20.png'





const TemplateSelector = ({ selectedTemplate, setSelectedTemplate }) => {
  const [isOpen, setIsOpen] = useState(false); // Modal state
  const [currentIndex, setCurrentIndex] = useState(1); // Middle slide index

  // List of template images (Replace with actual image URLs)
  const templates = [
    { key: 'template1', imageUrl: template1 },
    { key: 'template2', imageUrl: template2 },
    { key: 'template3', imageUrl: template3 },
    { key: 'template4', imageUrl: template4 },
    { key: 'template5', imageUrl: template5 },
    { key: 'template6', imageUrl: template6 },
    { key: 'template7', imageUrl: template7 },
    { key: 'template8', imageUrl: template8 },
    { key: 'template9', imageUrl: template9 },
    { key: 'template10', imageUrl: template10 },
    { key: 'template11', imageUrl: template11 },
    { key: 'template12', imageUrl: template12 },
    { key: 'template13', imageUrl: template13 },
    { key: 'template14', imageUrl: template14 },
    { key: 'template15', imageUrl: template15 },
    { key: 'template16', imageUrl: template16 },
    { key: 'template17', imageUrl: template17 },
    { key: 'template18', imageUrl: template18 },
    { key: 'template19', imageUrl: template19 },
    { key: 'template20', imageUrl: template20 },
    { key: 'template20', imageUrl: template20 },
    // Add more templates here...
  ];

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleTemplateClick = (templateKey) => {
    setSelectedTemplate(templateKey);
    closeModal(); // Close the modal after selection
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? templates.length - 3 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === templates.length - 3 ? 0 : prevIndex + 1
    );
  };

  const getDisplayedTemplates = () => {
    const start = Math.max(0, currentIndex - 1);
    const end = Math.min(templates.length, currentIndex + 2);
    return templates.slice(start, end);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="rounded-lg border-2 border-blue-800 px-5 py-2 font-bold bg-white text-blue-800"
      >
        Select Template
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
          <div className="bg-white rounded-lg p-5 max-w-4xl w-full relative">
            <h2 className="text-lg font-bold mb-4 text-center border rounded-3xl py-2 text-white bg-gray-800">Select a Template</h2>
            
            {/* Slider */}
            <div className="relative flex items-center ">
              <button
                onClick={goToPrevious}
                className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-6 py-4 border-4 border-white rounded-full"
              >
                &lt;
              </button>

              <div className="flex justify-center w-full  overflow-hidden">
                <div className="flex w-full ">
                  {getDisplayedTemplates().map((template, index) => (
                    <div
                      key={template.key}
                      className={`flex-none w-1/3 px-2 ${template.key === templates[currentIndex].key ? 'border-4 p-0 rounded-lg border-purple-500 shadow-3xl ' : ''}`}
                      onClick={() => handleTemplateClick(template.key)}
                    >
                      <Image
                        src={template.imageUrl}
                        style={{objectFit:'cover' , backgroundImage:'cover'}}
                        alt={template.key}
                        className="w-full  p-3 pt-0 object-cover rounded-lg cursor-pointer h-80"
                      />
                      <p className="text-center ">{template.key}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={goToNext}
                className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-6 py-4 border-4 border-white  rounded-full"
              >
                &gt;
              </button>
            </div>

            <button
              onClick={closeModal}
              className="mt-4 px-5 py-2 bg-red-500 text-white font-bold rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
