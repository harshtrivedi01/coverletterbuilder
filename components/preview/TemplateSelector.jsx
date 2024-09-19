import React, { useState } from 'react';

const TemplateSelector = ({ selectedTemplate, setSelectedTemplate }) => {
  const [isOpen, setIsOpen] = useState(false); // Modal state
  const [currentIndex, setCurrentIndex] = useState(1); // Middle slide index

  // List of template images (Replace with actual image URLs)
  const templates = [
    { key: 'template1', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template2', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template3', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template4', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template5', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template6', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template7', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template8', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template9', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template10', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template11', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template12', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template13', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template14', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template15', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template16', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template17', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },
    { key: 'template17', imageUrl: 'https://cdn-images.livecareer.co.uk/images/lc/common/cv-templates/jt/uk/cv-templates-modern-01@3x.png' },

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
                      <img
                        src={template.imageUrl}
                        alt={template.key}
                        className="w-full  p-3 pt-0 object-cover rounded-lg cursor-pointer"
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
